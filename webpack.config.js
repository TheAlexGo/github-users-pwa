const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.png$/i,
                type: 'asset/resource',
            },
            {
                test: /\.webmanifest$/i,
                use: 'webpack-webmanifest-loader',
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
        }),
        new EslintWebpackPlugin({
            files: '{**/*,*}.{tsx,ts,js}',
        }),
        new StylelintWebpackPlugin({
            files: '{**/*,*}.css',
        }),
        new DotEnv(),
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            maximumFileSizeToCacheInBytes: 3145728,
            exclude: [/\.(?:png|jpg|jpeg|svg)$/],

            runtimeCaching: [
                {
                    urlPattern: /\.(?:png|jpg|jpeg|svg|js|css)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'statics',
                        expiration: {
                            maxEntries: 10,
                        },
                    },
                },
                {
                    urlPattern: ({ url }) => /(\W|^)(api\.github\.com)(\W|$)/.test(url),
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'api.github',
                        expiration: {
                            maxAgeSeconds: 86400000,
                        },
                    },
                },
                {
                    urlPattern: ({ url }) => /(\W|^)(avatars\.githubusercontent\.com)(\W|$)/.test(url),
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'avatars.githubusercontent',
                    },
                },
                {
                    urlPattern: ({ url }) => /(\W|^)(fonts\.gstatic\.com|fonts\.googleapis\.com)(\W|$)/.test(url),
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'google.static',
                    },
                },
            ],
        }),
    ],
    devServer: {
        open: true,
        historyApiFallback: true,
    },
};
