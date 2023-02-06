import Order from "../../checkout/entity/order";
import Product from "./product";

describe("Product unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let product = new Product("", "product 01", 10);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let product = new Product("1", "", 10);
    }).toThrowError("Name is required");
  });

  it("should throw error when price less than zero", () => {
    expect(() => {
      let product = new Product("1", "product 01", 0);
    }).toThrowError("price is required");
  });

  it("should change name", () => {
    let product = new Product("1", "product 01", 10);
    expect(product.name).toBe("product 01");
    product.changeName("product 02");
    expect(product.name).toBe("product 02");
  });

  it("should  change price", () => {
    let product = new Product("1", "product 01", 10);
    expect(product.price).toBe(10);
    product.changePrice(20);
    expect(product.price).toBe(20);
  });
});
