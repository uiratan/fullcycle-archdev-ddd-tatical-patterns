import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
       
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "1", []);
        }).toThrowError("Id is required");      
    });

    it("should throw error when customer id is empty", () => {
        expect(() => {
            let order = new Order("1", "", []);
        }).toThrowError("CustomerId is required");       
    });

    it("should throw error when items is empty", () => {
        expect(() => {
            let order = new Order("1", "1", []);
        }).toThrowError("Items are required");       
    });

    it("should calculate total", () => {
        const order = new Order("1", "1", [
            new OrderItem("1", "Item 1", 10),
            new OrderItem("2", "Item 2", 15),
            new OrderItem("3", "Item 3", 20),
        ]);

        expect(order.total()).toBe(45);

        const item = new OrderItem("4", "Item 4", 5);
        const item2 = new OrderItem("5", "Item 5", 10);
        const order2 = new Order("2", "1", [item, item2]);
        expect(order2.total()).toBe(15);
    });

});