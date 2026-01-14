import { IPaymentMethod } from '../../interface/payment.interface';
export class PagarMeService implements IPaymentMethod {
  async pay(value: number, params: any): Promise<any> {
    //console.log(`Value payed: ${value} with PagarMe`);
    return { status: 'Success', value }
  }

  async refund(transactionId: string, params: any): Promise<any> {
    //console.log(`Refund applied transaction: ${transactionId} with PagarMe`);
    return { status: 'Success', transactionId }
  }

  async signatures(params: any): Promise<any> {
    //console.log(`Signature applied transaction: ${params} with PagarMe`);
    return { status: 'Success', params }
  }
}