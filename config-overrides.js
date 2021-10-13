// Overriding CreateReactApp settings, ref: https://github.com/arackaf/customize-cra
const path = require("path");
const antdTheme = require("./src/theme.js");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackModuleRule,
  addWebpackPlugin
} = require("customize-cra");

const setGlobalObject = (value) => (config) => {
  // mutate config as you want
  config.output.globalObject = value;
  // return config so the next function in the pipeline receives it as argument
  return config;
};

module.exports = override(
  addDecoratorsLegacy(),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: antdTheme
  }),
  setGlobalObject("this"),
  addWebpackModuleRule({
    test: /\.worker\.js$/,
    use: { loader: "worker-loader" }
  }),
  addWebpackPlugin(new AntdDayjsWebpackPlugin())
);
