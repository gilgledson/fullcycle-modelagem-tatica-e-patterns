import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";
import ProductB from "../entity/product-b";

export default class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number
  ): ProductInterface {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
        break;
      case "b":
        return new ProductB(uuid(), name, price);
        break;
      default:
        throw Error("Product type is not supported !");
        break;
    }
  }
}
