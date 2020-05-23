// Overriding CreateReactApp settings, ref: https://github.com/arackaf/customize-cra
const path = require("path");
const antdTheme = require("./src/theme.js");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const {
  override,
  fixBabelImports,
  addLessLoader,
  useEslintRc,
  addDecoratorsLegacy,
  addWebpackModuleRule,
  addWebpackPlugin
} = require("customize-cra");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

const setGlobalObject = (value) => (config) => {
  // mutate config as you want
  config.output.globalObject = value;

  // return config so the next function in the pipeline receives it as argument
  return config;
};

const options = {
  stylesDir: path.join(__dirname, "./src/assets/styles/less"),
  antDir: path.join(__dirname, "./node_modules/antd"),
  varFile: path.join(__dirname, "./src/assets/styles/less/vars.less"),
  mainLessFile: path.join(__dirname, "./src/assets/styles/less/main.less"),
  themeVariables: [
    "@primary-color",
    "@text-color",
    "@text-color-secondary",
    "@heading-color",
    "@layout-body-background",
    "@btn-primary-bg",
    "@layout-header-background",
    "@border-color-base"
  ],
  indexFileName: "index.html",
  lessUrl: "",
  generateOnce: false // generate color.less on each compilation
};

const addAntTheme = (value) => (config) => {
  config.plugins.push(new AntDesignThemePlugin(options));
  return config;
};

module.exports = override(
  addDecoratorsLegacy(),
  useEslintRc(),
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
  addAntTheme(),
  addWebpackModuleRule({
    test: /\.worker\.js$/,
    use: { loader: "worker-loader" }
  }),
  addWebpackPlugin(new AntdDayjsWebpackPlugin())
);
