import { faker } from "@faker-js/faker";
import Address from "../../../../domain/customer/object-value/address";
import Customer from "../../../../domain/customer/entity/customer";
import customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "../../model/sequelize/customer.model";
import { v4 as uuid } from "uuid";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zip: entity.address.zip,
      country: entity.address._country,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      city: entity.address.city,
    });
  }
  async update(entity: customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zip: entity.address.zip,
        country: entity.address._country,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async find(id: string): Promise<customer> {
    let customerfound;
    try {
      customerfound = await CustomerModel.findOne({
        where: { id: id },
        rejectOnEmpty: true,
      });
    } catch {
      throw new Error("Customer not found");
    }

    const customer = new Customer(customerfound.id, customerfound.name);
    const address = new Address(
      customerfound.street,
      customerfound.number,
      customerfound.zip,
      customerfound.city,
      customerfound.country
    );
    customer.address = address;

    return customer;
  }
  async findAll(): Promise<customer[]> {
    const customers = await CustomerModel.findAll();
    return customers.map((customerfound) => {
      const customer = new Customer(customerfound.id, customerfound.name);
      customer.addRewardPotins(customerfound.rewardPoints);

      const address = new Address(
        customerfound.street,
        customerfound.number,
        customerfound.zip,
        customerfound.city,
        customerfound.country
      );
      customer.address = address;
      if (customerfound.active) {
        customer.activate();
      }
      return customer;
    });
  }
}
