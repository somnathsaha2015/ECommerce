import { Component } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import { AppService } from '../../services/app.service';

@Component({
    templateUrl: 'app/components/profile/profile.component.html'
})
export class Profile {
   
    subscription: Subscription;
    constructor(private appService: AppService) {
        
    };
    
    ngOnDestroy() {
        //this.subscription.unsubscribe();
    };
}