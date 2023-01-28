import { TransactionType } from "src/Entities";

export abstract class BaseBuilder<T> {
  protected payload: Record<string, any>;
  public transactionType: TransactionType;

  [key: string]: any;

  public constructor() {}

  public abstract execute(): Promise<T>;
}
