export interface PayerCost {
  installments: number;
  installment_rate: number;
  discount_rate: number;
  reimbursement_rate?: number;
  labels: string[];
  installment_rate_collector: string[];
  min_allowed_amount: number;
  max_allowed_amount: number;
  recommended_message: string;
  installment_amount?: number;
  total_amount?: number;
  payment_method_option_id: string;
}