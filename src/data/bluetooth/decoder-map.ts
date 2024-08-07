import { CharacteristicType } from 'domain/enums';
import {
  ABSDisableSwitchStateDecoder,
  AbsoluteBarometricPressureDecoder,
  AbsoluteEvapSystemVaporPressureDecoder,
  AbsoluteLoadValueDecoder,
  AbsoluteThrottlePositionBDecoder,
  AbsoluteThrottlePositionCDecoder,
  AcceleratorPedalPositionDDecoder,
  AcceleratorPedalPositionEDecoder,
  AcceleratorPedalPositionFDecoder,
  ActualEnginePercentTorqueDecoder,
  AmbientAirTemperatureDecoder,
  AuxInputStatusDecoder,
  CalcEngineLoadDecoder,
  CatalystTempB1S1Decoder,
  CatalystTempB1S2Decoder,
  CatalystTempB2S1Decoder,
  CatalystTempB2S2Decoder,
  CommandedAFRDecoder,
  CommandedDieselExhaustFluidDosingDecoder,
  CommandedEGRDecoder,
  CommandedEvaporativePurgeDecoder,
  CommandedSecondaryAirStatusDecoder,
  CommandedThrottleActuatorDecoder,
  ControlModuleVoltageDecoder,
  CylinderFuelRateDecoder,
  DieselParticulateFilterTemperatureDecoder,
  DistanceTraveledSinceCodesClearedDecoder,
  DistanceWithMILONDecoder,
  DriversDemandEnginePercentTorqueDecoder,
  EGRErrorDecoder,
  EngineCoolantTempDecoder,
  EngineCoolantTempSensorDecoder,
  EngineFrictionPercentTorqueDecoder,
  EngineFuelRateDecoder,
  EngineOilTemperatureDecoder,
  EnginePercentTorqueDataDecoder,
  EngineReferenceTorqueDecoder,
  EngineSpeedDecoder,
  EthanolFuelPercentageDecoder,
  EvapSystemVaporPressure2Decoder,
  EvapSystemVaporPressureDecoder,
  FreezeFrameDecoder,
  FuelInjectionTimingDecoder,
  FuelPressureDecoder,
  FuelRailAbsolutePressureDecoder,
  FuelRailPressureDecoder,
  FuelRailPressureGaugeDecoder,
  FuelSystemStatusDecoder,
  FuelTankLevelInputDecoder,
  FuelTrimBank1LongTermDecoder,
  FuelTrimBank1ShortTermDecoder,
  FuelTrimBank2LongTermDecoder,
  FuelTrimBank2ShortTermDecoder,
  FuelTypeDecoder,
  HybridBatteryBackRemainingLifeDecoder,
  IntakeAirTemperatureDecoder,
  IntakeAirTempSensorDecoder,
  IntakeManifoldPressureDecoder,
  LongTermSecondaryO2SensorTrimB1B3Decoder,
  LongTermSecondaryO2SensorTrimB2B4Decoder,
  MafAirFlowRateDecoder,
  MassAirFlowSensorDecoder,
  MaxAirFlowRateFromMAFDecoder,
  MaxValuesAFRVoltageCurrentIMAPDecoder,
  MonitorStatusDecoder,
  MonitorStatusThisDriveCycleDecoder,
  O2S1CDCurrentDecoder,
  O2S2CDCurrentDecoder,
  O2S3CDCurrentDecoder,
  O2S4CDCurrentDecoder,
  O2S5CDCurrentDecoder,
  O2S6CDCurrentDecoder,
  O2S7CDCurrentDecoder,
  O2S8CDCurrentDecoder,
  OBDStandardDecoder,
  OdometerDecoder,
  OxygenSensor1AFRCDVoltageDecoder,
  OxygenSensor2AFRCDVoltageDecoder,
  OxygenSensor3AFRCDVoltageDecoder,
  OxygenSensor4AFRCDVoltageDecoder,
  OxygenSensor5AFRCDVoltageDecoder,
  OxygenSensor6AFRCDVoltageDecoder,
  OxygenSensor7AFRCDVoltageDecoder,
  OxygenSensor8AFRCDVoltageDecoder,
  OxygenSensorsPresentBanks2Decoder,
  OxygenSensorsPresentBanks4Decoder,
  OxygenSensorVoltageB1S1Decoder,
  OxygenSensorVoltageB1S2Decoder,
  OxygenSensorVoltageB1S3Decoder,
  OxygenSensorVoltageB1S4Decoder,
  OxygenSensorVoltageB2S1Decoder,
  OxygenSensorVoltageB2S2Decoder,
  OxygenSensorVoltageB2S3Decoder,
  OxygenSensorVoltageB2S4Decoder,
  RelativeAcceleratorPedalPositionDecoder,
  RelativeThrottlePositionDecoder,
  RuntimeSinceEngineStartDecoder,
  ShortTermSecondaryO2SensorTrimB1B3Decoder,
  ShortTermSecondaryO2SensorTrimB2B4Decoder,
  SupportedPIDs21to40Decoder,
  SupportedPIDs41to60Decoder,
  SupportedPIDs61to80Decoder,
  SupportedPIDs81toA0Decoder,
  SupportedPIDsA1toC0Decoder,
  SupportedPIDsC1toE0Decoder,
  ThrottlePositionDecoder,
  TimeRunWithMilOnDecoder,
  TimeSinceTroubleCodesClearedDecoder,
  TimingAdvanceDecoder,
  TransmissionActualGearDecoder,
  VehicleSpeedDecoder,
  VinDecoder,
  WarmupsSinceCodesClearedDecoder
} from './decoders';
import { BaseDecoder } from './decoders/base.decoder';

