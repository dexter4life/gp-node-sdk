export interface IAuditQuery {
  toTimeCreated: string;
  fromTimeCreated: string;
  pageSize: string;
  page: string;
  order: "ASC" | "DESC";
  orderBy: string;
}

export abstract class AuditAction {
  public query?: Partial<IAuditQuery>;
  public id: string;

  constructor(id?: string) {
    if (id !== undefined) {
      this.id = id;
    }
    this.query = {};
  }
}
