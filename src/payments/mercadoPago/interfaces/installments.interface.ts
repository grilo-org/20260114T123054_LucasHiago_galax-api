import { Issuer } from "./issuer.interface";
import { PayerCost } from "./payerCost.interface";

export interface Installments {
  payment_method_id: string;
  payment_type_id: string;
  issuer: Issuer;
  processing_mode: string;
  merchant_account_id?: any;
  payer_costs: PayerCost[];
  agreements?: any;
}