import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import Address from "../../entity/address";
import CustomerChangeAddressEvent from "./customer/customer-change-address";
import CustomerCreatedEvent from "./customer/customer-created.event";
import SendConsoleLogHandler from "./customer/handler/send-console-log-handler";
import SendConsoleLog1Handler from "./customer/handler/send-console-log1-handler";
import SendConsoleLog2Handler from "./customer/handler/send-console-log2-handler";
import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductCreatedEventHandler from "./product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "./product/product-created.event";

describe("Event dispatcher unit test", () => {
  it("Should register an event handle", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedEventHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });
  it("Should register CustomerCreatedEvent event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler2);
  });
  it("Should notify CustomerCreatedEvent events handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    const spyEvent1 = jest.spyOn(eventHandler1, "handle");
    const spyEvent2 = jest.spyOn(eventHandler2, "handle");
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(2);
    const address = new Address(
      faker.address.street(),
      Number(faker.address.buildingNumber()),
      faker.address.zipCode(),
      faker.address.city(),
      faker.address.country()
    );
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: uuid(),
      name: faker.name.firstName,
      address: address.toJson(),
      rewardPoints: 0,
      active: false,
    });
    eventDispatcher.notify(customerCreatedEvent);
    expect(spyEvent1).toBeCalled();
    expect(spyEvent2).toBeCalled();
  });
  it("Should notify CustomerChangeAddress events handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogHandler();
    const spyEvent = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length
    ).toBe(1);
    const address = new Address(
      faker.address.street(),
      Number(faker.address.buildingNumber()),
      faker.address.zipCode(),
      faker.address.city(),
      faker.address.country()
    );
    const customerChangeAddress = new CustomerChangeAddressEvent({
      id: uuid(),
      name: faker.name.firstName(),
      address: address.toJson(),
      rewardPoints: 0,
      active: false,
    });
    eventDispatcher.notify(customerChangeAddress);
    expect(spyEvent).toBeCalled();
  });
  it("Should register CustomerChangeAddress event handle", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogHandler();
    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]
    ).toMatchObject(eventHandler);
  });
  it("Should notify all events handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedEventHandler();
    const spyEvent = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    const productCreatedEvent = new ProductCreatedEvent({
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    });
    eventDispatcher.notify(productCreatedEvent);
    expect(spyEvent).toBeCalled();
  });

  it("Should unregister an event handle", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedEventHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.unRegister("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });
  it("Should unregister all event handle", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedEventHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.unRegisterAll();
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });
});
