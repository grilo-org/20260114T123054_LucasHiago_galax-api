import { Cardholder } from "./cardHolder.interface";

export interface CardToken {
  card_number_length: number;
  cardholder: Cardholder;
  date_created: string;
  date_due: string;
  date_last_updated: string;
  expiration_month: number;
  expiration_year: number;
  first_six_digits: string;
  id: string;
  last_four_digits: string;
  live_mode: boolean;
  luhn_validation: boolean;
  public_key: string;
  require_esc: boolean;
  security_code_length: number;
  status: string;
}