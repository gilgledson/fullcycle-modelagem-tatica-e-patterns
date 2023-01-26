export default class OrderItem {
    private _id: string;
    private _productId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(id: string, price: number, name: string, quatity: number, productId: string){
        this._id = id;
        this._price = price
        this._name = name;
        this._quantity = quatity;
        this._productId = productId;
    }
    get name(): string {
        return this._name;
    }
    get productId(): string {
        return this._productId;
    }
    get id(): string {
        return this._id;
    }
    get quantity(): number {
        return this._quantity;
    }
    get price(): number {
        return this._price;
    }
    get total(): number {
        return this._price * this._quantity;
    }
}