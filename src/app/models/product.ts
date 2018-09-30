export interface IProduct {
    id: string;
    title: string;
    price: number;
    category: string;
    imageUrl: string;
}

export class Product implements IProduct{
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
