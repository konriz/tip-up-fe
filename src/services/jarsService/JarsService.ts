import { JarDto } from "@/services/jarsService/JarDto";
import { Tip } from "@/services/jarsService/Tip";
import Axios from "axios";
import { APIURL } from "@/main";

export class JarsService {
  static async getJars(): Promise<JarDto[]> {
    return Axios.get(APIURL).then(response => response.data);
  }

  static async sendTip(tip: Tip) {
    console.log(`Tip sent ${JSON.stringify(tip)}`);
  }
}
