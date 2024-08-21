import { TableName } from 'domain/enums';

const vehicleTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.vehicles} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    apiId INTEGER,
    licensePlate VARCHAR(12) NOT NULL,
    typeOfFuel INTEGER NOT NULL,
    serialNumber VARCHAR(45) NOT NULL,
    vehicleModelId INTEGER REFERENCES ${TableName.vehicleModels}(id),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const vehicleModelsTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.vehicleModels} (
    id INTEGER PRIMARY KEY NOT NULL,
    apiId INTEGER,
    name VARCHAR(45) NOT NULL,
    vehicleBrandId INTEGER REFERENCES ${TableName.vehicleBrand}(id),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const vehicleBrandsTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.vehicleBrand} (
    id INTEGER PRIMARY KEY NOT NULL,
    apiId INTEGER,
    name VARCHAR(45) NOT NULL,
    imageName VARCHAR(30),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const vehicleDiagnosticsTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.vehicleDiagnostics} (
    id INTEGER PRIMARY KEY NOT NULL,
    vehicleReadingData TEXT NOT NULL,
    vehicleId INTEGER REFERENCES ${TableName.vehicles}(id),
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
    body TEXT,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

export const initializeTables = [
  offlineQueueTable,
  vehicleBrandsTable,
  vehicleModelsTable,
  vehicleTable,
  vehicleDiagnosticsTable
];
