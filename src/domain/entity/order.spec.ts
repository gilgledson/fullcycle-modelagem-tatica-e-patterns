import Address from "./address";
import Customer from "./customer";
import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit test", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "1", [])
        }).toThrowError("Id is required");
       
    })
    it("should throw error when customer id is empty", () => {
        expect(() => {
            let order = new Order("1", "", [])
        }).toThrowError("customer Id is required");
       
    })
    it("should throw error if the item qte is less or equal zero 0", () => {
        expect(() => {
            let order = new Order("1", "1", [])
        }).toThrowError("Items are required");
       
    })
    it("should calculate total", () => {
        let item1 = new OrderItem("1", 20.0, "produto 1", 2, "p1")
        let item2 = new OrderItem("2", 2.0, "produto 2", 2, "p1")
        let item3 = new OrderItem("3", 2.0, "produto 3", 1, "p1")

        let order = new Order("1", "1", [item1, item2])
        expect(order.total).toBe(44);

        let order2 = new Order("2", "1", [item1, item2, item3])
        expect(order2.total).toBe(46);
    })
    it("should throw error quantity must be greater than 0", () => {
        expect(() => {
            let item = new OrderItem("3", 2.0, "produto 3", -1, "p1")
            let order = new Order("1", "1", [item])
        }).toThrowError("Quantity must be greater than 0");
    })
})