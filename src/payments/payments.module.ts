import { DynamicModule, Module } from '@nestjs/common';
import { PaymentService } from './service/payments.service';
import { MercadoPagoService } from './mercadoPago/mercadoPago.service';
import { AuthService } from './mercadoPago/util/auth.service';

@Module({
  providers: [MercadoPagoService, AuthService]
})
export class PaymentsModule {
  static register(option: string): DynamicModule {
    return {
      module: PaymentsModule,
      providers: [
        {
          provide: 'IPaymentMethod',
          useClass: MercadoPagoService
        },
        PaymentService
      ],
      exports: [PaymentService]
    }
  }
}
