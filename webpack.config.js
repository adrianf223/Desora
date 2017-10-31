var path = require('path');
function requireAll(r) { r.keys().forEach(r); }


module.exports = {    
  
    // context: path.resolve('js'),
	entry: [
        // "./node_modules/systemjs/dist/system",
        // "./node_modules/es6-module-loader/dist/es6-module-loader-dev",
        "./node_modules/material-design-lite/dist/material",
        "./node_modules/jquery/dist/jquery",
        "./js/script", "./js/app"
    ]
    ,
	output: {
		path: path.resolve('build/'),
		publicPath: '/build/',
		filename: "bundle.js"
    },


    

    module: {
		loaders: [
            { test: /\.es6.js$/, loader: 'webpack-traceur?runtime&sourceMaps' },
            
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.(png|jpg)$/, 
				exclude: /node_modules/,
				loader: 'url-loader?limit=10000'
            }
            
		]
	},

	resolve: {
		extensions: ['.js', '.es6']
	}
}