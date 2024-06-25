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
        // const order = new Order("1", "1", [
        //     new OrderItem("1", "Item 1", 10, "p1", 2),
        //     new OrderItem("2", "Item 2", 15, "p2", 1),
        //     new OrderItem("3", "Item 3", 20, "p3", 1),
        // ]);

        // expect(order.total()).toBe(45);

        const item = new OrderItem("4", "Item 4", 100, "p4", 2);
        const order = new Order("2", "1", [item]);

        let total = order.total();
        expect(total).toBe(200);

        const item2 = new OrderItem("5", "Item 5", 200, "p5", 2);
        const order2 = new Order("2", "1", [item, item2]);
        total = order2.total();
        expect(total).toBe(600);

    });

    it("should throw error if the item quantity is less or equal zero", () => {
        expect(() => {
            const item = new OrderItem("4", "Item 4", 100, "p4", 0);
            const order = new Order("2", "1", [item]);
        }).toThrowError("Quantity must be greater than 0");
    });

});