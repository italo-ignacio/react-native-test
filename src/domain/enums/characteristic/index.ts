/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable max-lines */
export enum CharacteristicType {
  vin = '0902',
  vin2 = '0904',
  vin3 = '090A',
  dtcStored = '03',
  dtcPending = '07',
  dtcPermanent = '0A',
  monitorStatus = '0101',
  freezeFrameDTC = '0102',
  fuelSystemStatus = '0103',
  calcEngineLoad = '0104',
  engineCoolantTemp = '0105',
  fuelTrimBank1ShortTerm = '0106',
  fuelTrimBank1LongTerm = '0107',
  fuelTrimBank2ShortTerm = '0108',
  fuelTrimBank2LongTerm = '0109',
  fuelPressure = '010a',
  intakeManifoldPressure = '010b',
  engineSpeed = '010c',
  vehicleSpeed = '010d',
  timingAdvance = '010e',
  intakeAirTemperature = '010f',
  mafAirFlowRate = '0110',
  throttlePosition = '0111',
  commandedSecondaryAirStatus = '0112',
  oxygenSensorsPresentBanks2 = '0113',
  oxygenSensorVoltageB1S1 = '0114',
  oxygenSensorVoltageB1S2 = '0115',
  oxygenSensorVoltageB1S3 = '0116',
  oxygenSensorVoltageB1S4 = '0117',
  oxygenSensorVoltageB2S1 = '0118',
  oxygenSensorVoltageB2S2 = '0119',
  oxygenSensorVoltageB2S3 = '011a',
  oxygenSensorVoltageB2S4 = '011b',
  obdStandard = '011c',
  oxygenSensorsPresentBanks4 = '011d',
  auxInputStatus = '011e',
  runtimeSinceEngineStart = '011f',
  pidsSupported_21_40 = '0120',
  distanceWithMILON = '0121',
  fuelRailPressure = '0122',
  fuelRailPressureGauge = '0123',
  oxygenSensor1AFR_CD_Voltage = '0124',
  oxygenSensor2AFR_CD_Voltage = '0125',
  oxygenSensor3AFR_CD_Voltage = '0126',
  oxygenSensor4AFR_CD_Voltage = '0127',
  oxygenSensor5AFR_CD_Voltage = '0128',
  oxygenSensor6AFR_CD_Voltage = '0129',
  oxygenSensor7AFR_CD_Voltage = '012a',
  oxygenSensor8AFR_CD_Voltage = '012b',
  commandedEGR = '012c',
  egrError = '012d',
  commandedEvaporativePurge = '012e',
  fuelTankLevelInput = '012f',
  warmUpsSinceCodesCleared = '0130',
  distanceTraveledSinceCodesCleared = '0131',
  evapSystemVaporPressure = '0132',
  absoluteBarometricPressure = '0133',
  oxygenSensor1AB_CD_Current = '0134',
  oxygenSensor2AB_CD_Current = '0135',
  oxygenSensor3AB_CD_Current = '0136',
  oxygenSensor4AB_CD_Current = '0137',
  oxygenSensor5AB_CD_Current = '0138',
  oxygenSensor6AB_CD_Current = '0139',
  oxygenSensor7AB_CD_Current = '013a',
  oxygenSensor8AB_CD_Current = '013b',
  catalystTempBank1Sensor1 = '013c',
  catalystTempBank2Sensor1 = '013d',
  catalystTempBank1Sensor2 = '013e',
  catalystTempBank2Sensor2 = '013f',
  pidsSupported_41_60 = '0140',
  monitorStatusThisDriveCycle = '0141',
  controlModuleVoltage = '0142',
  absoluteLoadValue = '0143',
  commandedAFR = '0144',
  relativeThrottlePosition = '0145',
  ambientAirTemperature = '0146',
  absoluteThrottlePositionB = '0147',
  absoluteThrottlePositionC = '0148',
  acceleratorPedalPositionD = '0149',
  acceleratorPedalPositionE = '014a',
  acceleratorPedalPositionF = '014b',
  commandedThrottleActuator = '014c',
  timeRunWithMILOn = '014d',
  timeSinceTroubleCodesCleared = '014e',
  maxValuesAFR_Voltage_Current_IMAP = '014f',
  maxAirFlowRateFromMAF = '0150',
  fuelType = '0151',
  ethanolFuelPercentage = '0152',
  absoluteEvapSystemVaporPressure = '0153',
  evapSystemVaporPressure2 = '0154',
  shortTermSecondaryOxygenSensorTrimB1B3 = '0155',
  longTermSecondaryOxygenSensorTrimB1B3 = '0156',
  shortTermSecondaryOxygenSensorTrimB2B4 = '0157',
  longTermSecondaryOxygenSensorTrimB2B4 = '0158',
  fuelRailAbsolutePressure = '0159',
  relativeAcceleratorPedalPosition = '015a',
  hybridBatteryPackRemainingLife = '015b',
  engineOilTemperature = '015c',
  fuelInjectionTiming = '015d',
  engineFuelRate = '015e',
  emissionRequirements = '015f',
  pidsSupported_61_80 = '0160',
  driversDemandEnginePercentTorque = '0161',
  actualEnginePercentTorque = '0162',
  engineReferenceTorque = '0163',
  enginePercentTorqueData = '0164',
  auxiliaryInputOutputSupported = '0165',
  massAirFlowSensor = '0166',
  engineCoolantTemperatureSensor = '0167',
  intakeAirTemperatureSensor = '0168',
  actualEGR_CommandedEGR_EGRError = '0169',
  commandedDieselIntakeAirFlowControl_RelativeIntakeAirFlowPosition = '016a',
  exhaustGasRecirculationTemperature = '016b',
  commandedThrottleActuatorControl_RelativeThrottlePosition = '016c',
  fuelPressureControlSystem = '016d',
  injectionPressureControlSystem = '016e',
  turbochargerCompressorInletPressure = '016f',
  boostPressureControl = '0170',
  variableGeometryTurboControl = '0171',
  wastegateControl = '0172',
  exhaustPressure = '0173',
  turbochargerRPM = '0174',
  turbochargerTemperature = '0175',
  turbochargerTemperature_B2 = '0176',
  chargeAirCoolerTemperature = '0177',
  exhaustGasTemperature_Bank1 = '0178',
  exhaustGasTemperature_Bank2 = '0179',
  dieselParticulateFilterDifferentialPressure = '017a',
  dieselParticulateFilter = '017b',
  dieselParticulateFilterTemperature = '017c',
  NOxNTENotToExceedControlAreaStatus = '017d',
  PMNTENotToExceedControlAreaStatus = '017e',
  engineRunTime_B = '017f',
  pidsSupported_81_A0 = '0180',
  engineRunTimeForAECD_11_15 = '0181',
  engineRunTimeForAECD_16_20 = '0182',
  NOxSensor = '0183',
  manifoldSurfaceTemperature = '0184',
  NOxReagentSystem = '0185',
  particulateMatterSensor = '0186',
  intakeManifoldAbsolutePressure = '0187',
  SCRInduceSystem = '0188',
  runTimeForAECD_11_15 = '0189',
  runTimeForAECD_16_20 = '018a',
  dieselAftertreatment = '018b',
  O2Sensor_WideRange = '018c',
  throttlePositionG = '018d',
  engineFriction_PercentTorque = '018e',
  PMSensor_Bank1_Bank2 = '018f',
  wwhOBDOBDSystemInformation = '0190',
  wwhOBDOBDSystemInformation_B = '0191',
  fuelSystemControl = '0192',
  wwhOBDOBDCountersSupport = '0193',
  NOxWarningAndInducementSystem = '0194',
  exhaustGasTemperatureSensor = '0198',
  exhaustGasTemperatureSensor_Bank2 = '0199',
  hybridEVVehicleSystemData_Battery_Voltage = '019a',
  dieselExhaustFluidSensorData = '019b',
  O2SensorData = '019c',
  engineFuelRate_B = '019d',
  engineExhaustFlowRate = '019e',
  fuelSystemPercentageUse = '019f',
  pidsSupported_A1_C0 = '01a0',
  NOxSensorCorrectedData = '01a1',
  cylinderFuelRate = '01a2',
  evapSystemVaporPressure_B2 = '01a3',
  transmissionActualGear = '01a4',
  commandedDieselExhaustFluidDosing = '01a5',
  odometer = '01a6',
  NOxSensorConcentrationSensors3And4 = '01a7',
  NOxSensorCorrectedConcentrationSensors3And4 = '01a8',
  absDisableSwitchState = '01a9',
  pidsSupported_C1_E0 = '01c0',
  fuelLevelInput_AB = '01c3',
  exhaustParticulateControlSystemDiagnosticTimeCount = '01c4',
  fuelPressure_AB = '01c5',
  particulateControl_Byte1_Byte2_3_Byte4_5_Byte6_7 = '01c6',
  distanceSinceReflashOrModuleReplacement = '01c7',
  NOxControlDiagnostic_NCD_PartD_ControlLampStatus = '01c8'
}

