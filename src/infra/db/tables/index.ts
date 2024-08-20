import { TableName } from 'domain/enums';

const vehicleTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.VEHICLES} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    apiId INTEGER,
    licensePlate VARCHAR(12) NOT NULL,
    typeOfFuel INTEGER NOT NULL,
    serialNumber VARCHAR(45) NOT NULL,
    vehicleModelId INTEGER REFERENCES ${TableName.VEHICLEMODELS}(id),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const vehicleModelsTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.VEHICLEMODELS} (
    id INTEGER PRIMARY KEY NOT NULL,
    apiId INTEGER,
    name VARCHAR(45) NOT NULL,
    vehicleBrandId INTEGER REFERENCES ${TableName.VEHICLEBRANDS}(id),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const vehicleBrandsTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.VEHICLEBRANDS} (
    id INTEGER PRIMARY KEY NOT NULL,
    apiId INTEGER,
    name VARCHAR(45) NOT NULL,
    imageName VARCHAR(30),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const vehicleDiagnosticsTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.VEHICLEDIAGNOSTICS} (
    id INTEGER PRIMARY KEY NOT NULL,
    vehicleReadingData TEXT NOT NULL,
    date DATE NOT NULL,
    vehicleId INTEGER REFERENCES ${TableName.VEHICLES}(id),
    vehicleApiId INTEGER,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const offlineQueueTable = `
  CREATE TABLE IF NOT EXISTS ${TableName.OFFLINE_QUEUE} (
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
