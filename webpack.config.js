const path = require("path");
const appConfig = require("config-tsx");
const CheckerPlugin = require("awesome-typescript-loader").CheckerPlugin;
const merge = require("webpack-merge");
const webpack = require("webpack");

const options = {
    "client-root": "ClientApp",
    "input-dir": path.normalize(`${__dirname}/ClientApp/`),
    "entry-file": path.normalize(`${__dirname}/ClientApp/boot-client.tsx`),
    "output-dir": path.normalize(`${__dirname}/ClientApp/dist`)
};

const appSettings = appConfig.createPaths(__dirname, options);
const clientBundleOutputDir = path.normalize(`${__dirname}/dist`);

module.exports = env => {
    let isProd = env === "prod" ? true : false;

    const sharedConfig = () => ({
        stats: {
            modules: false
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"]
        },
        output: {
            filename: "[name].bundle.js",
            publicPath: "dist/"
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                include: [
                    appSettings["input-dir"]
                ],
                loader: "awesome-typescript-loader",
                options: {
                    useBabel: true,
                    babelOptions: {
                        presets: [
                            "es2015",
                            "react"
                        ]
                    },
                    useCache: true
                }
            }]
        },
        plugins: [new CheckerPlugin()]
    });

    const clientBundleOutputDir = path.normalize(`${__dirname}/dist`);
    const clientConfig = merge(sharedConfig(), {
        entry: {
            "client": path.join(appSettings["input-dir"], "boot-client.tsx")
        },
        output: {
            path: clientBundleOutputDir
        },
        plugins: [!isProd ?
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            }) :
            new webpack.optimize.UglifyJsPlugin()
        ],
        devServer: {
            contentBase: path.normalize(`${__dirname}/dist`),
            port: 5000,
            hot: true,
            hotOnly: false,
            open: true,
        }
    });
    return clientConfig;
}