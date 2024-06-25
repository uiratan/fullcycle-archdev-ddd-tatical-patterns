
import Customer from "../../costumer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Product service unit tests", () => {

    it("should place an order", () => {
        // Arrange
        const customer = new Customer("123", "John");
        const item1 = new OrderItem("1", "Item 1", 10, "p1", 1);

        // Act
        const order = OrderService.placeOrder(customer, [item1]);

        // Assert
        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });


    it("should calculate total of all orders", () => {
        // Arrange
        const itens1 = [
            new OrderItem("1", "Item 1", 100, "p1", 2),
            new OrderItem("2", "Item 2", 15, "p2", 1),
            new OrderItem("3", "Item 3", 20, "p3", 1)
        ];
        const o1 = new Order("1", "123", itens1);

        const itens2 = [
            new OrderItem("4", "Item 4", 100, "p4", 2),
            new OrderItem("5", "Item 5", 15, "p5", 1),
            new OrderItem("6", "Item 6", 20, "p6", 1)
        ];
        const o2 = new Order("2", "456", itens2);


        const orders = [o1, o2];

        // Act
        const total = OrderService.total(orders);

        // Assert
        expect(total).toBe(470);
    });

});
