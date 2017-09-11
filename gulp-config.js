import gulp from "gulp";
import guppy from "git-guppy";
import gutil from "gulp-util";
import webpack from "webpack";
import webpackStream from "webpack-stream";
import WebpackDevServer from "webpack-dev-server";
import webpackConfig from "./webpack.config.js";
import childProcess from "child_process";
import eslint from "gulp-eslint";
import mocha from "gulp-mocha";
import istanbul from "gulp-istanbul";
let isparta = require('isparta');
import brazilWs from 'brazil-ws';

const webpackEntry = 'script/index.jsx';
const buildRoot = `${brazilWs.buildDir}/webapps/HorizonteWebApp/js`;
const testFiles = ['test/tests.js'];

// Initialize git-guppy
guppy(gulp);

/**
 * Default task, runs a full build with all quality assurances.
 */
gulp.task('default', ['build']);

/**
 * Removes all build artifacts, returns the working directory to what it would look
 * like after freshly cloning the repository.
 */
gulp.task('clean', (done) => {
    const removeNodeModules = "rm -rf build node_modules";
    const callback = (err) => {
        if (err) {
            gutil.log(err);
        }
        done();
    };

    return gulp.src('./')
        .pipe(childProcess.exec(removeNodeModules, callback));
});

/**
 * Builds the javascript bundle with development settings.
 */
gulp.task('build', ['webpack:dev']);

/**
 * Builds the javascript application with production settings and all quality assurances.
 */
gulp.task('release', ['webpack:production']);

/**
 * Builds the apollo package.
 * Assumes build artifacts have already been built in the workspace.
 * @param done
 * @private
 */
function _buildApolloPkg(done){
    const command = '/apollo/env/SDETools/bin/brazil-to-apollo-package';
    const args = `--workspaceRoot "${brazilWs.workspaceRoot}" --packageRoot "." --package "${brazilWs.packageName}"`;

    childProcess.exec(`${command} ${args}`, (err, stdout) => {
        gutil.log(stdout.trim());
        done();
    });
}

/**
 * Builds an apollo package of this application.
 * This should only be run from the dev box and should not be invoked in a package builder / apollo system directly.
 */
gulp.task('apollo-pkg', ['release'], (done) => {
    _buildApolloPkg(done);
});

/**
 * Builds an apollo package of this application in dev mode.
 * This should only be run from the dev box and should not be invoked in a package builder / apollo system directly.
 */
gulp.task('apollo-pkg-dev', ['build'], (done) => {
    _buildApolloPkg(done);
});

/**
 * Starts the dev server to dynamically redeploy the apollo-pkg every time files change.
 */
gulp.task('dev-server', () => {
    gulp.watch(['script/**/*.js*', 'style/**/*.less'], ['apollo-pkg-dev'])
        .on('ready', () => gutil.log('Watching for changes...'));
});

/**
 * Run by 'coverage', should not be run manually.
 */
gulp.task('pre-coverage', () => {
    return gulp.src(['script/**/*.js', 'script/**/*.jsx'])
        .pipe(istanbul({
            // supports es6
            instrumenter: isparta.Instrumenter,
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

/**
 * Runs tests and generates coverage report to the terminal.
 */
gulp.task('coverage', ['pre-coverage'], () => {
    return gulp.src(testFiles)
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({thresholds: {global: 50}}));
});

function _runTests() {
    return gulp.src(testFiles, {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('error', gutil.log);
}

/**
 * Runs unit tests once, fails gulp if there are errors.
 */
gulp.task('test', () => {
    return _runTests();
});

/**
 * Starts the unit test server to dynamically run tests every time files change.
 */
gulp.task('test-server', () => {
    _runTests().on('end', () => {
        gulp.watch(['test/**', 'script/**'], {debounceDelay: 2000}, ['test'])
            .on("ready", () => gutil.log("Watching for changes..."));
    });
});

/**
 * Git hook.
 */

gulp.task('pre-commit', ['lint', 'coverage']);

/**
 * Lints the javascript to check for style errors.
 */
gulp.task('lint', () => {
    return gulp.src(['./script/**/*.js', './script/**/*.jsx'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

/**
 * Builds the webpack bundle.
 */
gulp.task('webpack:dev', () => {
    return gulp.src(webpackEntry)
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest(buildRoot));
});

/**
 * Production webpack bundle.
 */
gulp.task('webpack:production', () => {
    let config = Object.create(webpackConfig);
    config.devtool = 'cheap-module-source-map';
    config.plugins = config.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
    );

    return gulp.src(webpackEntry)
        .pipe(webpackStream(config))
        .pipe(gulp.dest(buildRoot));
});
