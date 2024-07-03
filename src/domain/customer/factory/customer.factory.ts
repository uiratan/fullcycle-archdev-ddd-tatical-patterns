import { v4 as uuid } from "uuid";
import Customer from "../entity/customer";
import Address from "../value-object/address";

export default class CustomerFactory {

    static create(name: string): Customer {
        return new Customer(uuid(), name);
    }

    public static createWithAddress(name: string, address: Address): Customer {
        const customer = this.create(name);
        customer.changeAddress(address);
        return customer;
    }

}