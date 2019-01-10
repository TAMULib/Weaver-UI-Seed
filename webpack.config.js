var path = require('path');
var webpack = require('webpack');
module.exports = {
    context: __dirname + '/app',
    mode: 'production',
    entry: {
        app: './app.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [ path.resolve(__dirname, 'app') ],
                exclude: [ path.resolve(__dirname, 'app/node_modules') ]
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve('./app'),
            path.resolve('./node_modules'),
            path.resolve('./node_modules/weaver-ui-core/')
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": 'jquery',
            bootstrap: 'bootstrap'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },

    node: {
        fs: 'empty'
    }
};