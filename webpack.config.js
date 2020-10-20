const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackplugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

// == const ==

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

// == functions ==
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;
const jsLoaders = () => {
    const loaders = ["babel-loader"];

    if (isDev) {
        loaders.push("eslint-loader");
    }

    return loaders;
};
const htmlPlugin = fileName => {
    if (!fileName) fileName = "index.html";

    return {
        minify: {
            removeComments: isProd,
            collapseWhitespace: isProd
        },
        template: fileName,
        filename: fileName
    }
};

// == module.exports ==

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: ["@babel/polyfill", "./js/index.js"],
    devtool: isDev ? "source-map" : false,
    devServer: {
        port: 4200,
        hot: isDev,
        contentBase: path.resolve(__dirname, "src"),
        watchContentBase: true
    },
    output: {
        filename: "./js/" + filename("js"),
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js"],
        alias: {
            "@": path.resolve(__dirname, "src/js"),
            "@core": path.resolve(__dirname, "src/js/core")
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackplugin(htmlPlugin()),
        new HTMLWebpackplugin(htmlPlugin("assets/dashboard.html")),
        new HTMLWebpackplugin(htmlPlugin("assets/excel.html")),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/favicon.ico"), to: ""
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename("css")
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            }
        ]
    }
}
