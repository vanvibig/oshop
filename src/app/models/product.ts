export interface IProduct {
    id: string;
    title: string;
    price: number;
    category: string;
    imageUrl: string;
}

export class Product implements IProduct {
    public id: string;
    public title: string;
    public price: number;
    public category: string;
    public imageUrl: string;

    constructor(id: string, title: string, price: number, category: string, imageUrl: string) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.imageUrl = imageUrl;
    }
}

export class ProductBase {
    public title: string;
    public price: number;
    public category: string;
    public imageUrl: string;

    constructor(product: Product) {
        this.title = product.title;
        this.price = product.price;
        this.category = product.category;
        this.imageUrl = product.imageUrl;
    }
}

