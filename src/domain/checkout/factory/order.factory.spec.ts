import Order from "../entity/order";
import { v4 as uuid } from "uuid";
import OrderItem from "../entity/order_item";
import { faker } from "@faker-js/faker";
import OrderFactory from "./order.factory";
describe("Order factory unit test", () => {
  faker.locale = "pt_BR";
  it("Should create a new order", () => {
    const props = {
      customerId: uuid(),
      items: [
        {
          name: faker.commerce.product(),
          price: Number(faker.commerce.price()),
          productId: uuid(),
          quantity: 1,
        },
      ],
    };
    const order = OrderFactory.create(props);
    expect(order.id).toBeDefined();
    expect(order.items.length).toBe(1);
  });
});
