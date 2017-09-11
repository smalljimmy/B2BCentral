import fs from 'fs';
import * as Path from 'path';

/**
 * Emits tests recursively for the given directory.
 * @param dir the directory to scan
 * @private
 */
function _emitTests(dir) {
    fs.readdirSync(dir).forEach(function (file) {
        const filePath = Path.join(dir, file);
        var stat = fs.statSync(filePath);

        if (stat && stat.isFile()) {
            const basename = Path.basename(file, '.spec.js');
            if (Path.extname(basename) === '') {
                require('./' + Path.relative('test/', filePath));
            }
        }
        else if (stat && stat.isDirectory()) {
            describe(file, function () {
                if (file === 'components') {
                    // This polyfill is necessary when we import anything using C3
                    //      For example the b2bCentral test will import this and break without it
                    require('./util/svgPathSegPolyfillNode');
                }

                _emitTests(filePath);
            });
        }
    });
}

// emit the tests to mocha
_emitTests('./test/');
