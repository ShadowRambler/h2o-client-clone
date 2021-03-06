import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
    debug: true,
    noInfo: true, // set to false to see a list of every file being bundled.
    entry: {
        frontend: ['webpack-hot-middleware/client?reload=true', 'webpack/hot/only-dev-server', path.resolve(__dirname, '../src/frontend/index')],
        backend: ['webpack-hot-middleware/client?reload=true', 'webpack/hot/only-dev-server', path.resolve(__dirname, '../src/backend/index')],
        courier: ['webpack-hot-middleware/client?reload=true', 'webpack/hot/only-dev-server', path.resolve(__dirname, '../src/courier/index')],
    },
    devtool: 'source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    // devtool: 'cheap-module-eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    module: {
        loaders: [
            {
                test: /src(\\|\/).+\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    plugins: ['transform-decorators-legacy',  ["import", [{ "libraryName": "antd" ,"style": "css"},{ "libraryName": "antd-mobile" }]]],
                    presets: ['latest', 'react', 'stage-0', 'react-hmre']
                }
            },
            {test: /\.s?css$/, loader: 'style!css!sass'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.js', '.js', '.json', '.jsx'],
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: '../dist',
        hot: true,
        inline: true,
        progress: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: 'frontend',
            filename: path.resolve(__dirname, '../dist/frontend.html'),
            template:path.resolve(__dirname, '../src/frontend/index.html'),
            chunks: ['frontend']
        }),
        new HtmlWebpackPlugin({
            title: 'backend',
            filename: path.resolve(__dirname, '../dist/backend.html'),
            template:path.resolve(__dirname, '../src/backend/index.html'),
            chunks: ['backend']
        }),
        new HtmlWebpackPlugin({
            title: 'courier',
            filename: path.resolve(__dirname, '../dist/courier.html'),
            template:path.resolve(__dirname, '../src/courier/index.html'),
            chunks: ['courier']
        })
    ]
};
