const webpack = require('webpack');


let config = {
    //module: {
    //    loaders: [
    //        {
    //            test: /.*\.js$/,
    //            exclude: /node_modules/,
    //            loaders: ['babel']
    //        }
    //    ]
    //},
    entry: './public/drawApp.js',
    output: {
        filename: 'bundle.js'
    }
}

module.exports = config;