export enum FuelSystemStatus {
  motorOff = 'motorOff',
  openInsufficientTemp = 'openInsufficientTemp',
  closedUsingOxSensor = 'closedUsingOxSensor',
  openEngineLoadOrDeceleration = 'openEngineLoadOrDeceleration',
  openSystemFailure = 'openSystemFailure',
  closedFeedbackSystemFault = 'closedFeedbackSystemFault'
}

export interface FuelSystemStatuses {
  system1Status: FuelSystemStatus;
  system2Status?: FuelSystemStatus;
}

export interface MonitorStatus {
  isCELOn: boolean;
  isDiesel: boolean;
}

export enum CharacteristicValues {
  vin = 'vin',
  monitorStatus = 'monitorStatus',
  freezeFrameDTC = 'freezeFrameDTC',
  fuelSystemStatus = 'fuelSystemStatus',
  calcEngineLoad = 'calcEngineLoad',
  engineCoolantTemp = 'engineCoolantTemp',
  fuelTrimBank1ShortTerm = 'fuelTrimBank1ShortTerm',
  fuelTrimBank1LongTerm = 'fuelTrimBank1LongTerm',
  fuelTrimBank2ShortTerm = 'fuelTrimBank2ShortTerm',
  fuelTrimBank2LongTerm = 'fuelTrimBank2LongTerm',
  fuelPressure = 'fuelPressure',
  intakeManifoldPressure = 'intakeManifoldPressure',
  engineSpeed = 'engineSpeed',
  vehicleSpeed = 'vehicleSpeed',
  timingAdvance = 'timingAdvance',
  intakeAirTemperature = 'intakeAirTemperature',
  mafAirFlowRate = 'mafAirFlowRate',
  throttlePosition = 'throttlePosition',
  commandedSecondaryAirStatus = 'commandedSecondaryAirStatus',
  oxygenSensorsPresentBanks2 = 'oxygenSensorsPresentBanks2',
  oxygenSensorVoltageB1S1 = 'oxygenSensorVoltageB1S1',
  oxygenSensorVoltageB1S2 = 'oxygenSensorVoltageB1S2',
  oxygenSensorVoltageB1S3 = 'oxygenSensorVoltageB1S3',
  oxygenSensorVoltageB1S4 = 'oxygenSensorVoltageB1S4',
  oxygenSensorVoltageB2S1 = 'oxygenSensorVoltageB2S1',
  oxygenSensorVoltageB2S2 = 'oxygenSensorVoltageB2S2',
  oxygenSensorVoltageB2S3 = 'oxygenSensorVoltageB2S3',
  oxygenSensorVoltageB2S4 = 'oxygenSensorVoltageB2S4',
  obdStandard = 'obdStandard',
  oxygenSensorsPresentBanks4 = 'oxygenSensorsPresentBanks4',
  auxInputStatus = 'auxInputStatus',
  runtimeSinceEngineStart = 'runtimeSinceEngineStart',
  pidsSupported_21_40 = 'pidsSupported_21_40',
  distanceWithMILON = 'distanceWithMILON',
  fuelRailPressure = 'fuelRailPressure',
  fuelRailPressureGauge = 'fuelRailPressureGauge',
  oxygenSensor1AFR_CD_Voltage = 'oxygenSensor1AFR_CD_Voltage',
  oxygenSensor2AFR_CD_Voltage = 'oxygenSensor2AFR_CD_Voltage',
  oxygenSensor3AFR_CD_Voltage = 'oxygenSensor3AFR_CD_Voltage',
  oxygenSensor4AFR_CD_Voltage = 'oxygenSensor4AFR_CD_Voltage',
  oxygenSensor5AFR_CD_Voltage = 'oxygenSensor5AFR_CD_Voltage',
  oxygenSensor6AFR_CD_Voltage = 'oxygenSensor6AFR_CD_Voltage',
  oxygenSensor7AFR_CD_Voltage = 'oxygenSensor7AFR_CD_Voltage',
  oxygenSensor8AFR_CD_Voltage = 'oxygenSensor8AFR_CD_Voltage',
  commandedEGR = 'commandedEGR',
  egrError = 'egrError',
  commandedEvaporativePurge = 'commandedEvaporativePurge',
  fuelTankLevelInput = 'fuelTankLevelInput',
  warmUpsSinceCodesCleared = 'warmUpsSinceCodesCleared',
  distanceTraveledSinceCodesCleared = 'distanceTraveledSinceCodesCleared',
  evapSystemVaporPressure = 'evapSystemVaporPressure',
  absoluteBarometricPressure = 'absoluteBarometricPressure',
  oxygenSensor1AB_CD_Current = 'oxygenSensor1AB_CD_Current',
  oxygenSensor2AB_CD_Current = 'oxygenSensor2AB_CD_Current',
  oxygenSensor3AB_CD_Current = 'oxygenSensor3AB_CD_Current',
  oxygenSensor4AB_CD_Current = 'oxygenSensor4AB_CD_Current',
  oxygenSensor5AB_CD_Current = 'oxygenSensor5AB_CD_Current',
  oxygenSensor6AB_CD_Current = 'oxygenSensor6AB_CD_Current',
  oxygenSensor7AB_CD_Current = 'oxygenSensor7AB_CD_Current',
  oxygenSensor8AB_CD_Current = 'oxygenSensor8AB_CD_Current',
  catalystTempBank1Sensor1 = 'catalystTempBank1Sensor1',
  catalystTempBank2Sensor1 = 'catalystTempBank2Sensor1',
  catalystTempBank1Sensor2 = 'catalystTempBank1Sensor2',
  catalystTempBank2Sensor2 = 'catalystTempBank2Sensor2',
  pidsSupported_41_60 = 'pidsSupported_41_60',
  monitorStatusThisDriveCycle = 'monitorStatusThisDriveCycle',
  controlModuleVoltage = 'controlModuleVoltage',
  absoluteLoadValue = 'absoluteLoadValue',
  commandedAFR = 'commandedAFR',
  relativeThrottlePosition = 'relativeThrottlePosition',
  ambientAirTemperature = 'ambientAirTemperature',
  absoluteThrottlePositionB = 'absoluteThrottlePositionB',
  absoluteThrottlePositionC = 'absoluteThrottlePositionC',
  acceleratorPedalPositionD = 'acceleratorPedalPositionD',
  acceleratorPedalPositionE = 'acceleratorPedalPositionE',
  acceleratorPedalPositionF = 'acceleratorPedalPositionF',
  commandedThrottleActuator = 'commandedThrottleActuator',
  timeRunWithMILOn = 'timeRunWithMILOn',
  timeSinceTroubleCodesCleared = 'timeSinceTroubleCodesCleared',
  maxValuesAFR_Voltage_Current_IMAP = 'maxValuesAFR_Voltage_Current_IMAP',
  maxAirFlowRateFromMAF = 'maxAirFlowRateFromMAF',
  fuelType = 'fuelType',
  ethanolFuelPercentage = 'ethanolFuelPercentage',
  absoluteEvapSystemVaporPressure = 'absoluteEvapSystemVaporPressure',
  evapSystemVaporPressure2 = 'evapSystemVaporPressure2',
  shortTermSecondaryOxygenSensorTrimB1B3 = 'shortTermSecondaryOxygenSensorTrimB1B3',
  longTermSecondaryOxygenSensorTrimB1B3 = 'longTermSecondaryOxygenSensorTrimB1B3',
  shortTermSecondaryOxygenSensorTrimB2B4 = 'shortTermSecondaryOxygenSensorTrimB2B4',
  longTermSecondaryOxygenSensorTrimB2B4 = 'longTermSecondaryOxygenSensorTrimB2B4',
  fuelRailAbsolutePressure = 'fuelRailAbsolutePressure',
  relativeAcceleratorPedalPosition = 'relativeAcceleratorPedalPosition',
  hybridBatteryPackRemainingLife = 'hybridBatteryPackRemainingLife',
  engineOilTemperature = 'engineOilTemperature',
  fuelInjectionTiming = 'fuelInjectionTiming',
  engineFuelRate = 'engineFuelRate',
  emissionRequirements = 'emissionRequirements',
  pidsSupported_61_80 = 'pidsSupported_61_80',
  driversDemandEnginePercentTorque = 'driversDemandEnginePercentTorque',
  actualEnginePercentTorque = 'actualEnginePercentTorque',
  engineReferenceTorque = 'engineReferenceTorque',
  enginePercentTorqueData = 'enginePercentTorqueData',
  auxiliaryInputOutputSupported = 'auxiliaryInputOutputSupported',
  massAirFlowSensor = 'massAirFlowSensor',
  engineCoolantTemperatureSensor = 'engineCoolantTemperatureSensor',
  intakeAirTemperatureSensor = 'intakeAirTemperatureSensor',
  actualEGR_CommandedEGR_EGRError = 'actualEGR_CommandedEGR_EGRError',
  commandedDieselIntakeAirFlowControl_RelativeIntakeAirFlowPosition = 'commandedDieselIntakeAirFlowControl_RelativeIntakeAirFlowPosition',
  exhaustGasRecirculationTemperature = 'exhaustGasRecirculationTemperature',
  commandedThrottleActuatorControl_RelativeThrottlePosition = 'commandedThrottleActuatorControl_RelativeThrottlePosition',
  fuelPressureControlSystem = 'fuelPressureControlSystem',
  injectionPressureControlSystem = 'injectionPressureControlSystem',
  turbochargerCompressorInletPressure = 'turbochargerCompressorInletPressure',
  boostPressureControl = 'boostPressureControl',
  variableGeometryTurboControl = 'variableGeometryTurboControl',
  wastegateControl = 'wastegateControl',
  exhaustPressure = 'exhaustPressure',
  turbochargerRPM = 'turbochargerRPM',
  turbochargerTemperature = 'turbochargerTemperature',
  turbochargerTemperature_B2 = 'turbochargerTemperature_B2',
  chargeAirCoolerTemperature = 'chargeAirCoolerTemperature',
  exhaustGasTemperature_Bank1 = 'exhaustGasTemperature_Bank1',
  exhaustGasTemperature_Bank2 = 'exhaustGasTemperature_Bank2',
  dieselParticulateFilterDifferentialPressure = 'dieselParticulateFilterDifferentialPressure',
  dieselParticulateFilter = 'dieselParticulateFilter',
  dieselParticulateFilterTemperature = 'dieselParticulateFilterTemperature',
  NOxNTENotToExceedControlAreaStatus = 'NOxNTENotToExceedControlAreaStatus',
  PMNTENotToExceedControlAreaStatus = 'PMNTENotToExceedControlAreaStatus',
  engineRunTime_B = 'engineRunTime_B',
  pidsSupported_81_A0 = 'pidsSupported_81_A0',
  engineRunTimeForAECD_11_15 = 'engineRunTimeForAECD_11_15',
  engineRunTimeForAECD_16_20 = 'engineRunTimeForAECD_16_20',
  NOxSensor = 'NOxSensor',
  manifoldSurfaceTemperature = 'manifoldSurfaceTemperature',
  NOxReagentSystem = 'NOxReagentSystem',
  particulateMatterSensor = 'particulateMatterSensor',
  intakeManifoldAbsolutePressure = 'intakeManifoldAbsolutePressure',
  SCRInduceSystem = 'SCRInduceSystem',
  runTimeForAECD_11_15 = 'runTimeForAECD_11_15',
  runTimeForAECD_16_20 = 'runTimeForAECD_16_20',
  dieselAftertreatment = 'dieselAftertreatment',
  O2Sensor_WideRange = 'O2Sensor_WideRange',
  throttlePositionG = 'throttlePositionG',
  engineFriction_PercentTorque = 'engineFriction_PercentTorque',
  PMSensor_Bank1_Bank2 = 'PMSensor_Bank1_Bank2',
  wwhOBDOBDSystemInformation = 'wwhOBDOBDSystemInformation',
  wwhOBDOBDSystemInformation_B = 'wwhOBDOBDSystemInformation_B',
  fuelSystemControl = 'fuelSystemControl',
  wwhOBDOBDCountersSupport = 'wwhOBDOBDCountersSupport',
  NOxWarningAndInducementSystem = 'NOxWarningAndInducementSystem',
  exhaustGasTemperatureSensor = 'exhaustGasTemperatureSensor',
  exhaustGasTemperatureSensor_Bank2 = 'exhaustGasTemperatureSensor_Bank2',
  hybridEVVehicleSystemData_Battery_Voltage = 'hybridEVVehicleSystemData_Battery_Voltage',
  dieselExhaustFluidSensorData = 'dieselExhaustFluidSensorData',
  O2SensorData = 'O2SensorData',
  engineFuelRate_B = 'engineFuelRate_B',
  engineExhaustFlowRate = 'engineExhaustFlowRate',
  fuelSystemPercentageUse = 'fuelSystemPercentageUse',
  pidsSupported_A1_C0 = 'pidsSupported_A1_C0',
  NOxSensorCorrectedData = 'NOxSensorCorrectedData',
  cylinderFuelRate = 'cylinderFuelRate',
  evapSystemVaporPressure_B2 = 'evapSystemVaporPressure_B2',
  transmissionActualGear = 'transmissionActualGear',
  commandedDieselExhaustFluidDosing = 'commandedDieselExhaustFluidDosing',
  odometer = 'odometer',
  NOxSensorConcentrationSensors3And4 = 'NOxSensorConcentrationSensors3And4',
  NOxSensorCorrectedConcentrationSensors3And4 = 'NOxSensorCorrectedConcentrationSensors3And4',
  absDisableSwitchState = 'absDisableSwitchState',
  pidsSupported_C1_E0 = 'pidsSupported_C1_E0',
  fuelLevelInput_AB = 'fuelLevelInput_AB',
  exhaustParticulateControlSystemDiagnosticTimeCount = 'exhaustParticulateControlSystemDiagnosticTimeCount',
  fuelPressure_AB = 'fuelPressure_AB',
  particulateControl_Byte1_Byte2_3_Byte4_5_Byte6_7 = 'particulateControl_Byte1_Byte2_3_Byte4_5_Byte6_7',
  distanceSinceReflashOrModuleReplacement = 'distanceSinceReflashOrModuleReplacement',
  NOxControlDiagnostic_NCD_PartD_ControlLampStatus = 'NOxControlDiagnostic_NCD_PartD_ControlLampStatus'
}

