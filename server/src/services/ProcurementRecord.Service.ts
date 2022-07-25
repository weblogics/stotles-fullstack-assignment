import { ProcurementRecordDto } from "../server/api_types";
import { ProcurementRecord } from "../models/sequelize/ProcurementRecord.Model";
import { uniqueArray } from "../utils/uniqueArray";
import { Buyer } from "../models";
import sequelize = require("sequelize");

const { Op } = sequelize;

export class ProcurementRecordService {
  /**
   * Converts a DB-style ProcurementRecord object to an API type.
   * Assumes that all related objects (buyers) are prefetched upfront and passed in the `buyersById` map
   */
  public static serializeProcurementRecord(
    record: ProcurementRecord,
    buyersById: Map<string, Buyer>
  ): ProcurementRecordDto {
    const buyer = buyersById.get(record.buyerId);

    if (!buyer) {
      throw new Error(
        `Buyer ${record.buyerId} was not pre-fetched when loading record ${record.id}.`
      );
    }

    return {
      id: record.id,
      stage: record.stage,
      title: record.title,
      description: record.description,
      buyer: {
        id: buyer.id,
        name: buyer.name,
      },
      publishDate: record.publishDate,
      awardDate: record.awardDate,
      closeDate: record.closeDate,
      value: record.value,
      currency: record.currency,
    };
  }

  /**
   * Converts an array of DB-style procurement record object into API types.
   * Prefetches all the required relations.
   */
  public static async serializeProcurementRecords(
    records: ProcurementRecord[]
  ): Promise<ProcurementRecordDto[]> {
    // Get unique buyer ids for the selected records
    const buyerIds = uniqueArray(records.map((pr) => pr.buyerId));

    // Fetch the buyer data in one query
    const buyers = await Buyer.findAll({
      where: {
        id: {
          [Op.in]: buyerIds,
        },
      },
    });

    const buyersById = new Map(buyers.map((b) => [b.id, b]));

    return records.map((r) =>
      ProcurementRecordService.serializeProcurementRecord(r, buyersById)
    );
  }

  //  SUGGESTION: It would be better to add pagination to this, ommitted due to different technical solution required for Buyer filtering.
  public static async getSerializedProcurementRecords(
    where,
    limit?: number,
    offset?: number
  ) {
    const records = await ProcurementRecord.findAll({
      where,
    });

    return await ProcurementRecordService.serializeProcurementRecords(records);
  }
}
