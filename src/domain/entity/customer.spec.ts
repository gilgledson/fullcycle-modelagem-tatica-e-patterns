import Address from "./address";
import Customer from "./customer";
import {v4 as uuid} from "uuid";
import { faker } from '@faker-js/faker';

describe("Customer unit test", () => {
    
    it("should add reward points", () => {
        const customer = new Customer(uuid(),"customer 01")
        expect(customer.rewardPoints).toBe(0)

        customer.addRewardPotins(10)
        expect(customer.rewardPoints).toBe(10)
        
        customer.addRewardPotins(10)
        expect(customer.rewardPoints).toBe(20)

    })

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "jonh")
        }).toThrowError("Id is required");
       
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "")
        }).toThrowError("Name is required");
       
    })

    it("should throw error when change name", () => {
        expect(() => {
            let customer = new Customer("123", "")
        }).toThrowError("Name is required");
       
    })

    it("should change name", () => {
        let customer = new Customer("123", "jonh")
        customer.changeName("jane")
        expect(customer.name).toBe("jane")
    })

    it("should activete customer", () => {
        let customer = new Customer("123", "jonh")
        const address02 = new Address(faker.address.street(), Number(faker.address.buildingNumber()), faker.address.zipCode(), faker.address.city(), faker.address.country())

        customer.address = address02;
        customer.activate()

        expect(customer.isActive()).toBe(true)
    })

    it("should throw erro when address underfined", () => {
        let customer = new Customer("123", "jonh")
        expect(()=> {
            customer.activate()
        }).toThrowError("Address is mandatory to activate a customer")
    })

    it("should deactivete customer", () => {
        let customer = new Customer("123", "jonh")
        
        customer.deactivate()

        expect(customer.isActive()).toBe(false)
    })
})