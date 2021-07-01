import { JarDto } from "@/services/jarsService/JarDto";
import { Tip } from "@/services/jarsService/Tip";
import Axios from "axios";
import { APIURL } from "@/main";
import { TipCreateDto } from "@/services/jarsService/TipCreateDto";

export class JarsService {
  static async getJars(): Promise<JarDto[]> {
    return Axios.get(APIURL).then(response => response.data);
  }

  static async sendTip(tip: Tip) {
    const tipCreateDto: TipCreateDto = {
      amount: tip.amount, message: tip.message, fromName: tip.from.name, secret: tip.from.secret!, toName: tip.to.name
    };
    return Axios.post(APIURL, tipCreateDto).then(response => response.data);

  }
}
