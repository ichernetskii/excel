const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackplugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// == const ==

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

// == functions ==
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;
const jsLoaders = () => {
    const loaders = [{
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"]
        }
    }];

    if (isDev) {
        loaders.push("eslint-loader");
    }

    return loaders;
};

// == module.exports ==

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: ["@babel/polyfill", "./js/index.js"],
    devtool: isDev ? "source-map" : false,
    devServer: {
        port: 4200,
        hot: isDev
    },
    output: {
        filename: "./js/" + filename("js"),
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "core": path.resolve(__dirname, "src/core")
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackplugin({
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            },
            template: "index.html"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/favicon.ico"), to: ""
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename("css")
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
