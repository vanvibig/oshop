import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../order.service';
import {AuthService} from '../../auth.service';

@Component({
    selector: 'app-admin-orders',
    templateUrl: './admin-orders.component.html',
    styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

    order$;

    constructor(
        private orderService: OrderService,
        private authService: AuthService
    ) {
        this.authService.user$.subscribe(
            user => {
                this.order$ = this.orderService.getOrdersByUser(user.uid);
            }
        );
    }

    ngOnInit() {
    }

}
