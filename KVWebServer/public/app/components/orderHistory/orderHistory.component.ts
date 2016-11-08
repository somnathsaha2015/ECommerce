import { Component } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import { AppService } from '../../services/app.service';

@Component({
    templateUrl: 'app/components/orderHistory/orderHistory.component.html'
})
export class OrderHistory {
   
    subscription: Subscription;
    constructor(private appService: AppService) {
        
    };
    
    ngOnDestroy() {
        //this.subscription.unsubscribe();
    };
}