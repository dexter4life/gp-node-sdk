export type DisputeType =
  | "DISPUTE_LIST"
  | "DISPUTE_BY_ID"
  | "CHALLENGE"
  | "ACCEPTANCE"
  | "SETTLED"
  | "DISPUTE_DOC";

export abstract class Dispute {
  public id: string;
  public type: DisputeType;

  constructor(id?: string) {
    if (id !== undefined) this.id = id;
  }
}

export interface IDisputeReport {}