export const CharacteristicConst = {
  engineSpeed: {
    name: 'Velocidade do Motor',
    code: '010c'
  },
  odometer: {
    name: 'Odometro',
    code: '01A6'
  },
  vehicleSpeed: {
    name: 'Velocidade do Veículo',
    code: '010d'
  },
  distanceTraveledSinceCodesCleared: {
    name: 'Distância Percorrida Desde a Limpeza dos Códigos',
    code: '0131'
  },
  distanceSinceReflashOrModuleReplacement: {
    name: 'Distância Desde a Reprogramação ou Substituição do Módulo',
    code: '01c7'
  },
  runtimeSinceLastReset: {
    name: 'Tempo de Funcionamento Desde o Último Reset',
    code: '01f2'
  },
  engineCoolantTemp: {
    name: 'Temperatura do Líquido de Arrefecimento do Motor',
    code: '0105'
  },
  intakeAirTemperature: {
    name: 'Temperatura do Ar de Admissão',
    code: '010f'
  },
  intakeManifoldAbsolutePressure: {
    name: 'Pressão Absoluta do Coletor de Admissão',
    code: '010b'
  },
  throttlePosition: {
    name: 'Posição do Acelerador',
    code: '0111'
  },
  fuelLevelInput: {
    name: 'Nível de Combustível',
    code: '012f'
  },
  fuelPressure: {
    name: 'Pressão do Combustível',
    code: '010a'
  },
  fuelTrimBank1LongTerm: {
    name: 'Trim de Combustível Banco 1 a Longo Prazo',
    code: '0107'
  },
  fuelTrimBank1ShortTerm: {
    name: 'Trim de Combustível Banco 1 a Curto Prazo',
    code: '0106'
  },
  fuelTrimBank2LongTerm: {
    name: 'Trim de Combustível Banco 2 a Longo Prazo',
    code: '0109'
  },
  fuelTrimBank2ShortTerm: {
    name: 'Trim de Combustível Banco 2 a Curto Prazo',
    code: '0108'
  },
  engineFuelRate: {
    name: 'Taxa de Combustível do Motor',
    code: '015e'
  },
  engineOilTemperature: {
    name: 'Temperatura do Óleo do Motor',
    code: '015c'
  },
  mafAirFlowRate: {
    name: 'Taxa de Fluxo de Ar MAF',
    code: '0110'
  },
  runtimeSinceEngineStart: {
    name: 'Tempo de Funcionamento Desde a Partida do Motor',
    code: '011f'
  },
  vin: {
    name: 'VIN (Número de Identificação do Veículo)',
    code: '0902'
  },
  distanceWithMILON: {
    name: 'Distância Percorrida com MIL Ligada',
    code: '0121'
  },

  commandedEGR: {
    name: 'EGR Comandada',
    code: '012c'
  },
  commandedThrottleActuator: {
    name: 'Atuador do Acelerador Comandado',
    code: '014c'
  },
  actualEGR_CommandedEGR_EGRError: {
    name: 'Erro EGR Real/Comandada',
    code: '0169'
  },
  commandedAFR: {
    name: 'Relação Ar-Combustível Comandada',
    code: '0144'
  },
  controlModuleVoltage: {
    name: 'Tensão do Módulo de Controle',
    code: '0142'
  },
  obdStandard: {
    name: 'Padrão OBD',
    code: '011c'
  },
  fuelType: {
    name: 'Tipo de Combustível',
    code: '0151'
  },
  monitorStatus: {
    name: 'Status do Monitor',
    code: '0101'
  },
  monitorStatusThisDriveCycle: {
    name: 'Status do Monitor Neste Ciclo de Condução',
    code: '0141'
  },
  warmUpsSinceCodesCleared: {
    name: 'Aquecimentos Desde a Limpeza dos Códigos',
    code: '0130'
  },
  timeSinceTroubleCodesCleared: {
    name: 'Tempo Desde a Limpeza dos Códigos de Falha',
    code: '014e'
  },
  timeRunWithMILOn: {
    name: 'Tempo de Funcionamento com MIL Ligada',
    code: '014d'
  },
  NOxControlDiagnostic_NCD_PartD_ControlLampStatus: {
    name: 'Status da Lâmpada de Controle NCD Parte D',
    code: '01c8'
  },
  NOxNTENotToExceedControlAreaStatus: {
    name: 'Status da Área de Controle NTE',
    code: '017d'
  },
  NOxReagentSystem: {
    name: 'Sistema de Reagente NOx',
    code: '0185'
  },
  NOxSensor: {
    name: 'Sensor NOx',
    code: '0183'
  },
  NOxSensorConcentrationSensors3And4: {
    name: 'Sensores de Concentração NOx 3 e 4',
    code: '01a7'
  },
  NOxSensorCorrectedConcentrationSensors3And4: {
    name: 'Concentração Corrigida dos Sensores NOx 3 e 4',
    code: '01a8'
  },
  NOxSensorCorrectedData: {
    name: 'Dados Corrigidos do Sensor NOx',
    code: '01a1'
  },
  NOxWarningAndInducementSystem: {
    name: 'Sistema de Aviso e Indução NOx',
    code: '0194'
  },
  O2SensorData: {
    name: 'Dados do Sensor O2',
    code: '019c'
  },
  O2Sensor_WideRange: {
    name: 'Sensor O2 de Faixa Ampla',
    code: '018c'
  },
  PMNTENotToExceedControlAreaStatus: {
    name: 'Status da Área de Controle de PM NTE',
    code: '017e'
  },
  PMSensor_Bank1_Bank2: {
    name: 'Sensor PM Banco 1 e Banco 2',
    code: '018f'
  },
  SCRInduceSystem: {
    name: 'Sistema de Indução SCR',
    code: '0188'
  },
  absDisableSwitchState: {
    name: 'Estado do Interruptor de Desativação ABS',
    code: '01a9'
  },
  absoluteBarometricPressure: {
    name: 'Pressão Barométrica Absoluta',
    code: '0133'
  },
  absoluteEvapSystemVaporPressure: {
    name: 'Pressão de Vapor do Sistema de Evaporação Absoluta',
    code: '0153'
  },
  absoluteLoadValue: {
    name: 'Valor de Carga Absoluta',
    code: '0143'
  },
  absoluteThrottlePositionB: {
    name: 'Posição Absoluta do Acelerador B',
    code: '0147'
  },
  absoluteThrottlePositionC: {
    name: 'Posição Absoluta do Acelerador C',
    code: '0148'
  },
  acceleratorPedalPositionD: {
    name: 'Posição do Pedal do Acelerador D',
    code: '0149'
  },
  acceleratorPedalPositionE: {
    name: 'Posição do Pedal do Acelerador E',
    code: '014a'
  },
  acceleratorPedalPositionF: {
    name: 'Posição do Pedal do Acelerador F',
    code: '014b'
  },
  actualEnginePercentTorque: {
    name: 'Torque Percentual Real do Motor',
    code: '0162'
  },
  ambientAirTemperature: {
    name: 'Temperatura do Ar Ambiente',
    code: '0146'
  },
  auxInputStatus: {
    name: 'Status da Entrada Auxiliar',
    code: '011e'
  },
  auxiliaryInputOutputSupported: {
    name: 'Entrada/Saída Auxiliar Suportada',
    code: '0165'
  },
  boostPressureControl: {
    name: 'Controle de Pressão de Turboalimentação',
    code: '0170'
  },
  calcEngineLoad: {
    name: 'Carga do Motor Calculada',
    code: '0104'
  },
  catalystTempBank1Sensor1: {
    name: 'Temperatura do Catalisador Banco 1 Sensor 1',
    code: '013c'
  },
  catalystTempBank1Sensor2: {
    name: 'Temperatura do Catalisador Banco 1 Sensor 2',
    code: '013e'
  },
  catalystTempBank2Sensor1: {
    name: 'Temperatura do Catalisador Banco 2 Sensor 1',
    code: '013d'
  },
  catalystTempBank2Sensor2: {
    name: 'Temperatura do Catalisador Banco 2 Sensor 2',
    code: '013f'
  },
  chargeAirCoolerTemperature: {
    name: 'Temperatura do Resfriador de Ar',
    code: '0177'
  },
  commandedDieselExhaustFluidDosing: {
    name: 'Dosagem de Fluido de Escape Diesel Comandada',
    code: '01a5'
  },
  commandedDieselIntakeAirFlowControl_RelativeIntakeAirFlowPosition: {
    name: 'Controle de Fluxo de Ar de Admissão Diesel Comandado/Posição Relativa',
    code: '016a'
  },
  commandedEvaporativePurge: {
    name: 'Purga Evaporativa Comandada',
    code: '012e'
  },
  commandedSecondaryAirStatus: {
    name: 'Status do Ar Secundário Comandado',
    code: '0112'
  },
  commandedThrottleActuatorControl_RelativeThrottlePosition: {
    name: 'Controle do Atuador do Acelerador Comandado/Posição Relativa do Acelerador',
    code: '016c'
  },
  cylinderFuelRate: {
    name: 'Taxa de Combustível por Cilindro',
    code: '01a2'
  },
  dieselAftertreatment: {
    name: 'Tratamento Pós-Combustão Diesel',
    code: '018b'
  },
  dieselExhaustFluidSensorData: {
    name: 'Dados do Sensor de Fluido de Escape Diesel',
    code: '019b'
  },
  dieselParticulateFilter: {
    name: 'Filtro de Partículas Diesel',
    code: '017b'
  },
  dieselParticulateFilterDifferentialPressure: {
    name: 'Pressão Diferencial do Filtro de Partículas Diesel',
    code: '017a'
  },
  dieselParticulateFilterTemperature: {
    name: 'Temperatura do Filtro de Partículas Diesel',
    code: '017c'
  },
  driversDemandEnginePercentTorque: {
    name: 'Torque Percentual do Motor Demandado pelo Motorista',
    code: '0161'
  },
  egrError: {
    name: 'Erro EGR',
    code: '012d'
  },
  emissionRequirements: {
    name: 'Requisitos de Emissão',
    code: '015f'
  },
  engineCoolantTemperatureSensor: {
    name: 'Sensor de Temperatura do Líquido de Arrefecimento do Motor',
    code: '0167'
  },
  engineExhaustFlowRate: {
    name: 'Taxa de Fluxo de Escape do Motor',
    code: '019e'
  },
  engineFriction_PercentTorque: {
    name: 'Atrito do Motor/Percentual de Torque',
    code: '018e'
  },
  engineFuelRate_B: {
    name: 'Taxa de Combustível do Motor B',
    code: '019d'
  },
  enginePercentTorqueData: {
    name: 'Dados do Percentual de Torque do Motor',
    code: '0164'
  },
  engineReferenceTorque: {
    name: 'Torque de Referência do Motor',
    code: '0163'
  },
  engineRunTimeForAECD_11_15: {
    name: 'Tempo de Funcionamento do Motor para AECD 11-15',
    code: '0181'
  },
  engineRunTimeForAECD_16_20: {
    name: 'Tempo de Funcionamento do Motor para AECD 16-20',
    code: '0182'
  },
  engineRunTime_B: {
    name: 'Tempo de Funcionamento do Motor B',
    code: '017f'
  },
  ethanolFuelPercentage: {
    name: 'Percentual de Combustível Etanol',
    code: '0152'
  },
  evapSystemVaporPressure: {
    name: 'Pressão de Vapor do Sistema de Evaporação',
    code: '0132'
  },
  evapSystemVaporPressure2: {
    name: 'Pressão de Vapor do Sistema de Evaporação 2',
    code: '0154'
  },
  evapSystemVaporPressure_B2: {
    name: 'Pressão de Vapor do Sistema de Evaporação B2',
    code: '01a3'
  },
  exhaustGasRecirculationTemperature: {
    name: 'Temperatura da Recirculação de Gases de Escape',
    code: '016b'
  },
  exhaustGasTemperatureSensor: {
    name: 'Sensor de Temperatura dos Gases de Escape',
    code: '0198'
  },
  exhaustGasTemperatureSensor_Bank2: {
    name: 'Sensor de Temperatura dos Gases de Escape Banco 2',
    code: '0199'
  },
  exhaustGasTemperature_Bank1: {
    name: 'Temperatura dos Gases de Escape Banco 1',
    code: '0178'
  },
  exhaustGasTemperature_Bank2: {
    name: 'Temperatura dos Gases de Escape Banco 2',
    code: '0179'
  },
  exhaustParticulateControlSystemDiagnosticTimeCount: {
    name: 'Tempo de Diagnóstico do Sistema de Controle de Partículas de Escape',
    code: '01c4'
  },
  exhaustPressure: {
    name: 'Pressão de Escape',
    code: '0173'
  },
  freezeFrameDTC: {
    name: 'Congelamento de Quadro DTC',
    code: '0102'
  },
  fuelInjectionTiming: {
    name: 'Tempo de Injeção de Combustível',
    code: '015d'
  },
  fuelLevelInput_AB: {
    name: 'Nível de Combustível AB',
    code: '01c3'
  },
  fuelPressureControlSystem: {
    name: 'Sistema de Controle de Pressão do Combustível',
    code: '016d'
  },
  fuelPressure_AB: {
    name: 'Pressão do Combustível AB',
    code: '01c5'
  },
  fuelRailAbsolutePressure: {
    name: 'Pressão Absoluta do Trilho de Combustível',
    code: '0159'
  },
  fuelRailPressure: {
    name: 'Pressão do Trilho de Combustível',
    code: '0122'
  },
  fuelRailPressureGauge: {
    name: 'Manômetro de Pressão do Trilho de Combustível',
    code: '0123'
  },
  fuelSystemControl: {
    name: 'Controle do Sistema de Combustível',
    code: '0192'
  },
  fuelSystemPercentageUse: {
    name: 'Percentual de Uso do Sistema de Combustível',
    code: '019f'
  },
  fuelSystemStatus: {
    name: 'Status do Sistema de Combustível',
    code: '0103'
  },
  fuelTankLevelInput: {
    name: 'Nível de Combustível do Tanque',
    code: '012f'
  },
  hybridBatteryPackRemainingLife: {
    name: 'Vida Útil Restante da Bateria Híbrida',
    code: '015b'
  },
  hybridEVVehicleSystemData_Battery_Voltage: {
    name: 'Dados do Sistema do Veículo Híbrido EV/Bateria/Tensão',
    code: '019a'
  },
  injectionPressureControlSystem: {
    name: 'Sistema de Controle da Pressão de Injeção',
    code: '016e'
  },
  intakeAirTemperatureSensor: {
    name: 'Sensor de Temperatura do Ar de Admissão',
    code: '0175'
  },
  intakeManifoldPressure: {
    name: 'Pressão do Coletor de Admissão',
    code: '0135'
  },
  intakeManifoldPressure_AB: {
    name: 'Pressão do Coletor de Admissão AB',
    code: '01c6'
  },
  lambdaSensor: {
    name: 'Sensor Lambda',
    code: '01a0'
  },
  lambdaSensor_Bank1: {
    name: 'Sensor Lambda Banco 1',
    code: '01a1'
  },
  lambdaSensor_Bank2: {
    name: 'Sensor Lambda Banco 2',
    code: '01a2'
  },
  manufacturerSpecificData: {
    name: 'Dados Específicos do Fabricante',
    code: '01d0'
  },
  measuredEngineLoad: {
    name: 'Carga do Motor Medida',
    code: '0104'
  },
  measuredFuelLevel: {
    name: 'Nível de Combustível Medido',
    code: '012f'
  },
  measuredIntakeAirTemperature: {
    name: 'Temperatura do Ar de Admissão Medida',
    code: '010f'
  },
  measuredIntakeManifoldPressure: {
    name: 'Pressão do Coletor de Admissão Medida',
    code: '0135'
  },
  measuredThrottlePosition: {
    name: 'Posição do Acelerador Medida',
    code: '0110'
  },
  obdIIStandard: {
    name: 'Padrão OBDII',
    code: '01c1'
  },
  oilTemperature: {
    name: 'Temperatura do Óleo',
    code: '015c'
  },
  oxygenSensor: {
    name: 'Sensor de Oxigênio',
    code: '019c'
  },
  parkingBrakeSwitch: {
    name: 'Interruptor de Freio de Estacionamento',
    code: '015a'
  },
  powertrainControlModuleVoltage: {
    name: 'Tensão do Módulo de Controle da Transmissão',
    code: '015f'
  },
  speedOfVehicle: {
    name: 'Velocidade do Veículo',
    code: '010d'
  },
  throttlePositionSensor: {
    name: 'Sensor de Posição do Acelerador',
    code: '0156'
  },
  tirePressure: {
    name: 'Pressão dos Pneus',
    code: '0184'
  },
  totalDistanceTraveled: {
    name: 'Distância Total Percorrida',
    code: '0125'
  },
  turboBoostPressure: {
    name: 'Pressão do Turboalimentador',
    code: '014a'
  },
  vehicleIdentificationNumber: {
    name: 'Número de Identificação do Veículo (VIN)',
    code: '0902'
  }
};

