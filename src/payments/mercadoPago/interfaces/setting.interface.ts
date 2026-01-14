import { Bin, CardNumber, SecurityCode } from "./card";

export interface Setting {
  card_number: CardNumber;
  bin: Bin;
  security_code: SecurityCode;
}