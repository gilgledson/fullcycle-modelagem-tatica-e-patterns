import { BelongsTo, Column, ForeignKey, PrimaryKey, Table, Model } from "sequelize-typescript";
import { SequelizeHooks } from "sequelize/types/hooks";
import OrderModel from "./order.model";
import ProductModel from "./product.model";

@Table({
    tableName: "order_items",
    timestamps: false
})
export default class OrderItemModel extends Model {

  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare product_id: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false, onDelete: 'cascade'})
  declare order_id: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;

}