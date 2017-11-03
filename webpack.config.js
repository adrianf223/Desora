var path = require('path');
module.exports = {
    entry: './desora.ro/js/app.js',
    output: {
        path: path.join(__dirname, "desora.ro/js"),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                test: path.join(__dirname, 'es6'),
                loader: 'babel-loader'
            },
            {
                test: /vendor\/.+\.(jsx|js)$/,
                loader: 'imports?jQuery=jquery,$=jquery,this=>window',
                loader: 'imports?jQuery-ui=jquery-ui,$.widget=jquery-ui,this=>window'
                
            }
        ]
    },
    // resolve: {
    //     root: [
    //         path.join(__dirname, "..", "jquery-ui", "node_modules"),
    //         path.join(__dirname, "..", "jquery.tabulator", "node_modules"),
    //     ],
    //     extensions: ['', '.js', '.json'] 
    // },
};