const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin"); //processes html files for asset management
const {CleanWebpackPlugin} = require("clean-webpack-plugin"); //recreates dist directory on each build
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/template.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        assetModuleFilename: "imgs/[name][ext]" //for using webpack's native asset management module
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                type: "asset/resource",
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, //extract css into files
                    "css-loader" //turn css into js
                ]
            },
        ]
    }
};