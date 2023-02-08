import Order from "../entity/order";
import { v4 as uuid } from "uuid";
import OrderItem from "../entity/order_item";
interface OrderFactoryProps {
  customerId: string;
  items: {
    name: string;
    price: number;
    productId: string;
    quantity: number;
  }[];
}
export default class OrderFactory {
  public static create(props: OrderFactoryProps): Order {
    const items = props.items.map(
      (item) =>
        new OrderItem(
          uuid(),
          item.price,
          item.name,
          item.quantity,
          item.productId
        )
    );
    return new Order(uuid(), props.customerId, items);
  }
}
