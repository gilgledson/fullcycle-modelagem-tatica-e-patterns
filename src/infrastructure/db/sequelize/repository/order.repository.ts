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
            
            const items = entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id
            }))
            items.map(async (item) => {
                const itemOrder = await OrderItemModel.findOne({
                    where: { id: item.id }
                })
                if(itemOrder){
                   await itemOrder.update(item)
                }else{
                   await OrderItemModel.create(item)
                }
            })
            await orderModel.update({
                total: entity.total
            })
       } catch (error) {
            throw new Error("Order not found")
       }
    }
    async delete(id: string): Promise<void> {
        try { 
            OrderModel.beforeDestroy((instance: OrderModel) => {
                instance.items.map((item) => item.destroy())
            })
            await OrderModel.destroy({
                where: { id: id }
            });
        } catch (error) {
            throw new Error("Order not found")
        }
        
    }
    _formatOrder(orderModel: OrderModel) : Order{
        const orderItems = orderModel.items.map((item) => {
            return new OrderItem(item.id, item.price, item.name, item.quantity,item.product_id)
        })
        return new Order(orderModel.id, orderModel.customer_id, orderItems)
    }
    async find(id: string): Promise<order> {
       try {
            const orderModel = await OrderModel.findOne({
                where: {id: id},
                include: ["items"],
                rejectOnEmpty: true
            })
           return this._formatOrder(orderModel);
       } catch (error) {
            throw new Error("Order not found")
       }
    }
    async findAll(): Promise<order[]> {
       const ordersModel = await OrderModel.findAll({ include: ["items"] });
       return ordersModel.map((order) => this._formatOrder(order))
    }

}