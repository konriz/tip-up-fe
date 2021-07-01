import Axios from "axios";
import { APIURL } from "@/main";
import { Owner } from "@/services/jarsService/Owner";

export class LoginService {
  static async login(owner: Owner): Promise<Owner> {
    return Axios.post<Owner>(APIURL + "/login", owner).then(result => result.data).catch(() => Promise.reject());
  }

  static async register(owner: Owner) {
    return Axios.post(APIURL + "/owners", owner);
  }

  static async logout() {
    return "Logout";
  }
}
