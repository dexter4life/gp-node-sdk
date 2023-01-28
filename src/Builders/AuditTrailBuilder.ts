import { ServicesContainer } from "src";
import { AuditAction } from "src/Entities/Action";

export interface IAuditReport {}

export type ActionType = "ACTION_LIST" | "ACTION";

export class AuditTrailBuilder {
  public action: AuditAction;
  public type: ActionType;
  constructor(type: ActionType, action?: AuditAction) {
    this.type = type;
    if (action !== undefined) this.action = action;
  }

  public async execute(): Promise<IAuditReport> {
    const gateway = await ServicesContainer.instance()
      .getClient()
      .getAuthorizationHeader();

    return await gateway.processAuditReport(this);
  }
}
