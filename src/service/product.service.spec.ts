import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {

    it("should change the prices of all products", () => {
        // Arrange
        const p1 = new Product("1", "Product 1", 10);
        const p2 = new Product("2", "Product 2", 20);
        const products = [p1, p2];
        
        // Act
        ProductService.increasePrices(products, 100);

        // Assert
        expect(p1.price).toBe(20);
        expect(p2.price).toBe(40);

    });
});