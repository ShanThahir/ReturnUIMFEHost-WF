const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');
const dependencies = require("./package.json").dependencies;

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devServer: {
        port: 3000,
        liveReload: true,
        historyApiFallback: true,
    },
    output: {
        publicPath: 'auto',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                remoteApp1: 'remoteApp1@http://localhost:3004/remoteEntry.js',
            },
            shared: {
                "react": {
                    singleton: true,
                    eager: true,
                    requiredVersion: dependencies.react
                },
                "react-dom": {
                    singleton: true,
                    eager: true,
                    requiredVersion: dependencies["react-dom"]
                },
                "@mui/material": {
                    singleton: true,
                    eager: true,
                    requiredVersion: dependencies["@mui/material"]
                },
                "@mui/icons-material": {
                    singleton: true,
                    eager: true,
                    requiredVersion: dependencies["@mui/icons-material"]
                },
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};