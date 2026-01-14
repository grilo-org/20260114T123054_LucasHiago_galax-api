export interface PaymentForm {
  cardNumber: string;
  cardholderName: string;
  securityCode: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  identificationType: string;
  identificationNumber: string;
}