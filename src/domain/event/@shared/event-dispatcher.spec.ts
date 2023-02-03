import { faker } from "@faker-js/faker";
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
