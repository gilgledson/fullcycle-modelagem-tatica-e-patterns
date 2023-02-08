import { faker } from "@faker-js/faker";
import Address from "../object-value/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  faker.locale = "pt_BR";
  it("Should create a new customer", () => {
    const name = faker.name.firstName();
    const customer = CustomerFactory.create(name);
    expect(customer.id).toBeDefined();
    expect(customer.address).toBeUndefined();
    expect(customer.name).toBe(name);
  });
  it("Should create a new customer with address", () => {
    const name = faker.name.firstName();
    const address = new Address(
      faker.address.street(),
      Number(faker.address.buildingNumber()),
      faker.address.zipCode(),
      faker.address.city(),
      faker.address.country()
    );
    const customer = CustomerFactory.createWithAddress(name, address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe(name);
    expect(customer.address).toBe(address);
  });
});
