var StringUtil = require('./script/util/stringUtil');

/**
 * This is responsible for extracting all of the string ids defined in StringUtil and creating a simple object.
 * This will echo the object so that the results can be piped into a command to create a file which will be shared
 * with the webserver.
*/

var stringIdsAsAnAnyObject = new StringUtil.default;

var keys = Object.keys(stringIdsAsAnAnyObject).reduce(function (agg, key) {
  agg[key] = stringIdsAsAnAnyObject[key].lmsId;
  return agg;
}, {});

console.log(JSON.stringify(keys, null, 2));