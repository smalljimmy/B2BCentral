import {join} from 'path';
import webpack from 'webpack';
import webpackShellPlugin from 'webpack-shell-plugin';

// "NODE_PATH" has trailing colon, for some reason.  Maybe it's intended
const nodePath = process.env["NODE_PATH"].replace(':','');

const webpackConfig = {
    devtool: 'inline-source-map',
    context: __dirname + "/script",
    entry: {
        app: ['babel-polyfill', __dirname + "/script/index.jsx"],
        vendor: ['react', 'react-dom', 'amazonui-react-elements/elements', 'moment', 'numeral', 'flux', 'immutable']
    },
    output: {
        path: __dirname + "/build",
        publicPath: "/webapps/HorizonteWebApp/js/",
        filename: "bundle.js",
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ["node_modules", nodePath],
    },
    resolveLoader: {
        root: nodePath,
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel?cacheDirectory'],
                include: join(__dirname, "script"),
                exclude: /node_modules/,
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                exclude: /node_modules/,
                loader:'file-loader?limit=1024&name=img/[name].[ext]'
            },            
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./[name].[ext]'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
        new webpackShellPlugin({
            onBuildEnd:[
                'echo "Generating StringIds for B2BCentralWebserver"',
                'mkdir -p build/webapps/HorizonteWebApp/data',
                'node ./stringIdsGenerator.js > build/webapps/HorizonteWebApp/data/StringIds.json'
            ],
            safe: true
        }),                
    ],
    stats: {
        colors: true,
        reasons: true,
        errorDetails: true,
    },
};

export default webpackConfig;
