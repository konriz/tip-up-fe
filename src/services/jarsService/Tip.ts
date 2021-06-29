import { Owner } from "@/services/jarsService/Owner";

export interface Tip {
  from: Owner;
  to: Owner;
  amount: number;
  message: string;
}
