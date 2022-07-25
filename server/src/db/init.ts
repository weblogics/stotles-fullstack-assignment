import SQLiteConnection from "../db/SQLiteConnection";

import { Buyer } from "../models/sequelize/Buyer.Model";
import { ProcurementRecord } from "../models/sequelize/ProcurementRecord.Model";

function dbInit(): void {
  SQLiteConnection.addModels([Buyer, ProcurementRecord]);
}

export default dbInit;
