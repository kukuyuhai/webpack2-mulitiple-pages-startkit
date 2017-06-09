var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//将你的行内样式提取到单独的css文件里，
var configPlugins  = require('./config/_plugin.js')
var config = {
	entry: { //配置入口文件，有几个写几个
		index: './src/js/index.js',
		list: './src/js/list.js',
		about: './src/js/about.js'
	},
	output: {
		path: path.join(__dirname, 'dist'), //打包后生成的目录
		publicPath: '',	//模板、样式、脚本、图片等资源对应的server上的路径
		filename: 'static/js/[name].[hash].js',	//根据对应入口名称，生成对应js名称
		chunkFilename: 'static/js/[id].chunk.js'   //chunk生成的配置
	},
	resolve: {
         //设置require或import的时候可以不需要带后缀
        extensions: ['.js', '.less', '.css']
    },
	module: {
		rules: [ 
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: ["css-loader",'less-loader','postcss-loader']
				})
			},
			{
				test: /\.js$/,
		        loader: 'babel-loader',
		        exclude: /node_modules/
		    },
			{
				test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader?name=./fonts/[name].[ext]'
			},
			{
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 30720, //30kb 图片转base64。设置图片大小，小于此数则转换。
                    name: '../images/[name].[ext]' //输出目录以及名称
                }
            }
		]
	},
	plugins: configPlugins,
	externals: {
        $: 'jQuery'
    },
    //devtool: '#source-map',
	//使用webpack-dev-server服务器，提高开发效率
	devServer: {
		// contentBase: './',
		host: 'localhost',
		port: 4200, //端口
		inline: true,
		hot: false,
	}
};

module.exports = config;