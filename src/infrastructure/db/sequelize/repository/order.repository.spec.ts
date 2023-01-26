import { faker } from "@faker-js/faker"
import { Sequelize } from "sequelize-typescript"
import Customer from "../../../../domain/entity/customer"
import CustomerModel from "../model/customer.model"
import OrderItemModel from "../model/order-item.model"
import OrderModel from "../model/order.model"
import ProductModel from "../model/product.model"
import OrderRepository from "./order.repository"
import {v4 as uuid} from "uuid";
import Address from "../../../../domain/entity/address"
import CustomerRepository from "./customer.repository"
import ProductRepository from "./product.repository"
import Product from "../../../../domain/entity/prodcut"
import OrderItem from "../../../../domain/entity/order_item"
import Order from "../../../../domain/entity/order"

describe("Order unit test", () => {

    let sequelize: Sequelize
    const orderRepository = new OrderRepository()
    const custoemrRepository = new CustomerRepository()
    const productRepository = new ProductRepository()
    faker.locale = "pt_BR"

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([CustomerModel, ProductModel, OrderModel, OrderItemModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should create a new order', async () => {
        //create customer
        const customer = new Customer(uuid(), faker.name.firstName())
        customer.changeAddress(new Address(
            faker.address.street(),
            Number(faker.address.buildingNumber()), 
            faker.address.zipCode(), 
            faker.address.city(), 
            faker.address.country()
        ));
        await custoemrRepository.create(customer);

        //create product 
        const product = new Product(uuid(), faker.commerce.product(), Number(faker.commerce.price()))
        await productRepository.create(product);
        
        //create new order item
        const orderItem = new OrderItem(uuid(), product.price, product.name, 2, product.id)
        const order = new Order(uuid(), customer.id, [orderItem])

        await orderRepository.create(order);
        
        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total,
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    product_id: orderItem.productId,
                    quantity: orderItem.quantity,
                    price: orderItem.price,
                    order_id: order.id,
                }
            ]
        })
    })
    it('should update a order', async () => {
        const customer = new Customer(uuid(), faker.name.firstName())
        customer.changeAddress(new Address(
            faker.address.street(),
            Number(faker.address.buildingNumber()), 
            faker.address.zipCode(), 
            faker.address.city(), 
            faker.address.country()
        ));
        await custoemrRepository.create(customer);   
          //create product 
        const product = new Product(uuid(), faker.commerce.product(), Number(faker.commerce.price()))
        await productRepository.create(product);


        //create new order item
        const orderItem = new OrderItem(uuid(), product.price, product.name, 2, product.id)
        const orderItem2 = new OrderItem(uuid(), product.price, product.name, 1, product.id)
        const order = new Order(uuid(), customer.id, [orderItem])
  
        await orderRepository.create(order);
        
        order.items.push(orderItem2);

        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({
            where: {id: order.id},
            include: ["items"]
        })
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total,
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    product_id: orderItem.productId,
                    quantity: orderItem.quantity,
                    price: orderItem.price,
                    order_id: order.id,
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    product_id: orderItem2.productId,
                    quantity: orderItem2.quantity,
                    price: orderItem2.price,
                    order_id: orderItem2.id,
                }
            ]
        })

    })

    it('should find a order', async () => {
        const customer = new Customer(uuid(), faker.name.firstName())
        customer.changeAddress(new Address(
            faker.address.street(),
            Number(faker.address.buildingNumber()), 
            faker.address.zipCode(), 
            faker.address.city(), 
            faker.address.country()
        ));
        await custoemrRepository.create(customer);   
        
        //create product 
        const product = new Product(uuid(), faker.commerce.product(), Number(faker.commerce.price()))
        await productRepository.create(product);

        //create new order item
        const orderItem = new OrderItem(uuid(), product.price, product.name, 2, product.id)
        const order = new Order(uuid(), customer.id, [orderItem])
  
        await orderRepository.create(order);
        

        const orderModel = await orderRepository.find(order.id);
        expect(orderModel).toEqual(order);
    })
})