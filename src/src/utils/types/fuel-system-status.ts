export enum FuelSystemStatus {
  motorOff = 'motorOff',
  openInsufficientTemp = 'openInsufficientTemp',
  closedUsingOxSensor = 'closedUsingOxSensor',
  openEngineLoadOrDeceleration = 'openEngineLoadOrDeceleration',
  openSystemFailure = 'openSystemFailure',
  closedFeedbackSystemFault = 'closedFeedbackSystemFault',
}

export type FuelSystemStatuses = {
  system1Status: FuelSystemStatus;
  system2Status?: FuelSystemStatus;
};
