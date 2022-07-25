import { Table, Column, Model, HasMany } from "sequelize-typescript";

export type BuyerAttributes = {
  id?: number;
  name: string;
};

@Table({ createdAt: false, updatedAt: false })
export class Buyer extends Model {
  @Column({ primaryKey: true })
  id!: string;

  @Column
  name!: string;
}
