import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

export type ProcurementRecordAttributes = {
  id?: string;
  title: string;
  description: string;
  publishDate: string;
  buyerId: string;
  stage: string;
  closeDate?: string;
  awardDate?: string;
  value?: number;
  currency?: string;
};

@Table({ createdAt: false, updatedAt: false, tableName: "procurement_records" })
export class ProcurementRecord extends Model {
  @Column({ primaryKey: true })
  id!: string;

  @Column
  title!: string;

  @Column
  description!: string;

  @Column({ type: DataType.STRING, field: "publish_date" })
  publishDate!: string;

  @Column({ field: "buyer_id" })
  buyerId!: string;

  @Column
  stage!: "TENDER" | "CONTRACT" | "TenderIntent";

  @AllowNull
  @Column({ type: DataType.STRING, field: "close_date" })
  closeDate!: string | null;

  @AllowNull
  @Column({ type: DataType.STRING, field: "award_date" })
  awardDate!: string | null;

  @AllowNull
  @Column(DataType.REAL)
  value!: number | null;

  @AllowNull
  @Column(DataType.STRING)
  currency!: string | null;

  @Column({ type: DataType.STRING, field: "created_at" })
  createdAt!: string;
}
