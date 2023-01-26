import Order from "../../../../domain/entity/order";
import order from "../../../../domain/entity/order";
import OrderItem from "../../../../domain/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/repository/order-repository.interface";
import OrderItemModel from "../model/order-item.model";
import OrderModel from "../model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: order): Promise<void> {
        await OrderModel.create(
            {
              id: entity.id,
              customer_id: entity.customerId,
              total: entity.total,
              items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
              })),
            },
            {
              include: [{ model: OrderItemModel }],
            }
          );
    }
    async update(entity: order): Promise<void> {
        try {
            const orderModel = await OrderModel.findOne({
                where: {id: entity.id},
                include: ["items"],
                rejectOnEmpty: true
            })
            await orderModel.update({
                total: entity.total
            })
            const items = entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            }))
            orderModel.$set("items", items)
       } catch (error) {
            throw new Error("Order not found")
       }
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async find(id: string): Promise<order> {
       try {
            const orderModel = await OrderModel.findOne({
                where: {id: id},
                include: ["items"],
                rejectOnEmpty: true
            })
            const orderItems = orderModel.items.map((item) => {
                return new OrderItem(item.id, item.price, item.name, item.quantity,item.product_id)
            })
            return new Order(orderModel.id, orderModel.customer_id, orderItems)
       } catch (error) {
            throw new Error("Order not found")
       }
    }
    findAll(): Promise<order[]> {
        throw new Error("Method not implemented.");
    }

}