export const ConvertResponseToCode = {
  '41 0C': '010c',
  '41 0D': '010d',
  '41 31': '0131',
  '41 05': '0105',
  '41 5C': '015c',
  '41 1F': '011f',
  '41 51': '0151',
  '41 01': '0101',
  '41 41': '0141',
  '41 62': '0162',
  '41 46': '0146',
  '41 04': '0104',
  '41 5E': '015e',
  '41 A6': '01A6',
  '41 67': '0167',
  '41 10': '0110',
  '41 03': '0103',
  '41 2F': '012f',
  '41 68': '0168'
} as unknown as Record<string, CharacteristicType>;

export const CharacteristicConst3 = {
  '010c': 'engineSpeed',
  '010d': 'vehicleSpeed',
  '0131': 'distanceTraveledSinceCodesCleared',
  '0105': 'engineCoolantTemp',
  '015c': 'engineOilTemperature',
  '011f': 'runtimeSinceEngineStart',
  '015e': 'engineFuelRate',
  '01A6': 'odometer',
  '0151': 'fuelType',
  '0101': 'monitorStatus',
  '0110': 'mafAirFlowRate',
  '0141': 'monitorStatusThisDriveCycle',
  '0162': 'actualEnginePercentTorque',
  '0146': 'ambientAirTemperature',
  '0104': 'calcEngineLoad',
  '0167': 'engineCoolantTemperatureSensor',
  '0103': 'fuelSystemStatus',
  '012f': 'fuelTankLevelInput',
  '0168': 'intakeAirTemperatureSensor'
};

