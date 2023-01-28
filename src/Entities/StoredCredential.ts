export default interface StoredCredential {
  model: "UNSCHEDULED" | "RECURRING" | "SUBSCRIPTION" | "INSTALLMENT";
  reason:
    | "INCREMENTAL"
    | "RESUBMISSION"
    | "REAUTHORIZATION"
    | "DELAYED"
    | "NO_SHOW";
  sequence: "FIRST" | "SUBSEQUENT" | "LAST";
  [key: string]: any;
}
