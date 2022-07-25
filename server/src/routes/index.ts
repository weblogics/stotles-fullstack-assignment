import * as express from "express";

import ProcurementRecordsRoutes from "./ProcurementRecords.Routes";

export default function initRoutes(baseUrl: string): express.Router {
  const router: express.Router = express.Router();

  router.use("/records", ProcurementRecordsRoutes());

  return router;
}
