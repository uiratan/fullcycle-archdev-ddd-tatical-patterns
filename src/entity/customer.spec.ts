import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
   
    it("should throw error when id is empty", () => {

        // expect(() => new Customer("", "John")).toThrowError("Id is required");
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrowError("Id is required");

    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("1", "");
        }).toThrowError("Name is required");        
    });

    it("should change name", () => {
        // Arrange
        const customer = new Customer("1", "John");
        // Act
        customer.changeName("Jane");
        // Assert
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        // Arrange
        const customer = new Customer("1", "John");
        const address = new Address("Street 1", 1, "00000-000", "City");
        customer.Address = address;
        // Act
        customer.activate();
        // Assert
        expect(customer.isActive()).toBeTruthy();
    });

    it("should deactivate customer", () => {
        // Arrange
        const customer = new Customer("1", "John");
        // Act
        customer.deactivate();
        // Assert
        expect(customer.isActive()).toBeFalsy();
    });


    it("should throw error when address is undefined when you activate a customer", () => {

        expect(() => {
            let customer = new Customer("1", "John");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");

    });

});