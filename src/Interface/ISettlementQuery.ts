export interface ISettlementQuery {
  page_size: number;
  from_batch_time_created: string;
  to_batch_time_created: string;
  order: string;
  page: number;
  account_name: string;
  status: string;
  "system.hierarchy": string;
  "system.mid": string;
  deposit_status: string;
}


