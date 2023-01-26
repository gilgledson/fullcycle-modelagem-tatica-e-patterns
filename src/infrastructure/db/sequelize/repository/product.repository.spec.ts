import { Sequelize } from "sequelize-typescript"
import Product from "../../../../domain/entity/prodcut"
import ProductModel from "../model/product.model"
import {v4 as uuid} from "uuid";
import ProductRepository from "./product.repository";
import { faker } from '@faker-js/faker';

faker.locale = "pt_BR"

describe("Product repository unit test", () => {
    let sequelize: Sequelize
    const productRepository = new ProductRepository()
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([ProductModel])
        await sequelize.sync();
    })
    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
       
        const id = uuid();
        const product = new Product(id, "Product 01", 10)

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {"id": id}})

        expect(productModel.toJSON()).toStrictEqual({
            "id": id,
            "name": "Product 01",
            "price": 10
        });
    })

    it("shoul update product", async () => {
        const id = uuid()
        const product = new Product(id, "product 01", 10)

        await productRepository.create(product)
        product.changeName("product 02")
        product.changePrice(100)
        await productRepository.update(product)
       
        const productModel = await ProductModel.findOne({where: {"id": id}})
        expect(productModel.toJSON()).toStrictEqual({
            id: id,
            name: "product 02",
            price: 100
        })
    });

    it("should find a product ", async () => {
        const id = uuid()
        const product = new Product(id, "product 01", 100)

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where:{'id': id}});
        const productFound = await productRepository.find(id);

        expect(productModel.toJSON()).toStrictEqual({
            id: productFound.id,
            name: productFound.name,
            price: productFound.price
        })
    })

    it("should find all products", async () => {

        const product1 = new Product(uuid(),faker.commerce.product(), Number(faker.commerce.price()));
        const product2 = new Product(uuid(),faker.commerce.product(), Number(faker.commerce.price()));
        const product3 = new Product(uuid(),faker.commerce.product(), Number(faker.commerce.price()));

        await productRepository.create(product1)
        await productRepository.create(product2)
        await productRepository.create(product3)

        const products = await productRepository.findAll()

        expect(products.length).toBe(3);

        expect(products).toEqual([product1,product2, product3])


    })
})