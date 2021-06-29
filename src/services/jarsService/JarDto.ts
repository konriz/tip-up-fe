import { Tip } from "@/services/jarsService/Tip";
import { Owner } from "@/services/jarsService/Owner";

export interface JarDto {
  owner: Owner;
  tipsReceived: Tip[];
  tipsGiven: Tip[];
}
