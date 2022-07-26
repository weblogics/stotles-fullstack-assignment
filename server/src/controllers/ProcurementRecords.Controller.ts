import * as express from "express";
import sequelize = require("sequelize");
import { WhereOptions } from "sequelize";
import { ProcurementRecordAttributes } from "../models/sequelize/ProcurementRecord.Model";
import { RecordSearchRequest } from "../types/api_types";
import { ProcurementRecordService } from "../services/ProcurementRecord.Service";

const { Op } = sequelize;

//  SUGGESTION: Given more time these would live in a more common types structure.
export type GetRecordsFilters = {
  textSearch?: string;
  buyerIds?: string[];
};

class ProcurementRecordsController {
  public static async searchRecords(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const requestPayload = req.body as RecordSearchRequest;

    try {
      const filters: GetRecordsFilters = {};

      if (requestPayload.textSearch) {
        filters.textSearch = requestPayload.textSearch;
      }

      if (requestPayload.buyerIds && requestPayload.buyerIds.length > 0) {
        filters.buyerIds = requestPayload.buyerIds;
      }

      const { records } =
        await ProcurementRecordsController.getProcurementRecords(filters);

      //  SUGGESTION: I would probably create a common response handler for this.
      res.status(200).send({
        code: 200,
        success: true,
        meta: {
          filters,
          count: records.length,
        },
        data: records,
      });
    } catch (error) {
      //  SUGGESTION: I would probably create an error response handler for this.
      res.status(500).send({
        code: 500,
        success: false,
        message: error.message,
      });
    }
  }

  public static async getProcurementRecords(filters: GetRecordsFilters) {
    const where: WhereOptions<ProcurementRecordAttributes> = {};

    if (filters.textSearch) {
      where[Op.or] = [
        { title: { [Op.like]: `%${filters.textSearch}%` } },
        { description: { [Op.like]: `%${filters.textSearch}%` } },
      ];
    }

    if (filters.buyerIds) {
      where.buyerId = {
        [Op.in]: filters.buyerIds,
      };
    }

    try {
      //  SUGGESTION: It would be better to add pagination to this, ommitted due to different technical solution required for Buyer filtering.
      const records =
        await ProcurementRecordService.getSerializedProcurementRecords(where);

      return { records };
    } catch (error) {
      throw error;
    }
  }
}

export default ProcurementRecordsController;
