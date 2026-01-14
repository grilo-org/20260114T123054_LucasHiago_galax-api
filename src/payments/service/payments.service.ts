import { Inject, Injectable } from "@nestjs/common";
import { IPaymentMethod } from '../interface/payment.interface';

@Injectable()
export class PaymentService {
  constructor(@Inject('IPaymentMethod') private paymentMethod: IPaymentMethod) {}

  async pay(value: number, params: any) {
    return this.paymentMethod.pay(value, params);
  }

  async refund(transactionId: string, params: any) {
    return this.paymentMethod.refund(transactionId, params);
  }
}