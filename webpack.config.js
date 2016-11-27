var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [];
const TRAVIS = process.env.TRAVIS ? JSON.parse(process.env.TRAVIS) : false;
if (TRAVIS) {
	console.log('TRAVIS mode (will fail on error)');
	plugins.push(new webpack.NoErrorsPlugin());
}


module.exports = {
	bail: TRAVIS,
	context: __dirname + path.sep + 'src',
	entry: './index.ts',
	devtool: 'inline-source-map',
	devServer: { inline: true },
	output: {
		path: __dirname + path.sep + 'dist',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
	},
	module: {
		loaders: [
			{ test: /\.tsx?$/, loader: 'ts-loader' },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader") },
		]
	},
	plugins: [
		new ExtractTextPlugin("bundle.css"),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.template.html',
			hash: true,
			inject: true
		})
	]
};
