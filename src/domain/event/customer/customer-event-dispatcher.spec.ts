import EventDispatcher from "../@shared/event-dispatcher";
import SendEmailWhenProductIsCreatedEventHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLogHandler from "./handler/console-log-when-customer-address-is-changed.handler";
import EnviaConsoleLog1Handler from "./handler/console-log-when-customer-is-created-1.handler";
import EnviaConsoleLog2Handler from "./handler/console-log-when-customer-is-created-2.handler";


describe("Customer domain events tests", () => {
    it("should notify CustomerCreatedEvent handlers", () => {
        const eventDispatcher = new EventDispatcher();

        const eventCustomerCreatedHandler1 = new EnviaConsoleLog1Handler();
        const eventCustomerCreatedHandler2 = new EnviaConsoleLog2Handler();

        const spyEventHandler = jest.spyOn(eventCustomerCreatedHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventCustomerCreatedHandler2, "handle");
        
        eventDispatcher.register("CustomerCreatedEvent", eventCustomerCreatedHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventCustomerCreatedHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventCustomerCreatedHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventCustomerCreatedHandler2);

        const event = new CustomerCreatedEvent({
            name: "Customer 1",
            description: "Customer 1 description"
        });

        eventDispatcher.notify(event);

        expect(eventCustomerCreatedHandler1.handle).toHaveBeenCalledWith(event);
        expect(eventCustomerCreatedHandler2.handle).toHaveBeenCalledWith(event);
        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it("should notify CustomerAddressChangedEvent handlers", () => {
        const eventDispatcher = new EventDispatcher();

        const eventCustomerAddressChangedHandler = new EnviaConsoleLogHandler();
    
        const spyEnviaConsoleLogHandler = jest.spyOn(eventCustomerAddressChangedHandler,"handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventCustomerAddressChangedHandler);
    
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventCustomerAddressChangedHandler);
    
        const event = new CustomerAddressChangedEvent({
          id: "1",
          name: "Jhon Doe",
          address: "Street, 321, Zip, City",
        });
    
        eventDispatcher.notify(event);
        expect(eventCustomerAddressChangedHandler.handle).toHaveBeenCalledWith(event);
        expect(spyEnviaConsoleLogHandler).toHaveBeenCalled();
      });

});