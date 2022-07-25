import * as express from "express";
import ProcurementRecordsController from "../controllers/ProcurementRecords.Controller";

function ProcurementRecordsRoutes() {
  const router: express.Router = express.Router();

  router.post(
    "/",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        await ProcurementRecordsController.searchRecords(req, res, next);
      } catch (error) {
        res.status(500).send({
          code: 500,
          success: false,
          message: error.message,
        });
      }
    }
  );

  return router;
}

export default ProcurementRecordsRoutes;
