/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable max-lines */
export enum CharacteristicType {
  vin = '0902',
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

export const CharacteristicConst = {
  engineSpeed: {
    name: 'Velocidade do Motor',
    code: '010c'
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
