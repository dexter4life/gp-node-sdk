import {
  AuditTrailBuilder,
  IAuditReport,
} from "src/Builders/AuditTrailBuilder";
import { DeviceSynchronizationBuilder } from "src/Builders/DeviceSynchronizationBuilder";
import { DisputeManagementBuilder } from "src/Builders/DisputeManagementBuilder";
import { MerchantManagementBuilder } from "src/Builders/MerchantManagementBuilder";
import { PaymentMethodDetailBuilder } from "src/Builders/PaymentDetailBuilder";
import {
  ISettlementReport,
  SettlementReportBuilder,
} from "src/Builders/SettlementReportBuilder";
import { IDisputeReport } from "src/Entities/Dispute";
import { IMerchantReport } from "src/Entities/Merchant";
import { IPaymentMethodResult } from "src/Interface/IPaymentMethodResult";
import {
  AuthorizationBuilder,
  DigitalWalletBuilder,
  PaymentMethod,
  Transaction,
  TransactionReportBuilder,
} from "../";

export interface IPaymentGateway {
  processMerchantReport(
    builder: MerchantManagementBuilder,
  ): Promise<IMerchantReport>;
  processAuditReport(builder: AuditTrailBuilder): Promise<IAuditReport>;
  processDispute(builder: DisputeManagementBuilder): Promise<IDisputeReport>;
  processSettlementReport(
    builder: SettlementReportBuilder,
  ): Promise<ISettlementReport>;
  handlePaymentInfo(
    builder: PaymentMethodDetailBuilder,
  ): Promise<PaymentMethod | IPaymentMethodResult>;
  processDeviceSync(
    builder: DeviceSynchronizationBuilder,
  ): Promise<Transaction>;
  getAuthorizationHeader(): Promise<IPaymentGateway>;
  processAuthorization(builder: AuthorizationBuilder): Promise<Transaction>;
  processWalletAuthorization(
    builder: DigitalWalletBuilder,
  ): Promise<Transaction>;
  processTransaction(builder: TransactionReportBuilder): Promise<Transaction>;
}
