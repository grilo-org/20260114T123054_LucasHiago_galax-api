export interface CardInstallment {
  payment_type_id?: 'credit_card' | 'debit_card' | 'ticket';
  payment_method_id?: string;
  bin?: number | string;
}
