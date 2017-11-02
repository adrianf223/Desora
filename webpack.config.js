var path = require('path');
module.exports = {
    entry: './desora.ro/js/app.js',
    output: {
        path: path.join(__dirname, "desora.ro/js"),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: path.join(__dirname, 'es6'),
              loader: 'babel-loader' }
        ]
    }
};