export const TranslatedCharacteristic = {
  '0902': 'VIN (Número de Identificação do Veículo)',
  '0101': 'Status do Monitor',
  '0102': 'DTC de Quadro Congelado',
  '0103': 'Status do Sistema de Combustível',
  '0104': 'Carga do Motor Calculada',
  '0105': 'Temperatura do Líquido de Arrefecimento do Motor',
  '0106': 'Trim de Combustível Banco 1 Curto Prazo',
  '0107': 'Trim de Combustível Banco 1 Longo Prazo',
  '0108': 'Trim de Combustível Banco 2 Curto Prazo',
  '0109': 'Trim de Combustível Banco 2 Longo Prazo',
  '010a': 'Pressão de Combustível',
  '010b': 'Pressão do Coletor de Admissão',
  '010c': 'Velocidade do Motor (RPM)',
  '010d': 'Velocidade do Veículo',
  '010e': 'Avanço da Ignição',
  '010f': 'Temperatura do Ar de Admissão',
  '0110': 'Taxa de Fluxo de Ar da MAF',
  '0111': 'Posição do Acelerador',
  '0112': 'Status do Ar Secundário Comandado',
  '0113': 'Sensores de Oxigênio Presentes (Bancos 2)',
  '0114': 'Tensão do Sensor de Oxigênio B1S1',
  '0115': 'Tensão do Sensor de Oxigênio B1S2',
  '0116': 'Tensão do Sensor de Oxigênio B1S3',
  '0117': 'Tensão do Sensor de Oxigênio B1S4',
  '0118': 'Tensão do Sensor de Oxigênio B2S1',
  '0119': 'Tensão do Sensor de Oxigênio B2S2',
  '011a': 'Tensão do Sensor de Oxigênio B2S3',
  '011b': 'Tensão do Sensor de Oxigênio B2S4',
  '011c': 'Padrão OBD',
  '011d': 'Sensores de Oxigênio Presentes (Bancos 4)',
  '011e': 'Status de Entrada Auxiliar',
  '011f': 'Tempo de Funcionamento Desde a Partida do Motor',
  '0120': 'PIDs Suportados (21-40)',
  '0121': 'Distância Percorrida com MIL Ligado',
  '0122': 'Pressão da Trilho de Combustível',
  '0123': 'Pressão do Manômetro de Combustível',
  '0124': 'Tensão do Sensor AFR CD do Sensor de Oxigênio 1',
  '0125': 'Tensão do Sensor AFR CD do Sensor de Oxigênio 2',
  '0126': 'Tensão do Sensor AFR CD do Sensor de Oxigênio 3',
  '0127': 'Tensão do Sensor AFR CD do Sensor de Oxigênio 4',
  '0128': 'Tensão do Sensor AFR CD do Sensor de Oxigênio 5',
  '0129': 'Tensão do Sensor AFR CD do Sensor de Oxigênio 6',
  '012a': 'Tensão do Sensor AFR CD do Sensor de Oxigênio 7',
  '012b': 'Tensão do Sensor AFR CD do Sensor de Oxigênio 8',
  '012c': 'EGR Comandado',
  '012d': 'Erro de EGR',
  '012e': 'Purgar Evaporativo Comandado',
  '012f': 'Entrada do Nível de Combustível no Tanque',
  '0130': 'Aquecimentos Desde os Códigos Apagados',
  '0131': 'Distância Percorrida Desde os Códigos Apagados',
  '0132': 'Pressão de Vapor do Sistema de Evaporação',
  '0133': 'Pressão Barométrica Absoluta',
  '0134': 'Corrente do Sensor de Oxigênio 1 AB CD',
  '0135': 'Corrente do Sensor de Oxigênio 2 AB CD',
  '0136': 'Corrente do Sensor de Oxigênio 3 AB CD',
  '0137': 'Corrente do Sensor de Oxigênio 4 AB CD',
  '0138': 'Corrente do Sensor de Oxigênio 5 AB CD',
  '0139': 'Corrente do Sensor de Oxigênio 6 AB CD',
  '013a': 'Corrente do Sensor de Oxigênio 7 AB CD',
  '013b': 'Corrente do Sensor de Oxigênio 8 AB CD',
  '013c': 'Temperatura do Catalisador Banco 1 Sensor 1',
  '013d': 'Temperatura do Catalisador Banco 2 Sensor 1',
  '013e': 'Temperatura do Catalisador Banco 1 Sensor 2',
  '013f': 'Temperatura do Catalisador Banco 2 Sensor 2',
  '0140': 'PIDs Suportados (41-60)',
  '0141': 'Status do Monitor no Ciclo de Condução Atual',
  '0142': 'Tensão do Módulo de Controle',
  '0143': 'Valor de Carga Absoluta',
  '0144': 'Mistura Ar-Combustível Comandada',
  '0145': 'Posição Relativa do Acelerador',
  '0146': 'Temperatura do Ar Ambiente',
  '0147': 'Posição Absoluta do Acelerador B',
  '0148': 'Posição Absoluta do Acelerador C',
  '0149': 'Posição do Pedal do Acelerador D',
  '014a': 'Posição do Pedal do Acelerador E',
  '014b': 'Posição do Pedal do Acelerador F',
  '014c': 'Atuador de Acelerador Comandado',
  '014d': 'Tempo de Funcionamento com MIL Ligado',
  '014e': 'Tempo Desde os Códigos Apagados',
  '014f': 'Valores Máximos AFR, Tensão, Corrente, IMAP',
  '0150': 'Taxa Máxima de Fluxo de Ar da MAF',
  '0151': 'Tipo de Combustível',
  '0152': 'Percentagem de Etanol no Combustível',
  '0153': 'Pressão Absoluta do Sistema de Evaporação de Vapor',
  '0154': 'Pressão de Vapor do Sistema de Evaporação 2',
  '0155': 'Trim Secundário de Oxigênio Curto Prazo B1/B3',
  '0156': 'Trim Secundário de Oxigênio Longo Prazo B1/B3',
  '0157': 'Trim Secundário de Oxigênio Curto Prazo B2/B4',
  '0158': 'Trim Secundário de Oxigênio Longo Prazo B2/B4',
  '0159': 'Pressão Absoluta no Trilho de Combustível',
  '015a': 'Posição Relativa do Pedal do Acelerador',
  '015b': 'Vida Útil Restante da Bateria do Pacote Híbrido',
  '015c': 'Temperatura do Óleo do Motor',
  '015d': 'Tempo de Injeção de Combustível',
  '015e': 'Taxa de Consumo de Combustível do Motor',
  '015f': 'Requisitos de Emissão'
} as { [key in CharacteristicType]: string };

