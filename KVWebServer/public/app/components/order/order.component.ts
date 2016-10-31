import { Component } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import { AppService } from '../../services/app.service';

@Component({
  templateUrl: 'app/components/order/order.component.html'
})
export class Order {
  email: string;
  subscription: Subscription;
  constructor(private appService: AppService) {
    // this.subscription = appService.on('httpPost', 'login:authenticate')
    //   .subscribe(d => {
    //     if (d.authenticated) {

    //     }
    //   });
  };
  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}