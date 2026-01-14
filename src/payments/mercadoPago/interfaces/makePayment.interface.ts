export interface MakePayment {
  transactionAmount: String;
  token: String;
  installments: String;
  paymentMethodId: String;
  issuerId: String;
  email: String;
  type: String;
  number: String;
}