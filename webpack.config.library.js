var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    entry: {
        photogrid: ["./index.js"],
    },
    output: {
        path: path.join(__dirname, '/library'),
        filename: '[name].js',
		library: 'PhotoFeed',
		libraryTarget: 'umd',
    },
    module: {
		rules: [
			// {
			// 	test: /prop-types/,
			// 	use: 'null-loader',
			// },
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['react', 'es2015', 'stage-0'],

					},
				},
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
				})
			}
		],
        // loaders: [
        //     {
        //         test: /\.jsx?/,
        //         loader: 'babel',
        //         query: {
        //             presets: ["react", "es2015", "stage-0"]
        //         },
        //         include: path.join(__dirname, 'src')
        //     }
        //     , {
        //         test: /\.css/,
        //         include: path.join(__dirname, 'src'),
        //         loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]")
        //     }
        // ]
    },
	externals: {
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react',
		},

	},
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            },
            sourceMap: false,
            minimize: true
        }),
        new ExtractTextPlugin("style.css"),
    ]
};