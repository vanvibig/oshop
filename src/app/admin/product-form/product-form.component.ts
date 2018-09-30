import {Observable} from 'rxjs';
import {CategoryService} from './../../category.service';
import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {ProductService} from '../../product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
    categories$;
    product: any = {};
    id;

    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.categories$ = categoryService.getCategories();

        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.productService.get(this.id).subscribe(
                res => {
                    this.product = res;
                }
            );
        }
    }

    ngOnInit() {
    }

    save(product) {
        if (this.id) {
            this.productService.update(this.id, product);
        } else {
            this.productService.create(product);
        }
        this.router.navigate(['/admin/products']);
    }
}
