import { ServicesContainer } from "src";
import { ISettlementQuery } from "src/Interface/ISettlementQuery";

export interface ISettlementReport {}

export type SettlementReportType =
  | "MONTHLY_FEES"
  | "TRANSACTION_REPORT"
  | "DISPUTES_REPORT"
  | "DEPOSITS_REPORT";

export class SettlementReportBuilder {
  public type: SettlementReportType;
  public query: Partial<ISettlementQuery>;
  constructor(type: SettlementReportType, query: Partial<ISettlementQuery>) {
    this.type = type;
    this.query = query;
  }

  public async execute(): Promise<ISettlementReport> {
    const gateway = await ServicesContainer.instance()
      .getClient()
      .getAuthorizationHeader();

    return await gateway.processSettlementReport(this);
  }
}
