/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable max-lines */
export enum CharacteristicType {
  vin = '0902\r',
  monitorStatus = '0101\r',
  freezeFrameDTC = '0102\r',
  fuelSystemStatus = '0103\r',
  calcEngineLoad = '0104\r',
  engineCoolantTemp = '0105\r',
  fuelTrimBank1ShortTerm = '0106\r',
  fuelTrimBank1LongTerm = '0107\r',
  fuelTrimBank2ShortTerm = '0108\r',
  fuelTrimBank2LongTerm = '0109\r',
  fuelPressure = '010a\r',
  intakeManifoldPressure = '010b\r',
  engineSpeed = '010c\r',
  vehicleSpeed = '010d\r',
  timingAdvance = '010e\r',
  intakeAirTemperature = '010f\r',
  mafAirFlowRate = '0110\r',
  throttlePosition = '0111\r',
  commandedSecondaryAirStatus = '0112\r',
  oxygenSensorsPresentBanks2 = '0113\r',
  oxygenSensorVoltageB1S1 = '0114\r',
  oxygenSensorVoltageB1S2 = '0115\r',
  oxygenSensorVoltageB1S3 = '0116\r',
  oxygenSensorVoltageB1S4 = '0117\r',
  oxygenSensorVoltageB2S1 = '0118\r',
  oxygenSensorVoltageB2S2 = '0119\r',
  oxygenSensorVoltageB2S3 = '011a\r',
  oxygenSensorVoltageB2S4 = '011b\r',
  obdStandard = '011c\r',
  oxygenSensorsPresentBanks4 = '011d\r',
  auxInputStatus = '011e\r',
  runtimeSinceEngineStart = '011f\r',
  pidsSupported_21_40 = '0120\r',
  distanceWithMILON = '0121\r',
  fuelRailPressure = '0122\r',
  fuelRailPressureGauge = '0123\r',
  oxygenSensor1AFR_CD_Voltage = '0124\r',
  oxygenSensor2AFR_CD_Voltage = '0125\r',
  oxygenSensor3AFR_CD_Voltage = '0126\r',
  oxygenSensor4AFR_CD_Voltage = '0127\r',
  oxygenSensor5AFR_CD_Voltage = '0128\r',
  oxygenSensor6AFR_CD_Voltage = '0129\r',
  oxygenSensor7AFR_CD_Voltage = '012a\r',
  oxygenSensor8AFR_CD_Voltage = '012b\r',
  commandedEGR = '012c\r',
  egrError = '012d\r',
  commandedEvaporativePurge = '012e\r',
  fuelTankLevelInput = '012f\r',
  warmUpsSinceCodesCleared = '0130\r',
  distanceTraveledSinceCodesCleared = '0131\r',
  evapSystemVaporPressure = '0132\r',
  absoluteBarometricPressure = '0133\r',
  oxygenSensor1AB_CD_Current = '0134\r',
  oxygenSensor2AB_CD_Current = '0135\r',
  oxygenSensor3AB_CD_Current = '0136\r',
  oxygenSensor4AB_CD_Current = '0137\r',
  oxygenSensor5AB_CD_Current = '0138\r',
  oxygenSensor6AB_CD_Current = '0139\r',
  oxygenSensor7AB_CD_Current = '013a\r',
  oxygenSensor8AB_CD_Current = '013b\r',
  catalystTempBank1Sensor1 = '013c\r',
  catalystTempBank2Sensor1 = '013d\r',
  catalystTempBank1Sensor2 = '013e\r',
  catalystTempBank2Sensor2 = '013f\r',
  pidsSupported_41_60 = '0140\r',
  monitorStatusThisDriveCycle = '0141\r',
  controlModuleVoltage = '0142\r',
  absoluteLoadValue = '0143\r',
  commandedAFR = '0144\r',
  relativeThrottlePosition = '0145\r',
  ambientAirTemperature = '0146\r',
  absoluteThrottlePositionB = '0147\r',
  absoluteThrottlePositionC = '0148\r',
  acceleratorPedalPositionD = '0149\r',
  acceleratorPedalPositionE = '014a\r',
  acceleratorPedalPositionF = '014b\r',
  commandedThrottleActuator = '014c\r',
  timeRunWithMILOn = '014d\r',
  timeSinceTroubleCodesCleared = '014e\r',
  maxValuesAFR_Voltage_Current_IMAP = '014f\r',
  maxAirFlowRateFromMAF = '0150\r',
  fuelType = '0151\r',
  ethanolFuelPercentage = '0152\r',
  absoluteEvapSystemVaporPressure = '0153\r',
  evapSystemVaporPressure2 = '0154\r',
  shortTermSecondaryOxygenSensorTrimB1B3 = '0155\r',
  longTermSecondaryOxygenSensorTrimB1B3 = '0156\r',
  shortTermSecondaryOxygenSensorTrimB2B4 = '0157\r',
  longTermSecondaryOxygenSensorTrimB2B4 = '0158\r',
  fuelRailAbsolutePressure = '0159\r',
  relativeAcceleratorPedalPosition = '015a\r',
  hybridBatteryPackRemainingLife = '015b\r',
  engineOilTemperature = '015c\r',
  fuelInjectionTiming = '015d\r',
  engineFuelRate = '015e\r',
  emissionRequirements = '015f\r',
  pidsSupported_61_80 = '0160\r',
  driversDemandEnginePercentTorque = '0161\r',
  actualEnginePercentTorque = '0162\r',
  engineReferenceTorque = '0163\r',
  enginePercentTorqueData = '0164\r',
  auxiliaryInputOutputSupported = '0165\r',
  massAirFlowSensor = '0166\r',
  engineCoolantTemperatureSensor = '0167\r',
  intakeAirTemperatureSensor = '0168\r',
  actualEGR_CommandedEGR_EGRError = '0169\r',
  commandedDieselIntakeAirFlowControl_RelativeIntakeAirFlowPosition = '016a\r',
  exhaustGasRecirculationTemperature = '016b\r',
  commandedThrottleActuatorControl_RelativeThrottlePosition = '016c\r',
  fuelPressureControlSystem = '016d\r',
  injectionPressureControlSystem = '016e\r',
  turbochargerCompressorInletPressure = '016f\r',
  boostPressureControl = '0170\r',
  variableGeometryTurboControl = '0171\r',
  wastegateControl = '0172\r',
  exhaustPressure = '0173\r',
  turbochargerRPM = '0174\r',
  turbochargerTemperature = '0175\r',
  turbochargerTemperature_B2 = '0176\r',
  chargeAirCoolerTemperature = '0177\r',
  exhaustGasTemperature_Bank1 = '0178\r',
  exhaustGasTemperature_Bank2 = '0179\r',
  dieselParticulateFilterDifferentialPressure = '017a\r',
  dieselParticulateFilter = '017b\r',
  dieselParticulateFilterTemperature = '017c\r',
  NOxNTENotToExceedControlAreaStatus = '017d\r',
  PMNTENotToExceedControlAreaStatus = '017e\r',
  engineRunTime_B = '017f\r',
  pidsSupported_81_A0 = '0180\r',
  engineRunTimeForAECD_11_15 = '0181\r',
  engineRunTimeForAECD_16_20 = '0182\r',
  NOxSensor = '0183\r',
  manifoldSurfaceTemperature = '0184\r',
  NOxReagentSystem = '0185\r',
  particulateMatterSensor = '0186\r',
  intakeManifoldAbsolutePressure = '0187\r',
  SCRInduceSystem = '0188\r',
  runTimeForAECD_11_15 = '0189\r',
  runTimeForAECD_16_20 = '018a\r',
  dieselAftertreatment = '018b\r',
  O2Sensor_WideRange = '018c\r',
  throttlePositionG = '018d\r',
  engineFriction_PercentTorque = '018e\r',
  PMSensor_Bank1_Bank2 = '018f\r',
  wwhOBDOBDSystemInformation = '0190\r',
  wwhOBDOBDSystemInformation_B = '0191\r',
  fuelSystemControl = '0192\r',
  wwhOBDOBDCountersSupport = '0193\r',
  NOxWarningAndInducementSystem = '0194\r',
  exhaustGasTemperatureSensor = '0198\r',
  exhaustGasTemperatureSensor_Bank2 = '0199\r',
  hybridEVVehicleSystemData_Battery_Voltage = '019a\r',
  dieselExhaustFluidSensorData = '019b\r',
  O2SensorData = '019c\r',
  engineFuelRate_B = '019d\r',
  engineExhaustFlowRate = '019e\r',
  fuelSystemPercentageUse = '019f\r',
  pidsSupported_A1_C0 = '01a0\r',
  NOxSensorCorrectedData = '01a1\r',
  cylinderFuelRate = '01a2\r',
  evapSystemVaporPressure_B2 = '01a3\r',
  transmissionActualGear = '01a4\r',
  commandedDieselExhaustFluidDosing = '01a5\r',
  odometer = '01a6\r',
  NOxSensorConcentrationSensors3And4 = '01a7\r',
  NOxSensorCorrectedConcentrationSensors3And4 = '01a8\r',
  absDisableSwitchState = '01a9\r',
  pidsSupported_C1_E0 = '01c0\r',
  fuelLevelInput_AB = '01c3\r',
  exhaustParticulateControlSystemDiagnosticTimeCount = '01c4\r',
  fuelPressure_AB = '01c5\r',
  particulateControl_Byte1_Byte2_3_Byte4_5_Byte6_7 = '01c6\r',
  distanceSinceReflashOrModuleReplacement = '01c7\r',
  NOxControlDiagnostic_NCD_PartD_ControlLampStatus = '01c8\r'
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

export const CharacteristicConst = {
  engineSpeed: {
    name: 'Velocidade do Motor',
    code: '010c\r'
  },
  vehicleSpeed: {
    name: 'Velocidade do Veículo',
    code: '010d\r'
  },
  distanceTraveledSinceCodesCleared: {
    name: 'Distância Percorrida Desde a Limpeza dos Códigos',
    code: '0131\r'
  },
  engineCoolantTemp: {
    name: 'Temperatura do Líquido de Arrefecimento do Motor',
    code: '0105\r'
  },
  intakeAirTemperature: {
    name: 'Temperatura do Ar de Admissão',
    code: '010f\r'
  },
  intakeManifoldAbsolutePressure: {
    name: 'Pressão Absoluta do Coletor de Admissão',
    code: '010b\r'
  },
  throttlePosition: {
    name: 'Posição do Acelerador',
    code: '0111\r'
  },
  fuelLevelInput: {
    name: 'Nível de Combustível',
    code: '012f\r'
  },
  fuelPressure: {
    name: 'Pressão do Combustível',
    code: '010a\r'
  },
  fuelTrimBank1LongTerm: {
    name: 'Trim de Combustível Banco 1 a Longo Prazo',
    code: '0107\r'
  },
  fuelTrimBank1ShortTerm: {
    name: 'Trim de Combustível Banco 1 a Curto Prazo',
    code: '0106\r'
  },
  fuelTrimBank2LongTerm: {
    name: 'Trim de Combustível Banco 2 a Longo Prazo',
    code: '0109\r'
  },
  fuelTrimBank2ShortTerm: {
    name: 'Trim de Combustível Banco 2 a Curto Prazo',
    code: '0108\r'
  },
  engineFuelRate: {
    name: 'Taxa de Combustível do Motor',
    code: '015e\r'
  },
  engineOilTemperature: {
    name: 'Temperatura do Óleo do Motor',
    code: '015c\r'
  },
  mafAirFlowRate: {
    name: 'Taxa de Fluxo de Ar MAF',
    code: '0110\r'
  },
  runtimeSinceEngineStart: {
    name: 'Tempo de Funcionamento Desde a Partida do Motor',
    code: '011f\r'
  },
  vin: {
    name: 'VIN (Número de Identificação do Veículo)',
    code: '0902\r'
  },
  distanceWithMILON: {
    name: 'Distância Percorrida com MIL Ligada',
    code: '0121\r'
  },

  commandedEGR: {
    name: 'EGR Comandada',
    code: '012c\r'
  },
  commandedThrottleActuator: {
    name: 'Atuador do Acelerador Comandado',
    code: '014c\r'
  },
  actualEGR_CommandedEGR_EGRError: {
    name: 'Erro EGR Real/Comandada',
    code: '0169\r'
  },
  commandedAFR: {
    name: 'Relação Ar-Combustível Comandada',
    code: '0144\r'
  },
  controlModuleVoltage: {
    name: 'Tensão do Módulo de Controle',
    code: '0142\r'
  },
  obdStandard: {
    name: 'Padrão OBD',
    code: '011c\r'
  },
  fuelType: {
    name: 'Tipo de Combustível',
    code: '0151\r'
  },
  monitorStatus: {
    name: 'Status do Monitor',
    code: '0101\r'
  },
  monitorStatusThisDriveCycle: {
    name: 'Status do Monitor Neste Ciclo de Condução',
    code: '0141\r'
  },
  warmUpsSinceCodesCleared: {
    name: 'Aquecimentos Desde a Limpeza dos Códigos',
    code: '0130\r'
  },
  timeSinceTroubleCodesCleared: {
    name: 'Tempo Desde a Limpeza dos Códigos de Falha',
    code: '014e\r'
  },
  timeRunWithMILOn: {
    name: 'Tempo de Funcionamento com MIL Ligada',
    code: '014d\r'
  },
  NOxControlDiagnostic_NCD_PartD_ControlLampStatus: {
    name: 'Status da Lâmpada de Controle NCD Parte D',
    code: '01c8\r'
  },
  NOxNTENotToExceedControlAreaStatus: {
    name: 'Status da Área de Controle NTE',
    code: '017d\r'
  },
  NOxReagentSystem: {
    name: 'Sistema de Reagente NOx',
    code: '0185\r'
  },
  NOxSensor: {
    name: 'Sensor NOx',
    code: '0183\r'
  },
  NOxSensorConcentrationSensors3And4: {
    name: 'Sensores de Concentração NOx 3 e 4',
    code: '01a7\r'
  },
  NOxSensorCorrectedConcentrationSensors3And4: {
    name: 'Concentração Corrigida dos Sensores NOx 3 e 4',
    code: '01a8\r'
  },
  NOxSensorCorrectedData: {
    name: 'Dados Corrigidos do Sensor NOx',
    code: '01a1\r'
  },
  NOxWarningAndInducementSystem: {
    name: 'Sistema de Aviso e Indução NOx',
    code: '0194\r'
  },
  O2SensorData: {
    name: 'Dados do Sensor O2',
    code: '019c\r'
  },
  O2Sensor_WideRange: {
    name: 'Sensor O2 de Faixa Ampla',
    code: '018c\r'
  },
  PMNTENotToExceedControlAreaStatus: {
    name: 'Status da Área de Controle de PM NTE',
    code: '017e\r'
  },
  PMSensor_Bank1_Bank2: {
    name: 'Sensor PM Banco 1 e Banco 2',
    code: '018f\r'
  },
  SCRInduceSystem: {
    name: 'Sistema de Indução SCR',
    code: '0188\r'
  },
  absDisableSwitchState: {
    name: 'Estado do Interruptor de Desativação ABS',
    code: '01a9\r'
  },
  absoluteBarometricPressure: {
    name: 'Pressão Barométrica Absoluta',
    code: '0133\r'
  },
  absoluteEvapSystemVaporPressure: {
    name: 'Pressão de Vapor do Sistema de Evaporação Absoluta',
    code: '0153\r'
  },
  absoluteLoadValue: {
    name: 'Valor de Carga Absoluta',
    code: '0143\r'
  },
  absoluteThrottlePositionB: {
    name: 'Posição Absoluta do Acelerador B',
    code: '0147\r'
  },
  absoluteThrottlePositionC: {
    name: 'Posição Absoluta do Acelerador C',
    code: '0148\r'
  },
  acceleratorPedalPositionD: {
    name: 'Posição do Pedal do Acelerador D',
    code: '0149\r'
  },
  acceleratorPedalPositionE: {
    name: 'Posição do Pedal do Acelerador E',
    code: '014a\r'
  },
  acceleratorPedalPositionF: {
    name: 'Posição do Pedal do Acelerador F',
    code: '014b\r'
  },
  actualEnginePercentTorque: {
    name: 'Torque Percentual Real do Motor',
    code: '0162\r'
  },
  ambientAirTemperature: {
    name: 'Temperatura do Ar Ambiente',
    code: '0146\r'
  },
  auxInputStatus: {
    name: 'Status da Entrada Auxiliar',
    code: '011e\r'
  },
  auxiliaryInputOutputSupported: {
    name: 'Entrada/Saída Auxiliar Suportada',
    code: '0165\r'
  },
  boostPressureControl: {
    name: 'Controle de Pressão de Turboalimentação',
    code: '0170\r'
  },
  calcEngineLoad: {
    name: 'Carga do Motor Calculada',
    code: '0104\r'
  },
  catalystTempBank1Sensor1: {
    name: 'Temperatura do Catalisador Banco 1 Sensor 1',
    code: '013c\r'
  },
  catalystTempBank1Sensor2: {
    name: 'Temperatura do Catalisador Banco 1 Sensor 2',
    code: '013e\r'
  },
  catalystTempBank2Sensor1: {
    name: 'Temperatura do Catalisador Banco 2 Sensor 1',
    code: '013d\r'
  },
  catalystTempBank2Sensor2: {
    name: 'Temperatura do Catalisador Banco 2 Sensor 2',
    code: '013f\r'
  },
  chargeAirCoolerTemperature: {
    name: 'Temperatura do Resfriador de Ar',
    code: '0177\r'
  },
  commandedDieselExhaustFluidDosing: {
    name: 'Dosagem de Fluido de Escape Diesel Comandada',
    code: '01a5\r'
  },
  commandedDieselIntakeAirFlowControl_RelativeIntakeAirFlowPosition: {
    name: 'Controle de Fluxo de Ar de Admissão Diesel Comandado/Posição Relativa',
    code: '016a\r'
  },
  commandedEvaporativePurge: {
    name: 'Purga Evaporativa Comandada',
    code: '012e\r'
  },
  commandedSecondaryAirStatus: {
    name: 'Status do Ar Secundário Comandado',
    code: '0112\r'
  },
  commandedThrottleActuatorControl_RelativeThrottlePosition: {
    name: 'Controle do Atuador do Acelerador Comandado/Posição Relativa do Acelerador',
    code: '016c\r'
  },
  cylinderFuelRate: {
    name: 'Taxa de Combustível por Cilindro',
    code: '01a2\r'
  },
  dieselAftertreatment: {
    name: 'Tratamento Pós-Combustão Diesel',
    code: '018b\r'
  },
  dieselExhaustFluidSensorData: {
    name: 'Dados do Sensor de Fluido de Escape Diesel',
    code: '019b\r'
  },
  dieselParticulateFilter: {
    name: 'Filtro de Partículas Diesel',
    code: '017b\r'
  },
  dieselParticulateFilterDifferentialPressure: {
    name: 'Pressão Diferencial do Filtro de Partículas Diesel',
    code: '017a\r'
  },
  dieselParticulateFilterTemperature: {
    name: 'Temperatura do Filtro de Partículas Diesel',
    code: '017c\r'
  },
  driversDemandEnginePercentTorque: {
    name: 'Torque Percentual do Motor Demandado pelo Motorista',
    code: '0161\r'
  },
  egrError: {
    name: 'Erro EGR',
    code: '012d\r'
  },
  emissionRequirements: {
    name: 'Requisitos de Emissão',
    code: '015f\r'
  },
  engineCoolantTemperatureSensor: {
    name: 'Sensor de Temperatura do Líquido de Arrefecimento do Motor',
    code: '0167\r'
  },
  engineExhaustFlowRate: {
    name: 'Taxa de Fluxo de Escape do Motor',
    code: '019e\r'
  },
  engineFriction_PercentTorque: {
    name: 'Atrito do Motor/Percentual de Torque',
    code: '018e\r'
  },
  engineFuelRate_B: {
    name: 'Taxa de Combustível do Motor B',
    code: '019d\r'
  },
  enginePercentTorqueData: {
    name: 'Dados do Percentual de Torque do Motor',
    code: '0164\r'
  },
  engineReferenceTorque: {
    name: 'Torque de Referência do Motor',
    code: '0163\r'
  },
  engineRunTimeForAECD_11_15: {
    name: 'Tempo de Funcionamento do Motor para AECD 11-15',
    code: '0181\r'
  },
  engineRunTimeForAECD_16_20: {
    name: 'Tempo de Funcionamento do Motor para AECD 16-20',
    code: '0182\r'
  },
  engineRunTime_B: {
    name: 'Tempo de Funcionamento do Motor B',
    code: '017f\r'
  },
  ethanolFuelPercentage: {
    name: 'Percentual de Combustível Etanol',
    code: '0152\r'
  },
  evapSystemVaporPressure: {
    name: 'Pressão de Vapor do Sistema de Evaporação',
    code: '0132\r'
  },
  evapSystemVaporPressure2: {
    name: 'Pressão de Vapor do Sistema de Evaporação 2',
    code: '0154\r'
  },
  evapSystemVaporPressure_B2: {
    name: 'Pressão de Vapor do Sistema de Evaporação B2',
    code: '01a3\r'
  },
  exhaustGasRecirculationTemperature: {
    name: 'Temperatura da Recirculação de Gases de Escape',
    code: '016b\r'
  },
  exhaustGasTemperatureSensor: {
    name: 'Sensor de Temperatura dos Gases de Escape',
    code: '0198\r'
  },
  exhaustGasTemperatureSensor_Bank2: {
    name: 'Sensor de Temperatura dos Gases de Escape Banco 2',
    code: '0199\r'
  },
  exhaustGasTemperature_Bank1: {
    name: 'Temperatura dos Gases de Escape Banco 1',
    code: '0178\r'
  },
  exhaustGasTemperature_Bank2: {
    name: 'Temperatura dos Gases de Escape Banco 2',
    code: '0179\r'
  },
  exhaustParticulateControlSystemDiagnosticTimeCount: {
    name: 'Tempo de Diagnóstico do Sistema de Controle de Partículas de Escape',
    code: '01c4\r'
  },
  exhaustPressure: {
    name: 'Pressão de Escape',
    code: '0173\r'
  },
  freezeFrameDTC: {
    name: 'Congelamento de Quadro DTC',
    code: '0102\r'
  },
  fuelInjectionTiming: {
    name: 'Tempo de Injeção de Combustível',
    code: '015d\r'
  },
  fuelLevelInput_AB: {
    name: 'Nível de Combustível AB',
    code: '01c3\r'
  },
  fuelPressureControlSystem: {
    name: 'Sistema de Controle de Pressão do Combustível',
    code: '016d\r'
  },
  fuelPressure_AB: {
    name: 'Pressão do Combustível AB',
    code: '01c5\r'
  },
  fuelRailAbsolutePressure: {
    name: 'Pressão Absoluta do Trilho de Combustível',
    code: '0159\r'
  },
  fuelRailPressure: {
    name: 'Pressão do Trilho de Combustível',
    code: '0122\r'
  },
  fuelRailPressureGauge: {
    name: 'Manômetro de Pressão do Trilho de Combustível',
    code: '0123\r'
  },
  fuelSystemControl: {
    name: 'Controle do Sistema de Combustível',
    code: '0192\r'
  },
  fuelSystemPercentageUse: {
    name: 'Percentual de Uso do Sistema de Combustível',
    code: '019f\r'
  },
  fuelSystemStatus: {
    name: 'Status do Sistema de Combustível',
    code: '0103\r'
  },
  fuelTankLevelInput: {
    name: 'Nível de Combustível do Tanque',
    code: '012f\r'
  },
  hybridBatteryPackRemainingLife: {
    name: 'Vida Útil Restante da Bateria Híbrida',
    code: '015b\r'
  },
  hybridEVVehicleSystemData_Battery_Voltage: {
    name: 'Dados do Sistema do Veículo Híbrido EV/Bateria/Tensão',
    code: '019a\r'
  },
  injectionPressureControlSystem: {
    name: 'Sistema de Controle da Pressão de Injeção',
    code: '016e\r'
  },
  intakeAirTemperatureSensor: {
    name: 'Sensor de Temperatura do Ar de Admissão',
    code: '0175\r'
  },
  intakeManifoldPressure: {
    name: 'Pressão do Coletor de Admissão',
    code: '0135\r'
  },
  intakeManifoldPressure_AB: {
    name: 'Pressão do Coletor de Admissão AB',
    code: '01c6\r'
  },
  lambdaSensor: {
    name: 'Sensor Lambda',
    code: '01a0\r'
  },
  lambdaSensor_Bank1: {
    name: 'Sensor Lambda Banco 1',
    code: '01a1\r'
  },
  lambdaSensor_Bank2: {
    name: 'Sensor Lambda Banco 2',
    code: '01a2\r'
  },
  lastDTC: {
    name: 'Último DTC',
    code: '0101\r'
  },
  manufacturerSpecificData: {
    name: 'Dados Específicos do Fabricante',
    code: '01d0\r'
  },
  measuredEngineLoad: {
    name: 'Carga do Motor Medida',
    code: '0104\r'
  },
  measuredFuelLevel: {
    name: 'Nível de Combustível Medido',
    code: '012f\r'
  },
  measuredIntakeAirTemperature: {
    name: 'Temperatura do Ar de Admissão Medida',
    code: '010f\r'
  },
  measuredIntakeManifoldPressure: {
    name: 'Pressão do Coletor de Admissão Medida',
    code: '0135\r'
  },
  measuredThrottlePosition: {
    name: 'Posição do Acelerador Medida',
    code: '0110\r'
  },
  obdIIStandard: {
    name: 'Padrão OBDII',
    code: '01c1\r'
  },
  oilTemperature: {
    name: 'Temperatura do Óleo',
    code: '015c\r'
  },
  oxygenSensor: {
    name: 'Sensor de Oxigênio',
    code: '019c\r'
  },
  parkingBrakeSwitch: {
    name: 'Interruptor de Freio de Estacionamento',
    code: '015a\r'
  },
  powertrainControlModuleVoltage: {
    name: 'Tensão do Módulo de Controle da Transmissão',
    code: '015f\r'
  },
  speedOfVehicle: {
    name: 'Velocidade do Veículo',
    code: '010d\r'
  },
  throttlePositionSensor: {
    name: 'Sensor de Posição do Acelerador',
    code: '0156\r'
  },
  tirePressure: {
    name: 'Pressão dos Pneus',
    code: '0184\r'
  },
  totalDistanceTraveled: {
    name: 'Distância Total Percorrida',
    code: '0125\r'
  },
  turboBoostPressure: {
    name: 'Pressão do Turboalimentador',
    code: '014a\r'
  },
  vehicleIdentificationNumber: {
    name: 'Número de Identificação do Veículo (VIN)',
    code: '0902\r'
  }
};
