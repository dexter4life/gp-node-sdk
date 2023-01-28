export default interface Notification {
  returnUrl: string;
  statusUrl: string;
  challengeReturnUrl: string;
  threeDsMethodReturnUrl: string;
  decoupledChallengeReturnUrl: string;
}