export const CharacteristicSelectValues: { label: string; value: CharacteristicType }[] = [
  { label: 'Velocidade do Motor', value: CharacteristicType.engineSpeed },
  { label: 'Velocidade do Veículo', value: CharacteristicType.vehicleSpeed },
  {
    label: 'Distância Percorrida Desde a Limpeza dos Códigos',
    value: CharacteristicType.distanceTraveledSinceCodesCleared
  },
  { label: 'Taxa de Fluxo de Ar MAF', value: CharacteristicType.mafAirFlowRate },
  { label: 'Odometro', value: CharacteristicType.odometer },
  { label: 'Taxa de Combustível do Motor', value: CharacteristicType.engineFuelRate },
  {
    label: 'Temperatura do Líquido de Arrefecimento do Motor',
    value: CharacteristicType.engineCoolantTemp
  },
  { label: 'Temperatura do Óleo do Motor', value: CharacteristicType.engineOilTemperature },
  {
    label: 'Tempo de Funcionamento Desde a Partida do Motor',
    value: CharacteristicType.runtimeSinceEngineStart
  },
  { label: 'Tipo de Combustível', value: CharacteristicType.fuelType },
  { label: 'Status do Monitor', value: CharacteristicType.monitorStatus },
  {
    label: 'Status do Monitor Neste Ciclo de Condução',
    value: CharacteristicType.monitorStatusThisDriveCycle
  },
  { label: 'Torque Percentual Real do Motor', value: CharacteristicType.actualEnginePercentTorque },
  { label: 'Temperatura do Ar Ambiente', value: CharacteristicType.ambientAirTemperature },
  { label: 'Carga do Motor Calculada', value: CharacteristicType.calcEngineLoad },
  {
    label: 'Sensor de Temperatura do Líquido de Arrefecimento do Motor',
    value: CharacteristicType.engineCoolantTemperatureSensor
  },
  { label: 'Status do Sistema de Combustível', value: CharacteristicType.fuelSystemStatus },
  { label: 'Nível de Combustível do Tanque', value: CharacteristicType.fuelTankLevelInput },
  {
    label: 'Sensor de Temperatura do Ar de Admissão',
    value: CharacteristicType.intakeAirTemperatureSensor
  },
  { label: 'VIN 1', value: CharacteristicType.vin }

  // { label: 'Velocidade do Motor', value: 'engineSpeed' },
  // { label: 'Velocidade do Veículo', value: 'vehicleSpeed' },
  // {
  //   label: 'Distância Percorrida Desde a Limpeza dos Códigos',
  //   value: 'distanceTraveledSinceCodesCleared'
  // },
  // {
  //   label: 'Distância Desde a Reprogramação ou Substituição do Módulo',
  //   value: 'distanceSinceReflashOrModuleReplacement'
  // },
  // { label: 'Tempo de Funcionamento Desde o Último Reset', value: 'runtimeSinceLastReset' },
  // { label: 'Temperatura do Líquido de Arrefecimento do Motor', value: 'engineCoolantTemp' },
  // { label: 'Temperatura do Ar de Admissão', value: 'intakeAirTemperature' },
  // { label: 'Pressão Absoluta do Coletor de Admissão', value: 'intakeManifoldAbsolutePressure' },
  // { label: 'Posição do Acelerador', value: 'throttlePosition' },
  // { label: 'Nível de Combustível', value: 'fuelLevelInput' },
  // { label: 'Pressão do Combustível', value: 'fuelPressure' },
  // { label: 'Trim de Combustível Banco 1 a Longo Prazo', value: 'fuelTrimBank1LongTerm' },
  // { label: 'Trim de Combustível Banco 1 a Curto Prazo', value: 'fuelTrimBank1ShortTerm' },
  // { label: 'Trim de Combustível Banco 2 a Longo Prazo', value: 'fuelTrimBank2LongTerm' },
  // { label: 'Trim de Combustível Banco 2 a Curto Prazo', value: 'fuelTrimBank2ShortTerm' },
  // { label: 'Taxa de Combustível do Motor', value: 'engineFuelRate' },
  // { label: 'Temperatura do Óleo do Motor', value: 'engineOilTemperature' },
  // { label: 'Taxa de Fluxo de Ar MAF', value: 'mafAirFlowRate' },
  // { label: 'Tempo de Funcionamento Desde a Partida do Motor', value: 'runtimeSinceEngineStart' },
  // { label: 'VIN (Número de Identificação do Veículo)', value: 'vin' },
  // { label: 'Distância Percorrida com MIL Ligada', value: 'distanceWithMILON' },
  // { label: 'EGR Comandada', value: 'commandedEGR' },
  // { label: 'Atuador do Acelerador Comandado', value: 'commandedThrottleActuator' },
  // { label: 'Erro EGR Real/Comandada', value: 'actualEGR_CommandedEGR_EGRError' },
  // { label: 'Relação Ar-Combustível Comandada', value: 'commandedAFR' },
  // { label: 'Tensão do Módulo de Controle', value: 'controlModuleVoltage' },
  // { label: 'Padrão OBD', value: 'obdStandard' },
  // { label: 'Tipo de Combustível', value: 'fuelType' },
  // { label: 'Status do Monitor', value: 'monitorStatus' },
  // { label: 'Status do Monitor Neste Ciclo de Condução', value: 'monitorStatusThisDriveCycle' },
  // { label: 'Aquecimentos Desde a Limpeza dos Códigos', value: 'warmUpsSinceCodesCleared' },
  // { label: 'Tempo Desde a Limpeza dos Códigos de Falha', value: 'timeSinceTroubleCodesCleared' },
  // { label: 'Tempo de Funcionamento com MIL Ligada', value: 'timeRunWithMILOn' },
  // {
  //   label: 'Status da Lâmpada de Controle NCD Parte D',
  //   value: 'NOxControlDiagnostic_NCD_PartD_ControlLampStatus'
  // },
  // { label: 'Status da Área de Controle NTE', value: 'NOxNTENotToExceedControlAreaStatus' },
  // { label: 'Sistema de Reagente NOx', value: 'NOxReagentSystem' },
  // { label: 'Sensor NOx', value: 'NOxSensor' },
  // { label: 'Sensores de Concentração NOx 3 e 4', value: 'NOxSensorConcentrationSensors3And4' },
  // {
  //   label: 'Concentração Corrigida dos Sensores NOx 3 e 4',
  //   value: 'NOxSensorCorrectedConcentrationSensors3And4'
  // },
  // { label: 'Dados Corrigidos do Sensor NOx', value: 'NOxSensorCorrectedData' },
  // { label: 'Sistema de Aviso e Indução NOx', value: 'NOxWarningAndInducementSystem' },
  // { label: 'Dados do Sensor O2', value: 'O2SensorData' },
  // { label: 'Sensor O2 de Faixa Ampla', value: 'O2Sensor_WideRange' },
  // { label: 'Status da Área de Controle de PM NTE', value: 'PMNTENotToExceedControlAreaStatus' },
  // { label: 'Sensor PM Banco 1 e Banco 2', value: 'PMSensor_Bank1_Bank2' },
  // { label: 'Sistema de Indução SCR', value: 'SCRInduceSystem' },
  // { label: 'Estado do Interruptor de Desativação ABS', value: 'absDisableSwitchState' },
  // { label: 'Pressão Barométrica Absoluta', value: 'absoluteBarometricPressure' },
  // {
  //   label: 'Pressão de Vapor do Sistema de Evaporação Absoluta',
  //   value: 'absoluteEvapSystemVaporPressure'
  // },
  // { label: 'Valor de Carga Absoluta', value: 'absoluteLoadValue' },
  // { label: 'Posição Absoluta do Acelerador B', value: 'absoluteThrottlePositionB' },
  // { label: 'Posição Absoluta do Acelerador C', value: 'absoluteThrottlePositionC' },
  // { label: 'Posição do Pedal do Acelerador D', value: 'acceleratorPedalPositionD' },
  // { label: 'Posição do Pedal do Acelerador E', value: 'acceleratorPedalPositionE' },
  // { label: 'Posição do Pedal do Acelerador F', value: 'acceleratorPedalPositionF' },
  // { label: 'Torque Percentual Real do Motor', value: 'actualEnginePercentTorque' },
  // { label: 'Temperatura do Ar Ambiente', value: 'ambientAirTemperature' },
  // { label: 'Status da Entrada Auxiliar', value: 'auxInputStatus' },
  // { label: 'Entrada/Saída Auxiliar Suportada', value: 'auxiliaryInputOutputSupported' },
  // { label: 'Controle de Pressão de Turboalimentação', value: 'boostPressureControl' },
  // { label: 'Carga do Motor Calculada', value: 'calcEngineLoad' },
  // { label: 'Temperatura do Catalisador Banco 1 Sensor 1', value: 'catalystTempBank1Sensor1' },
  // { label: 'Temperatura do Catalisador Banco 1 Sensor 2', value: 'catalystTempBank1Sensor2' },
  // { label: 'Temperatura do Catalisador Banco 2 Sensor 1', value: 'catalystTempBank2Sensor1' },
  // { label: 'Temperatura do Catalisador Banco 2 Sensor 2', value: 'catalystTempBank2Sensor2' },
  // { label: 'Temperatura do Resfriador de Ar', value: 'chargeAirCoolerTemperature' },
  // {
  //   label: 'Dosagem de Fluido de Escape Diesel Comandada',
  //   value: 'commandedDieselExhaustFluidDosing'
  // },
  // {
  //   label: 'Controle de Fluxo de Ar de Admissão Diesel Comandado/Posição Relativa',
  //   value: 'commandedDieselIntakeAirFlowControl_RelativeIntakeAirFlowPosition'
  // },
  // { label: 'Purga Evaporativa Comandada', value: 'commandedEvaporativePurge' },
  // { label: 'Status do Ar Secundário Comandado', value: 'commandedSecondaryAirStatus' },
  // {
  //   label: 'Controle do Atuador do Acelerador Comandado/Posição Relativa do Acelerador',
  //   value: 'commandedThrottleActuatorControl_RelativeThrottlePosition'
  // },
  // { label: 'Taxa de Combustível por Cilindro', value: 'cylinderFuelRate' },
  // { label: 'Tratamento Pós-Combustão Diesel', value: 'dieselAftertreatment' },
  // { label: 'Dados do Sensor de Fluido de Escape Diesel', value: 'dieselExhaustFluidSensorData' },
  // { label: 'Filtro de Partículas Diesel', value: 'dieselParticulateFilter' },
  // {
  //   label: 'Pressão Diferencial do Filtro de Partículas Diesel',
  //   value: 'dieselParticulateFilterDifferentialPressure'
  // },
  // {
  //   label: 'Temperatura do Filtro de Partículas Diesel',
  //   value: 'dieselParticulateFilterTemperature'
  // },
  // {
  //   label: 'Torque Percentual do Motor Demandado pelo Motorista',
  //   value: 'driversDemandEnginePercentTorque'
  // },
  // { label: 'Erro EGR', value: 'egrError' },
  // { label: 'Requisitos de Emissão', value: 'emissionRequirements' },
  // {
  //   label: 'Sensor de Temperatura do Líquido de Arrefecimento do Motor',
  //   value: 'engineCoolantTemperatureSensor'
  // },
  // { label: 'Taxa de Fluxo de Escape do Motor', value: 'engineExhaustFlowRate' },
  // { label: 'Atrito do Motor/Percentual de Torque', value: 'engineFriction_PercentTorque' },
  // { label: 'Taxa de Combustível do Motor B', value: 'engineFuelRate_B' },
  // { label: 'Dados do Percentual de Torque do Motor', value: 'enginePercentTorqueData' },
  // { label: 'Torque de Referência do Motor', value: 'engineReferenceTorque' },
  // { label: 'Tempo de Funcionamento do Motor para AECD 11-15', value: 'engineRunTimeForAECD_11_15' },
  // { label: 'Tempo de Funcionamento do Motor para AECD 16-20', value: 'engineRunTimeForAECD_16_20' },
  // { label: 'Tempo de Funcionamento do Motor B', value: 'engineRunTime_B' },
  // { label: 'Percentual de Combustível Etanol', value: 'ethanolFuelPercentage' },
  // { label: 'Pressão de Vapor do Sistema de Evaporação', value: 'evapSystemVaporPressure' },
  // { label: 'Pressão de Vapor do Sistema de Evaporação 2', value: 'evapSystemVaporPressure2' },
  // { label: 'Pressão de Vapor do Sistema de Evaporação B2', value: 'evapSystemVaporPressure_B2' },
  // {
  //   label: 'Temperatura da Recirculação de Gases de Escape',
  //   value: 'exhaustGasRecirculationTemperature'
  // },
  // { label: 'Sensor de Temperatura dos Gases de Escape', value: 'exhaustGasTemperatureSensor' },
  // {
  //   label: 'Sensor de Temperatura dos Gases de Escape Banco 2',
  //   value: 'exhaustGasTemperatureSensor_Bank2'
  // },
  // { label: 'Temperatura dos Gases de Escape Banco 1', value: 'exhaustGasTemperature_Bank1' },
  // { label: 'Temperatura dos Gases de Escape Banco 2', value: 'exhaustGasTemperature_Bank2' },
  // {
  //   label: 'Tempo de Diagnóstico do Sistema de Controle de Partículas de Escape',
  //   value: 'exhaustParticulateControlSystemDiagnosticTimeCount'
  // },
  // { label: 'Pressão de Escape', value: 'exhaustPressure' },
  // { label: 'Congelamento de Quadro DTC', value: 'freezeFrameDTC' },
  // { label: 'Tempo de Injeção de Combustível', value: 'fuelInjectionTiming' },
  // { label: 'Nível de Combustível AB', value: 'fuelLevelInput_AB' },
  // { label: 'Sistema de Controle de Pressão do Combustível', value: 'fuelPressureControlSystem' },
  // { label: 'Pressão do Combustível AB', value: 'fuelPressure_AB' },
  // { label: 'Pressão Absoluta do Trilho de Combustível', value: 'fuelRailAbsolutePressure' },
  // { label: 'Pressão do Trilho de Combustível', value: 'fuelRailPressure' },
  // { label: 'Manômetro de Pressão do Trilho de Combustível', value: 'fuelRailPressureGauge' },
  // { label: 'Controle do Sistema de Combustível', value: 'fuelSystemControl' },
  // { label: 'Percentual de Uso do Sistema de Combustível', value: 'fuelSystemPercentageUse' },
  // { label: 'Status do Sistema de Combustível', value: 'fuelSystemStatus' },
  // { label: 'Nível de Combustível do Tanque', value: 'fuelTankLevelInput' },
  // { label: 'Vida Útil Restante da Bateria Híbrida', value: 'hybridBatteryPackRemainingLife' },
  // {
  //   label: 'Dados do Sistema do Veículo Híbrido EV/Bateria/Tensão',
  //   value: 'hybridEVVehicleSystemData_Battery_Voltage'
  // },
  // { label: 'Sistema de Controle da Pressão de Injeção', value: 'injectionPressureControlSystem' },
  // { label: 'Sensor de Temperatura do Ar de Admissão', value: 'intakeAirTemperatureSensor' },
  // { label: 'Pressão do Coletor de Admissão', value: 'intakeManifoldPressure' },
  // { label: 'Pressão do Coletor de Admissão AB', value: 'intakeManifoldPressure_AB' },
  // { label: 'Sensor Lambda', value: 'lambdaSensor' },
  // { label: 'Sensor Lambda Banco 1', value: 'lambdaSensor_Bank1' },
  // { label: 'Sensor Lambda Banco 2', value: 'lambdaSensor_Bank2' },
  // { label: 'Dados Específicos do Fabricante', value: 'manufacturerSpecificData' },
  // { label: 'Carga do Motor Medida', value: 'measuredEngineLoad' },
  // { label: 'Nível de Combustível Medido', value: 'measuredFuelLevel' },
  // { label: 'Temperatura do Ar de Admissão Medida', value: 'measuredIntakeAirTemperature' },
  // { label: 'Pressão do Coletor de Admissão Medida', value: 'measuredIntakeManifoldPressure' },
  // { label: 'Posição do Acelerador Medida', value: 'measuredThrottlePosition' },
  // { label: 'Padrão OBDII', value: 'obdIIStandard' },
  // { label: 'Temperatura do Óleo', value: 'oilTemperature' },
  // { label: 'Sensor de Oxigênio', value: 'oxygenSensor' },
  // { label: 'Interruptor de Freio de Estacionamento', value: 'parkingBrakeSwitch' },
  // { label: 'Tensão do Módulo de Controle da Transmissão', value: 'powertrainControlModuleVoltage' },
  // { label: 'Velocidade do Veículo', value: 'speedOfVehicle' },
  // { label: 'Sensor de Posição do Acelerador', value: 'throttlePositionSensor' },
  // { label: 'Pressão dos Pneus', value: 'tirePressure' },
  // { label: 'Distância Total Percorrida', value: 'totalDistanceTraveled' },
  // { label: 'Pressão do Turboalimentador', value: 'turboBoostPressure' },
  // { label: 'Número de Identificação do Veículo (VIN)', value: 'vehicleIdentificationNumber' }
];
