import { LoginFormFooter } from "pages/login/login-form/login-form-footer.comp";
import { createLoginFormFooterWithCaptcha } from "./login-footer.comp";

export class LoginGoogleCaptchaPlugin {
  static alias = "login-google-captcha-plugin";
  constructor(setting) {
    this.setting = setting;
  }
  init(store) {
    if (this.setting?.recaptchaSiteKey == null) {
      throw new Error("missing recaptchaSiteKey value in setting");
    }
    store.addComponent(
      LoginFormFooter,
      createLoginFormFooterWithCaptcha(this.setting.recaptchaSiteKey)
    );
  }
  static clone(setting) {
    const plugin = new LoginGoogleCaptchaPlugin(setting);
    return plugin;
  }
}
