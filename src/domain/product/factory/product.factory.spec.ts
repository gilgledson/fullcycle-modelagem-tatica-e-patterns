import ProductFactory from "./product.factory";
import { faker } from "@faker-js/faker";

describe("Product factory unit test", () => {
  faker.locale = "pt_BR";
  it("Should create a product type a", () => {
    const name = faker.commerce.productName();
    const price = Number(faker.commerce.price());
    const product = ProductFactory.create("a", name, price);
    expect(product.id).toBeDefined();
    expect(product.name).toBe(name);
    expect(product.price).toBe(price);
    expect(product.constructor.name).toBe("Product");
  });
  it("Should create a product type b", () => {
    const name = faker.commerce.productName();
    const price = Number(faker.commerce.price());
    const product = ProductFactory.create("b", name, price);
    expect(product.id).toBeDefined();
    expect(product.name).toBe(name);
    expect(product.price).toBe(price * 2);
    expect(product.constructor.name).toBe("ProductB");
  });
  it("Should throw error when  product type is not suportted", () => {
    const name = faker.commerce.productName();
    const price = Number(faker.commerce.price());
    expect(() => ProductFactory.create("c", name, price)).toThrowError(
      "Product type is not supported"
    );
  });
});
