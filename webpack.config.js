const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const extractSass = new ExtractTextPlugin({
    filename: "build.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, `dist`)
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.vue$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(ttf|eot|svg|woff2|woff)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        host: 'localhost',
        port: 9000,
        open: true,
        proxy: {
            '/auth': {
                target: "http://vet.3khub.com",
                changeOrigin: true
            },
            '/graphql': {
                target: "http://vet.3khub.com",
                changeOrigin: true
            }
        }
    },
    devtool: 'cheap-source-map',

    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            template: `./src/index.html`,
            inject: 'body',
            hash: true
        })
    ]
};