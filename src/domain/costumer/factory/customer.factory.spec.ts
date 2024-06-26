import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {

    it("should create a customer", () => {
        const customer = CustomerFactory.create("John");
        expect(customer.id).toBeDefined;
        expect(customer.name).toBe("John");
        expect(customer.Address).toBeUndefined;
    });

    it("should create a customer with an address", () => {
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        const customer = CustomerFactory.createWithAddress("John", address);
        
        expect(customer.id).toBeDefined;
        expect(customer.name).toBe("John");
        expect(customer.Address).toEqual(address);
    });

    // it("should throw an error when id is empty", () => {
    //     expect(() => {
    //         CustomerFactory.create("", "John");
    //     }).toThrowError("Id is required");
    // });

    // it("should throw an error when name is empty", () => {
    //     expect(() => {            
    //         CustomerFactory.create("123", "");  
    //     }).toThrowError("Name is required");
    // });
})