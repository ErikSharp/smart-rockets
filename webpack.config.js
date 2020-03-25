const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: "./src/index.ts"
    },
    devtool: "inline-source-map",
    //web server that serves the bundles from memory
    devServer: {
        contentBase: "./dist"
    },
    plugins: [
        //this will clear the dist folder before building
        //https://www.npmjs.com/package/clean-webpack-plugin
        new CleanWebpackPlugin(),
        //manages the creation of the index.html file
        //https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            title: "P5 Typescript"
        })
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/,
                include: path.resolve(__dirname, "src"), //specifying the include makes it only do the files necessary
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};
