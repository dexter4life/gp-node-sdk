import { AuditTrailBuilder } from "src/Builders/AuditTrailBuilder";
import { AuditAction, IAuditQuery } from "./Action";

export class Audit extends AuditAction {
  constructor(id?: string) {
    super(id);
  }

  public getActionList(query?: Partial<IAuditQuery>) {
    return new AuditTrailBuilder("ACTION_LIST", { ...this, query });
  }

  public getAction() {
    return new AuditTrailBuilder("ACTION", this);
  }
}
