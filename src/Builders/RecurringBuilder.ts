import { IRecurringEntity, ServicesContainer, TransactionType } from "../";
import { TransactionBuilder } from "./TransactionBuilder";

export interface IDictionary<T> {
  [key: string]: T;
}

export class RecurringBuilder<
  T extends IRecurringEntity
> extends TransactionBuilder<T> {
  public key: string;
  public orderId: string;
  public entity: IRecurringEntity | Function;
  public searchCriteria: IDictionary<string>;

  public constructor(
    type: TransactionType,
    entity?: IRecurringEntity | Function,
  ) {
    super(type);
    this.searchCriteria = {};
    if (entity) {
      this.entity = entity;
      this.key = (entity as any).key;
    }
  }

  public addSearchCriteria(key: string, value: string) {
    this.searchCriteria[key] = value;
    return this;
  }

  public execute(): Promise<T> {
    return ServicesContainer.instance()
      .getRecurringClient()
      .processRecurring(this);
  }

  public setupValidations() {
    // todo
  }
}
