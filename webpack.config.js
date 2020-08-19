const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Port for webpack server
const webpackDevServerPort = 8081;
// Blazor app url. It's the target for the webpack reverse proxy.
// No https. The Blazor app must have https redirection disabled.
const httpTarget = "http://localhost:5000";
// The same for Blazor's web socket
const wsTarget = "ws://localhost:5000";
// Public assets folder
const contentBase = path.join(__dirname, "wwwroot");

module.exports = (env, argv) => {
    const mode = argv.mode || "development";
    const dev = mode.toLowerCase() === "development";

    return {
        name: "blazor webpack sass typescript config",
        mode: mode,
        target: "web",
        stats: {
            colors: true
        },
        entry: "./ClientAssets/TypeScript/src/main.ts",
        output: {
            path: path.resolve(__dirname, "wwwroot/generated"),
            filename: "[name].js",
            publicPath: "/generated/"
        },
        resolve: {
            extensions: [".ts", ".js"]
        },
        devtool: dev ? "source-map" : false,
        devServer: {
            // Enable HMR
            hot: true,
            proxy: {
                '/_blazor': {
                    target: wsTarget,
                    ws: true
                },
                '*': {
                    target: httpTarget
                },
            },
            port: webpackDevServerPort,
            contentBase: contentBase,
            // A browser reload is forced when something changes on 'wwwroot'
            // On 'Program.cs' a file is touched on every app restart, so webpack reloads the page.
            // For it to work, the file must exist when 'webpack-dev-server' is started.
            // If it doesn't exists on startup, it's ignored.
            watchContentBase: true,
            publicPath: "/generated/",
            //open: true
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: "ts-loader"
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: dev
                            }
                        },
                        "css-loader",
                        {
                            // Settings required for bootstrap (https://getbootstrap.com/docs/4.0/getting-started/webpack/)
                            loader: "postcss-loader",
                            options: {
                                plugins: function () {
                                    return [
                                        require("precss"),
                                        require("autoprefixer")
                                    ];
                                }
                            }
                        },
                        "resolve-url-loader",
                        { loader: "sass-loader", options: { sourceMap: true, implementation: require("sass") } }
                    ]
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: "url-loader",
                    options: { name: "fonts/[name]-[contenthash].[ext]", limit: 15000 },
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loader: "url-loader",
                    options: { name: "images/[name]-[contenthash].[ext]", limit: 15000 },
                },
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css"
            })
        ]
    };
};