export const DecoderMap = {
  [CharacteristicType.monitorStatus]: MonitorStatusDecoder,
  [CharacteristicType.freezeFrameDTC]: FreezeFrameDecoder,
  [CharacteristicType.fuelSystemStatus]: FuelSystemStatusDecoder,
  [CharacteristicType.calcEngineLoad]: CalcEngineLoadDecoder,
  [CharacteristicType.engineCoolantTemp]: EngineCoolantTempDecoder,
  [CharacteristicType.fuelTrimBank1ShortTerm]: FuelTrimBank1ShortTermDecoder,
  [CharacteristicType.fuelTrimBank1LongTerm]: FuelTrimBank1LongTermDecoder,
  [CharacteristicType.fuelTrimBank2ShortTerm]: FuelTrimBank2ShortTermDecoder,
  [CharacteristicType.fuelTrimBank2LongTerm]: FuelTrimBank2LongTermDecoder,
  [CharacteristicType.fuelPressure]: FuelPressureDecoder,
  [CharacteristicType.intakeManifoldPressure]: IntakeManifoldPressureDecoder,
  [CharacteristicType.engineSpeed]: EngineSpeedDecoder,
  [CharacteristicType.vehicleSpeed]: VehicleSpeedDecoder,
  [CharacteristicType.timingAdvance]: TimingAdvanceDecoder,
  [CharacteristicType.intakeAirTemperature]: IntakeAirTemperatureDecoder,
  [CharacteristicType.mafAirFlowRate]: MafAirFlowRateDecoder,
  [CharacteristicType.throttlePosition]: ThrottlePositionDecoder,
  [CharacteristicType.commandedSecondaryAirStatus]: CommandedSecondaryAirStatusDecoder,
  [CharacteristicType.oxygenSensorsPresentBanks2]: OxygenSensorsPresentBanks2Decoder,
  [CharacteristicType.oxygenSensorVoltageB1S1]: OxygenSensorVoltageB1S1Decoder,
  [CharacteristicType.oxygenSensorVoltageB1S2]: OxygenSensorVoltageB1S2Decoder,
  [CharacteristicType.oxygenSensorVoltageB1S3]: OxygenSensorVoltageB1S3Decoder,
  [CharacteristicType.oxygenSensorVoltageB1S4]: OxygenSensorVoltageB1S4Decoder,
  [CharacteristicType.oxygenSensorVoltageB2S1]: OxygenSensorVoltageB2S1Decoder,
  [CharacteristicType.oxygenSensorVoltageB2S2]: OxygenSensorVoltageB2S2Decoder,
  [CharacteristicType.oxygenSensorVoltageB2S3]: OxygenSensorVoltageB2S3Decoder,
  [CharacteristicType.oxygenSensorVoltageB2S4]: OxygenSensorVoltageB2S4Decoder,
  [CharacteristicType.obdStandard]: OBDStandardDecoder,
  [CharacteristicType.oxygenSensorsPresentBanks4]: OxygenSensorsPresentBanks4Decoder,
  [CharacteristicType.auxInputStatus]: AuxInputStatusDecoder,
  [CharacteristicType.runtimeSinceEngineStart]: RuntimeSinceEngineStartDecoder,
  [CharacteristicType.pidsSupported_21_40]: SupportedPIDs21to40Decoder,
  [CharacteristicType.distanceWithMILON]: DistanceWithMILONDecoder,
  [CharacteristicType.fuelRailPressure]: FuelRailPressureDecoder,
  [CharacteristicType.fuelRailPressureGauge]: FuelRailPressureGaugeDecoder,
  [CharacteristicType.oxygenSensor1AFR_CD_Voltage]: OxygenSensor1AFRCDVoltageDecoder,
  [CharacteristicType.oxygenSensor2AFR_CD_Voltage]: OxygenSensor2AFRCDVoltageDecoder,
  [CharacteristicType.oxygenSensor3AFR_CD_Voltage]: OxygenSensor3AFRCDVoltageDecoder,
  [CharacteristicType.oxygenSensor4AFR_CD_Voltage]: OxygenSensor4AFRCDVoltageDecoder,
  [CharacteristicType.oxygenSensor5AFR_CD_Voltage]: OxygenSensor5AFRCDVoltageDecoder,
  [CharacteristicType.oxygenSensor6AFR_CD_Voltage]: OxygenSensor6AFRCDVoltageDecoder,
  [CharacteristicType.oxygenSensor7AFR_CD_Voltage]: OxygenSensor7AFRCDVoltageDecoder,
  [CharacteristicType.oxygenSensor8AFR_CD_Voltage]: OxygenSensor8AFRCDVoltageDecoder,
  [CharacteristicType.commandedEGR]: CommandedEGRDecoder,
  [CharacteristicType.egrError]: EGRErrorDecoder,
  [CharacteristicType.commandedEvaporativePurge]: CommandedEvaporativePurgeDecoder,
  [CharacteristicType.fuelTankLevelInput]: FuelTankLevelInputDecoder,
  [CharacteristicType.warmUpsSinceCodesCleared]: WarmupsSinceCodesClearedDecoder,
  [CharacteristicType.distanceTraveledSinceCodesCleared]: DistanceTraveledSinceCodesClearedDecoder,
  [CharacteristicType.evapSystemVaporPressure]: EvapSystemVaporPressureDecoder,
  [CharacteristicType.absoluteBarometricPressure]: AbsoluteBarometricPressureDecoder,
  [CharacteristicType.oxygenSensor1AB_CD_Current]: O2S1CDCurrentDecoder,
  [CharacteristicType.oxygenSensor2AB_CD_Current]: O2S2CDCurrentDecoder,
  [CharacteristicType.oxygenSensor3AB_CD_Current]: O2S3CDCurrentDecoder,
  [CharacteristicType.oxygenSensor4AB_CD_Current]: O2S4CDCurrentDecoder,
  [CharacteristicType.oxygenSensor5AB_CD_Current]: O2S5CDCurrentDecoder,
  [CharacteristicType.oxygenSensor6AB_CD_Current]: O2S6CDCurrentDecoder,
  [CharacteristicType.oxygenSensor7AB_CD_Current]: O2S7CDCurrentDecoder,
  [CharacteristicType.oxygenSensor8AB_CD_Current]: O2S8CDCurrentDecoder,
  [CharacteristicType.catalystTempBank1Sensor1]: CatalystTempB1S1Decoder,
  [CharacteristicType.catalystTempBank2Sensor1]: CatalystTempB2S1Decoder,
  [CharacteristicType.catalystTempBank1Sensor2]: CatalystTempB1S2Decoder,
  [CharacteristicType.catalystTempBank2Sensor2]: CatalystTempB2S2Decoder,
  [CharacteristicType.pidsSupported_41_60]: SupportedPIDs41to60Decoder,
  [CharacteristicType.monitorStatusThisDriveCycle]: MonitorStatusThisDriveCycleDecoder,
  [CharacteristicType.controlModuleVoltage]: ControlModuleVoltageDecoder,
  [CharacteristicType.absoluteLoadValue]: AbsoluteLoadValueDecoder,
  [CharacteristicType.commandedAFR]: CommandedAFRDecoder,
  [CharacteristicType.relativeThrottlePosition]: RelativeThrottlePositionDecoder,
  [CharacteristicType.ambientAirTemperature]: AmbientAirTemperatureDecoder,
  [CharacteristicType.absoluteThrottlePositionB]: AbsoluteThrottlePositionBDecoder,
  [CharacteristicType.absoluteThrottlePositionC]: AbsoluteThrottlePositionCDecoder,
  [CharacteristicType.acceleratorPedalPositionD]: AcceleratorPedalPositionDDecoder,
  [CharacteristicType.acceleratorPedalPositionE]: AcceleratorPedalPositionEDecoder,
  [CharacteristicType.acceleratorPedalPositionF]: AcceleratorPedalPositionFDecoder,
  [CharacteristicType.commandedThrottleActuator]: CommandedThrottleActuatorDecoder,
  [CharacteristicType.timeRunWithMILOn]: TimeRunWithMilOnDecoder,
  [CharacteristicType.timeSinceTroubleCodesCleared]: TimeSinceTroubleCodesClearedDecoder,
  [CharacteristicType.maxValuesAFR_Voltage_Current_IMAP]: MaxValuesAFRVoltageCurrentIMAPDecoder,
  [CharacteristicType.maxAirFlowRateFromMAF]: MaxAirFlowRateFromMAFDecoder,
  [CharacteristicType.fuelType]: FuelTypeDecoder,
  [CharacteristicType.ethanolFuelPercentage]: EthanolFuelPercentageDecoder,
  [CharacteristicType.absoluteEvapSystemVaporPressure]: AbsoluteEvapSystemVaporPressureDecoder,
  [CharacteristicType.evapSystemVaporPressure2]: EvapSystemVaporPressure2Decoder,
  [CharacteristicType.shortTermSecondaryOxygenSensorTrimB1B3]:
    ShortTermSecondaryO2SensorTrimB1B3Decoder,
  [CharacteristicType.longTermSecondaryOxygenSensorTrimB1B3]:
    LongTermSecondaryO2SensorTrimB1B3Decoder,
  [CharacteristicType.shortTermSecondaryOxygenSensorTrimB2B4]:
    ShortTermSecondaryO2SensorTrimB2B4Decoder,
  [CharacteristicType.longTermSecondaryOxygenSensorTrimB2B4]:
    LongTermSecondaryO2SensorTrimB2B4Decoder,
  [CharacteristicType.fuelRailAbsolutePressure]: FuelRailAbsolutePressureDecoder,
  [CharacteristicType.relativeAcceleratorPedalPosition]: RelativeAcceleratorPedalPositionDecoder,
  [CharacteristicType.hybridBatteryPackRemainingLife]: HybridBatteryBackRemainingLifeDecoder,
  [CharacteristicType.engineOilTemperature]: EngineOilTemperatureDecoder,
  [CharacteristicType.fuelInjectionTiming]: FuelInjectionTimingDecoder,
  [CharacteristicType.engineFuelRate]: EngineFuelRateDecoder,
  [CharacteristicType.pidsSupported_61_80]: SupportedPIDs61to80Decoder,
  [CharacteristicType.driversDemandEnginePercentTorque]: DriversDemandEnginePercentTorqueDecoder,
  [CharacteristicType.actualEnginePercentTorque]: ActualEnginePercentTorqueDecoder,
  [CharacteristicType.engineReferenceTorque]: EngineReferenceTorqueDecoder,
  [CharacteristicType.enginePercentTorqueData]: EnginePercentTorqueDataDecoder,
  [CharacteristicType.massAirFlowSensor]: MassAirFlowSensorDecoder,
  [CharacteristicType.engineCoolantTemperatureSensor]: EngineCoolantTempSensorDecoder,
  [CharacteristicType.intakeAirTemperatureSensor]: IntakeAirTempSensorDecoder,
  [CharacteristicType.dieselParticulateFilterTemperature]:
    DieselParticulateFilterTemperatureDecoder,
  [CharacteristicType.pidsSupported_81_A0]: SupportedPIDs81toA0Decoder,
  [CharacteristicType.engineFriction_PercentTorque]: EngineFrictionPercentTorqueDecoder,
  [CharacteristicType.pidsSupported_A1_C0]: SupportedPIDsA1toC0Decoder,
  [CharacteristicType.cylinderFuelRate]: CylinderFuelRateDecoder,
  [CharacteristicType.transmissionActualGear]: TransmissionActualGearDecoder,
  [CharacteristicType.commandedDieselExhaustFluidDosing]: CommandedDieselExhaustFluidDosingDecoder,
  [CharacteristicType.odometer]: OdometerDecoder,
  [CharacteristicType.absDisableSwitchState]: ABSDisableSwitchStateDecoder,
  [CharacteristicType.pidsSupported_C1_E0]: SupportedPIDsC1toE0Decoder,
  [CharacteristicType.vin]: VinDecoder,
  [CharacteristicType.vin2]: VinDecoder,
  [CharacteristicType.vin3]: VinDecoder
} as unknown as { [key in CharacteristicType]: BaseDecoder };
