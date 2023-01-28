import { ServicesContainer } from "src";
import { Dispute } from "src/Entities/Dispute";

export interface IDisputeQuery {
  page: string;
  pageSize: string;
  order: "ASC" | "DESC" | string;
  orderYy: string;
  arn: string;
  brand: "VISA" | "MASTERCARD" | "AMEX" | "DINERS" | "DISCOVER" | "JBC" | "CUP";
  status: "UNDER_REVIEW" | "WITH_MERCHANT" | "CLOSED";
  stage:
    | "RETRIEVAL"
    | "CHARGEBACK"
    | "REVERSAL"
    | "SECOND_CHARGEBACK"
    | "PRE_ARBITRATION"
    | "ARBITRATION"
    | "PRE_CONPLIANCE"
    | "COMPLIANCE";

  fromStageTimeCreated: string;
  fromAdjustmentTimeCreated: string;
  toAdjustmentTimeCreated: string;
  toStageTimeCreated: string;
  "system.mid": string;
  "system.hierarchy": string;
  page_size: 1000;
  lastAdjustmentFunding: string;
  result: string;
  id: string;
  fromStatusTimeCreated: string;
  [key: string]: any;
}

export interface ISettlementReport {}

export class DisputeManagementBuilder {
  public disputeManager: Dispute;
  public query: Partial<IDisputeQuery>;
  constructor(dispute: Dispute, query?: Partial<IDisputeQuery>) {
    this.disputeManager = dispute;
    if (query !== undefined) this.query = query;
  }

  public async execute(): Promise<ISettlementReport> {
    const gateway = await ServicesContainer.instance()
      .getClient()
      .getAuthorizationHeader();

    return await gateway.processDispute(this);
  }
}
