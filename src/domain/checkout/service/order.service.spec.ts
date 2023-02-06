import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit test", () => {
  it("should place an order", () => {
    const customer = new Customer("01", "Client o1");
    const orderItem = new OrderItem("01", 10, "produt 01", 1, "01");
    const order = OrderService.placeOrder(customer, [orderItem]);

    expect(order.total).toBe(10);
    expect(customer.rewardPoints).toBe(5);
  });

  it("should get total of all orders", () => {
    const item1 = new OrderItem("1", 100, "Producto 1", 1, "p1");
    const item2 = new OrderItem("2", 200, "Producto 2", 2, "p1");
    const order1 = new Order("0012", "c1", [item1]);
    const order2 = new Order("001", "c1", [item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(500);
  });
});
