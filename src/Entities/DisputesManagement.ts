import {
  DisputeManagementBuilder,
  IDisputeQuery,
} from "src/Builders/DisputeManagementBuilder";
import { Dispute } from "./Dispute";

export class DisputeManagement extends Dispute {
  public documents: { b64Content: string }[];

  setJsonDocument(json: string) {
    this.documents.push({ b64Content: json });
  }

  constructor(id?: string) {
    super(id);

    this.documents = [];
  }

  /**
   *   Get a list of disputes recently processed, using criteria passed in the query string.
   * Page through the result set to access all records.
   * @param query Partial<IDisputeQuery>
   * @returns DisputeManagementBuilder
   */
  public getDisputes(query?: Partial<IDisputeQuery>) {
    return new DisputeManagementBuilder(
      { ...this, type: "DISPUTE_LIST" },
      query,
    );
  }

  /**
   * Get info about a Dispute on the Global Payments system using the unique id created by
   * Global Payments for that Dispute.
   * @returns DisputeManagementBuilder
   */
  public getDispute() {
    return new DisputeManagementBuilder({ ...this, type: "DISPUTE_BY_ID" });
  }

  /**
   * Challenge a Dispute by providing evidence indicating Merchant does not have liability
   * for a particular Dispute.
   * @returns DisputeManagementBuilder
   */
  public challenge() {
    return new DisputeManagementBuilder({ ...this, type: "CHALLENGE" });
  }

  /**
   * Accept liability for a Dispute that will likely result in financial impact to the Merchant.
   * @returns DisputeManagementBuilder
   */
  public accept() {
    return new DisputeManagementBuilder({ ...this, type: "ACCEPTANCE" });
  }

  /**
   * Get a Document associated with a Dispute.
   * @param docId
   * @returns DisputeManagementBuilder
   */
  public downloadDoc(docId: string) {
    return new DisputeManagementBuilder({
      ...this,
      type: "DISPUTE_DOC",
      docId,
    });
  }
}
