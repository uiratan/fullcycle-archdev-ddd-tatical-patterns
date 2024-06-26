import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";

export default class ProductFactory {
    static create(type: string, name: string, price: number): ProductInterface {
        switch (type) {
            case "a":
                return new Product(type, name, price);
            case "b":
                return new ProductB(type, name, price);
            default:
                throw new Error("Product type not supported");
        }
    }
}