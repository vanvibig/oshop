import { Observable } from "rxjs";
import { CategoryService } from "./../../category.service";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-product-form",
    templateUrl: "./product-form.component.html",
    styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
    categories$: Observable<any>;
    keys = [];

    constructor(categoryService: CategoryService) {
        this.categories$ = categoryService.getCategories();
        categoryService.getCategoriesKey().subscribe(res => {
            this.keys = res;
        });
    }

    ngOnInit() {}
}
