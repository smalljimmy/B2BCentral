// hack to get es6 gulpfile working using BrazilGulp
// it is important that this file be named 'gulpfile.js'

require('babel-core/register')({
    only: /B2BCentralWebApp/
});
require('./gulp-config.js');
