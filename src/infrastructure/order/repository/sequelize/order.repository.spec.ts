import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("123", "123", [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123"
                }
            ]
        });
    });

    it("should update a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
    
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);
    
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);
    
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        //id: string, name: string, price: number, productId: string, quantity: number
    
        const order = new Order("123", "123", [orderItem]);
    
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
    
        const orderItem2 = new OrderItem("2", product.name, product.price, product.id, 2);
    
        order.items.push(orderItem2);
    
        await orderRepository.update(order);
    
        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });
    
        expect(orderModel.toJSON()).toStrictEqual({
          id: "123",
          customer_id: "123",
          total: order.total(),
          items: order.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            order_id: order.id,
            product_id: item.productId,
          })),
        });
      });
    
      it('should find an order', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);
    
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);
    
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("123", customer.id, [orderItem]);
    
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
    
        const foundOrder = await orderRepository.find(order.id);
        expect(foundOrder).toStrictEqual(order);
      });
    
      it('should find all orders', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
    
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);
    
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);
    
    
        const orderItem1 = new OrderItem("1", product.name, product.price, product.id, 2);
        const order1 = new Order("123", customer.id, [orderItem1]);
    
        const orderItem2 = new OrderItem('2', product.name, product.price, product.id, 2)
        const order2 = new Order('456', customer.id, [orderItem2]);
    
        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);
    
        const foundOrders = await orderRepository.findAll();
        const orders = [order1, order2];
    
        expect(foundOrders).toEqual(orders);
      })
    
});