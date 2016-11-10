import { Component } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import { AppService } from '../../services/app.service';

@Component({
    templateUrl: 'app/components/paymentMethod/paymentMethod.component.html'
})
export class PaymentMethod {
   
    subscription: Subscription;
    constructor(private appService: AppService) {
        
    };
    
    ngOnDestroy() {
        //this.subscription.unsubscribe();
    };
}