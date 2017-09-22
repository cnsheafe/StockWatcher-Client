const path = require("path");
const appConfig = require("config-tsx");
const CheckerPlugin = require("awesome-typescript-loader").CheckerPlugin;
const merge = require("webpack-merge");
const webpack = require("webpack");

const options = {
  "client-root": "ClientApp",
  "input-dir": path.normalize(`${__dirname}/ClientApp/`),
  "entry-file": path.normalize(`${__dirname}/ClientApp/src/store/actionsAsync.tests.ts`),
  "output-dir": path.normalize(`${__dirname}/__tests__`)
};

const appSettings = appConfig.createPaths(__dirname, options);
const clientBundleOutputDir = path.normalize(`${__dirname}/__tests__`);

appConfig.createTsConfig(__dirname, appSettings["out-dir"]);

module.exports = () => {

  const sharedConfig = () => ({
    resolve: {
      extensions: [".js", ".ts", ".tsx"]
    },
    output: {
      path: clientBundleOutputDir,
      filename: "[name].test.js"
    },
    module: {
      rules: [{
        test: /\.ts?$/,
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
    node: {
      fs: "empty"
    }
  });

  const actionsEntry = path
    .normalize(`${appSettings["input-dir"]}/src/store/actions.tests.ts`);

  const actionsAsyncEntry = path
    .normalize(`${appSettings["input-dir"]}/src/store/actionsAsync.tests.ts`);

  const actionsConfig = merge(sharedConfig(), {
    entry: {
      "actions": actionsEntry
    }
  });

  const actionsAsyncConfig = merge(sharedConfig(), {
    entry: {
      "actionsAsync": actionsAsyncEntry
    }
  });

  // return [actionsConfig];
  return [actionsConfig, actionsAsyncConfig];
}