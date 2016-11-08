import { Component } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import { AppService } from '../../services/app.service';

@Component({
    templateUrl: 'app/components/approve/approve.component.html'
})
export class Approve {
   
    subscription: Subscription;
    constructor(private appService: AppService) {
        
    };
    
    ngOnDestroy() {
        //this.subscription.unsubscribe();
    };
}