import { Sequelize } from "sequelize-typescript"
import Customer from "../../../../domain/entity/customer"
import CustomerModel from "../model/customer.model"
import CustomerRepository from "./customer.repository"
import {v4 as uuid } from "uuid";
import { faker } from '@faker-js/faker';
import Address from "../../../../domain/entity/address";


describe("Customer repository unit test", () => {

    let sequelize: Sequelize
    const customerRepository = new CustomerRepository()
    faker.locale = "pt_BR"

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([CustomerModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close()
    })
    
    it("should create a customer", async () => {
        const address = new Address(
            faker.address.street(), 
            Number(faker.address.buildingNumber()), 
            faker.address.zipCode(), 
            faker.address.city(),
            faker.address.county()
        )
         
        const customer = new Customer(uuid(), faker.name.firstName());
        customer.address = address;

        customerRepository.create(customer)

        const customerModel = await CustomerModel.findOne({ where: {id: customer.id}});

        expect(customerModel.toJSON()).toStrictEqual({
                id: customer.id, 
                name: customer.name, 
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                country: customer.address._country,
                active: customer.isActive(),
                rewardPoints: customer.rewardPoints,
                city: customer.address.city
        })

    })

    it("should update a customer", async () => {
        const address = new Address(
            faker.address.street(), 
            Number(faker.address.buildingNumber()), 
            faker.address.zipCode(), 
            faker.address.city(),
            faker.address.county(),
        )
         
        const customer = new Customer(uuid(), faker.name.firstName());
        customer.address = address;
        customerRepository.create(customer)

        customer.changeName(faker.name.firstName())

        customerRepository.update(customer);
        
        const customerModel = await CustomerModel.findOne({ where: {id: customer.id}});

        expect(customerModel.toJSON()).toStrictEqual({
                id: customer.id, 
                name: customer.name, 
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                country: customer.address._country,
                active: customer.isActive(),
                rewardPoints: customer.rewardPoints,
                city: customer.address._city
        });
    })

    it("should find a customer", async () => {
        const address = new Address(
            faker.address.street(), 
            Number(faker.address.buildingNumber()), 
            faker.address.zipCode(), 
            faker.address.city(),
            faker.address.county(),
        )
         
        const customer = new Customer(uuid(), faker.name.firstName());
        customer.address = address;
        customerRepository.create(customer)

        const customerModel = await customerRepository.find(customer.id);
        
        expect(customerModel).toEqual(customer);
    })
    it("should not found a customer", async () => {
        expect( async () => {
            await customerRepository.find(uuid());
        }).rejects.toThrow("Customer not found")
    })
    it("should get all customers", async () => {
        const customer01 = new Customer(uuid(), faker.name.firstName())
        const customer02 = new Customer(uuid(), faker.name.firstName())
        const address01 = new Address(faker.address.street(), Number(faker.address.buildingNumber()), faker.address.zipCode(), faker.address.city(), faker.address.country())
        const address02 = new Address(faker.address.street(), Number(faker.address.buildingNumber()), faker.address.zipCode(), faker.address.city(), faker.address.country())
        customer01.address = address01;
        customer02.address = address02;
        customer02.activate()
       
 
        customer01.addRewardPotins(10)
        customer02.addRewardPotins(100)

        customerRepository.create(customer01)
        customerRepository.create(customer02)

        const customers = await customerRepository.findAll();
        expect(customers).toHaveLength(2)
        expect(customers).toContainEqual(customer01)
        expect(customers).toContainEqual(customer02)
    })
})