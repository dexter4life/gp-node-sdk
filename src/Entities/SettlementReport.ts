import { SettlementReportBuilder } from "src/Builders/SettlementReportBuilder";
import { ISettlementQuery } from "src/Interface/ISettlementQuery";

export class SettlementReport {
  public monthlyFees(query: Partial<ISettlementQuery>) {
    return new SettlementReportBuilder("MONTHLY_FEES", query);
  }
  public depositReport(query: Partial<ISettlementQuery>) {
    return new SettlementReportBuilder("DEPOSITS_REPORT", query);
  }
  public disputesReport(query: Partial<ISettlementQuery>) {
    return new SettlementReportBuilder("DISPUTES_REPORT", query);
  }
  public transactionReport(query: Partial<ISettlementQuery>) {
    return new SettlementReportBuilder("TRANSACTION_REPORT", query);
  }
}
