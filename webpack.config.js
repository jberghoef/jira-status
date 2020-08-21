const path = require("path");

const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: ["babel-polyfill", "./frontend/js/index.tsx"],
    },
    output: {
        path: path.resolve(__dirname, "build/"),
        filename: "[name].bundle.js",
        sourceMapFilename: "[file].map",
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        port: 9000,
        overlay: true,
        open: true,
        historyApiFallback: true,
        proxy: [
            {
                context: ["/api/"],
                target: "http://localhost:8000",
            },
        ],
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                },
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            plugins: [autoprefixer],
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve("url-loader"),
                options: {
                    limit: 10000,
                    name: "[name].[hash:8].[ext]",
                },
            },
            {
                test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
                loader: require.resolve("file-loader"),
                options: {
                    name: "[name].[hash:8].[ext]",
                },
            },
        ],
    },
    resolve: {
        modules: [path.resolve("./node_modules")],
        extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./public",
                    to: "./",
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css",
            chunkFilename: "[id].chunk.css",
        }),
    ],
};
