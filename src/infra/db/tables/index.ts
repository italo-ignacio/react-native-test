import { TableName } from 'domain/enums';

const vehicleTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.vehicle} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    apiId INTEGER UNIQUE,
    licensePlate VARCHAR(12) NOT NULL,
    typeOfFuel VARCHAR(45) NOT NULL,
    serialNumber VARCHAR(45) NOT NULL,
    vehicleModelId INTEGER REFERENCES ${TableName.vehicleModel}(id),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const vehicleModelsTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.vehicleModel} (
    id INTEGER PRIMARY KEY NOT NULL,
    apiId INTEGER UNIQUE,
    name VARCHAR(45) NOT NULL,
    vehicleBrandId INTEGER REFERENCES ${TableName.vehicleBrand}(id),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const vehicleBrandsTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.vehicleBrand} (
    id INTEGER PRIMARY KEY NOT NULL,
    apiId INTEGER UNIQUE,
    name VARCHAR(45) NOT NULL,
    imageName VARCHAR(30),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const vehicleDiagnosticsTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.vehicleDiagnostic} (
    id INTEGER PRIMARY KEY NOT NULL,
    vehicleReadingData TEXT NOT NULL,
    vehicleId INTEGER REFERENCES ${TableName.vehicle}(id),
    vehicleApiId INTEGER,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const offlineQueueTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.offlineQueue} (
    id INTEGER PRIMARY KEY NOT NULL,
    route VARCHAR(45) NOT NULL,
    method VARCHAR(8) NOT NULL,
    requestId INTEGER,
    entityId INTEGER,
    entity VARCHAR(45),
    body TEXT,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const obdDataTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.obdData} (
    id INTEGER PRIMARY KEY NOT NULL,
    code VARCHAR(10) NOT NULL,
    value REAL NOT NULL, 
    vin VARCHAR(45) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const averageObdDataTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.obdDataAverage} (
    id INTEGER PRIMARY KEY NOT NULL,
    code VARCHAR(10) NOT NULL,
    value REAL NOT NULL, 
    vin VARCHAR(45) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

export const initializeTables = [
  offlineQueueTable,
  vehicleBrandsTable,
  obdDataTable,
  vehicleModelsTable,
  averageObdDataTable,
  vehicleTable,
  vehicleDiagnosticsTable
];
