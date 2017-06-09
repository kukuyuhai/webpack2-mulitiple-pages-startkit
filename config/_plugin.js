var webpack = require('webpack')
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin'); // 文件拷贝
var pageArr = require('./_pages');

var configPlugins = [
    new webpack.ProvidePlugin({ //全局配置加载
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common', // 将公共模块提取，生成名为`vendors`的chunk
        minChunks: 3 // 提取至少3个模块共有的部分
    }),
    new CleanPlugin(['dist','build'],{
        root:path.resolve(__dirname,'../')
    }),// 清空dist文件夹
    new webpack.optimize.UglifyJsPlugin({ // js压缩
        compress: {
            warnings: false
        }
    }),
    new ExtractTextPlugin( "static/css/[name].[hash].css"), //提取CSS行内样式，转化为link引入
    new CopyWebpackPlugin([
        {from: './src/images', to: './static/images'} //拷贝图片
    ])
]

const confTitle = [ 
	{name: 'index', title: '这是首页标题'},
	{name: 'list', title: '这是列表标题'},
	{name: 'about', title: '这是关于我标题'}
]

pageArr.forEach(function(pathname) {
    var itemName  = pathname.split('src\\');
    const htmlPlugin = {
        filename:itemName[1] + '.html',  //生成的html存放路径，相对于path
        template: pathname + '.html', //html模板路径
        chunks: ['common', itemName[1]],
        inject: true, //允许插件修改哪些内容，包括head与body
        hash: false, //是否添加hash值
        minify: { //压缩HTML文件
            removeComments: true,//移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    }
    for (var i in confTitle) { 
		if (confTitle[i].name === itemName[1]) { 
			htmlPlugin.titile = confTitle[i].titile
		}
	}
    configPlugins.push(new HtmlWebpackPlugin(htmlPlugin));
});


module.exports = configPlugins;