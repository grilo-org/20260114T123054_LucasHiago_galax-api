import { Setting } from "./setting.interface";

export interface PaymentMethod {
  id: string;
  name: string;
  payment_type_id: 'credit_card' | 'debit_card' | 'ticket' | 'pix';
  status: string;
  secure_thumbnail: string;
  thumbnail: string;
  deferred_capture: string;
  settings: Setting[];
  additional_info_needed: string[];
  min_allowed_amount: number;
  max_allowed_amount: number;
  accreditation_time: number;
  financial_institutions: any[];
  processing_modes: string[];
}