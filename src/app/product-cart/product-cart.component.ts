import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../models/product';

@Component({
    selector: 'app-product-cart',
    templateUrl: './product-cart.component.html',
    styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

    @Input('product') product: Product;
    @Input('show-action') showAction = true;

    constructor() {
    }

    ngOnInit() {
    }

}
