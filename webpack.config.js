var webpack = require('webpack');
var yeticss = require('yeticss');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./js/App.js",
    module: {
        loaders: [
            { 
                test: /\.js$/, 
                loader: 'babel', 
                exclude: /node_modules/ 
            },
            {   
                test: /\.styl$/, 
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
            }

        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.min.css", { allChunks: true })
    ],
    stylus: {
        use: [yeticss()]
    },
    output: {
        path: "./build",
        filename: "bundle.js"
    }
};
