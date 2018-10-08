import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {Subscription} from 'rxjs';
import {Product} from '../../../shared/models/product';
import {MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

    products: Product[];
    filterdProducts: any[] = [];
    displayedColumns: string[] = ['title', 'price', 'edit'];
    sortedData;
    subscription: Subscription;
    dataSource;

    // MatPaginator Inputs
    length = 100;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private productService: ProductService
    ) {
        this.subscription = this.productService.getAll()
            .subscribe(
                (products) => {
                    this.filterdProducts = this.products = products.map((product: any) => {
                        return new Product(
                            product.key,
                            product.data.title,
                            product.data.price,
                            product.data.category,
                            product.data.imageUrl);
                    });
                    this.dataSource = new MatTableDataSource(this.filterdProducts);
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator;
                    this.length = this.filterdProducts.length;
                }
            );
    }

    sortData(sort: Sort) {
        const data = this.filterdProducts.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }

        this.sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'title':
                    return this.compare(a.title, b.title, isAsc);
                case 'price':
                    return this.compare(a.price, b.price, isAsc);
                case 'category':
                    return this.compare(a.category, b.category, isAsc);
                case 'imageUrl':
                    return this.compare(a.imageUrl, b.imageUrl, isAsc);
                case 'id':
                    return this.compare(a.id, b.id, isAsc);
                default:
                    return 0;
            }
        });
    }

    compare(a, b, isAsc) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    filter(query: string) {
        this.filterdProducts = (query) ?
            this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
            this.products;

        this.dataSource = new MatTableDataSource(this.filterdProducts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
