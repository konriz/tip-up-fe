import Axios from "axios";
import { APIURL } from "@/main";
import { Owner } from "@/services/jarsService/Owner";

export class LoginService {
  static async login(login: string, secret: string) {
    return login;
  }

  static async register(login: string, secret: string) {
    const owner: Owner = {name: login, secret};
    return Axios.post(APIURL + "/owners", owner);
  }

  static async logout() {
    return "Logout";
  }
}
