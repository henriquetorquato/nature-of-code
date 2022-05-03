const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'stage-2']
					}
				}
			},
			{
				test: /\.css$/i,
				exclude: /(node_modules)/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: './fonts/' //dont actually use these fonts but still need to process them
					}
				}]
			}
		]
	},
	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, 'assets/'),
			'@components': path.resolve(__dirname, 'components/'),
			'@entities': path.resolve(__dirname, 'entities/'),
			'@resources': path.resolve(__dirname, 'resources/'),
			'@scenes': path.resolve(__dirname, 'scenes/')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html' })
	]
};