const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSextractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
	entry: {
		main: "./src/scripts/index.js",
	},
	output: {
		filename: "bandle.js",
		path: path.resolve(__dirname, "build"),
	},
	mode: "development",
	devServer: {
		static: path.resolve(__dirname, "build"),
		open: true,
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/,
				use: [
					MiniCSSextractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					"postcss-loader",
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				type: "asset/resource",
				generator: {
					filename: "./images/[name].[hash][ext]",
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				type: "asset/resource",
				generator: {
					filename: "./fonts/[name].[hash][ext]",
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new MiniCSSextractPlugin(),
		new CleanWebpackPlugin(),
	],
};
