export interface IPaymentMethod {
  pay(value: number, params: any): Promise<any>;
  refund(transactionId: string, params: any): Promise<any>;
  signatures(params: any): Promise<any>;
}