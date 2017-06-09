var glob = require('glob');
var path  = require('path');
// var options = {
//     sync:true,
//     cwf: path.resolve(__dirname, './src')
// }

// var globInstance = new glob('*.html', options);

// module.exports =   globInstance.found;


var pageArr = Object.keys(getEntry('./src/*.html'));

//按文件名来获取入口文件（即需要生成的模板文件数量）
function getEntry(globPath) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        entries[pathname] = './' + entry;
    }
    return entries;
}

module.exports = pageArr;