import { Component } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import { AppService } from '../../services/app.service';

@Component({
    templateUrl: 'app/components/shippingAddress/shippingAddress.component.html'
})
export class ShippingAddress {
   
    subscription: Subscription;
    constructor(private appService: AppService) {
        
    };
    
    ngOnDestroy() {
        //this.subscription.unsubscribe();
    };
}