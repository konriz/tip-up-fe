import { Owner } from "@/services/jarsService/Owner";
import _Vue, { PluginObject } from "vue";

export class UserStore {
  private _user?: Owner = undefined;

  get user(): Owner | undefined {
    return this._user;
  }

  set user(owner: Owner | undefined) {
    this._user = owner;
  }
}

export class UserStorePlugin implements PluginObject<void> {
  install(Vue: typeof _Vue): void {
    Vue.prototype.$userStore = new UserStore();
  }
}
