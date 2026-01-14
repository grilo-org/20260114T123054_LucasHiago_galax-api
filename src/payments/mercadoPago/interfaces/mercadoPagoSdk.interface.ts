import { AmountInstallment } from "./amountInstallments.interface";
import { IdentificationType } from "./identificationType.interface";
import { PaymentForm } from "./paymentForm.interface";
import { PaymentMethodSearch } from "./paymentMethodSearch.interface";

export interface MercadoPagoSDK {
  version: string;
  AJAX: void;
  clearSession: () => void;
  createDeviceProfile: void;
  createCardToken: (
      form: PaymentForm
  ) => void;
  deviceProfileId: string;
  getAllPaymentMethods: void;
  getIdentificationTypes: (
      callback: ((status: number, data: IdentificationType[]) => void)
  ) => void;
  getInstallments: (
      amount: AmountInstallment
  ) => void;
  getIssuers: void;
  getPaymentMethods: (
      card: PaymentMethodSearch
  ) => void;
  getPaymentMethod: () => void;
  initMercadoPago: () => void;
  initialized: boolean;
  initializedInsights: boolean;
  key: null;
  referer: string;
  sessionId: null;
  setPaymentMethods: () => void;
  setPublishableKey: (key: string) => void;
  tokenId: null;
  validateBinPattern: () => void;
  validateCardNumber: () => void;
  validateCardholderName: () => void;
  validateExpiryDate: (key1: string, key2?: string) => boolean;
  validateIdentification: () => void;
  validateLuhn: () => void;
  validateSecurityCode: () => void;
}