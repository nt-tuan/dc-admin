import { LoginGoogleCaptchaPlugin } from "./google-captcha-plugin/login/login-google-captcha.plugin";

const plugins = [LoginGoogleCaptchaPlugin];
export class PluginStore {
  constructor() {
    this.functionMap = {};
    this.componentMap = {};
    this.middlewares = {};
    this.plugins = [];
  }
  install(pluginConfig) {
    const { name, setting } = pluginConfig;
    const pluginClass = plugins.find((p) => p.alias === name);
    if (pluginClass) {
      const plugin = pluginClass.clone(setting);
      plugin.init(this);
      this.plugins.push(plugin);
      return;
    }
    throw new Error("plugin not found");
  }
  addFunction(key, func) {
    this.functionMap[key] = func;
  }
  addComponent(component, pluginComponent) {
    const key = component?.alias;
    this.componentMap[key] = pluginComponent;
  }
  addMiddleware(key, middleware) {
    if (this.middlewares[key] == null) {
      this.middlewares[key] = [];
    }
    this.middlewares[key].push(middleware);
  }
  executeFunction(key, ...args) {
    this.functionMap[key] && this.functionMap[key](...args);
  }
  executeMiddleware(key, ctx) {
    let prevIndex = -1;
    const runner = (index) => {
      if (index === prevIndex) {
        throw new Error("next get called multiple times");
      }
      const middleware = this.middlewares[key];
      if (!middleware || !middleware[index]) return;
      middleware[index](ctx, () => runner(index + 1));
    };
    runner(0);
  }
  hasComponent(component) {
    const key = component?.alias;
    if (!key) return false;
    return key in this.componentMap;
  }
  getComponent(component) {
    const key = component?.alias;
    return this.componentMap[key];
  }
}
