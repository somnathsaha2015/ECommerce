import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/subscription';
import { AppService } from '../../services/app.service';

@Component({
  templateUrl: 'app/components/createAccount/createAccount.component.html'
})
export class CreateAccount {
  email: string;
  subscription: Subscription;
  constructor(private appService: AppService, private router: Router) {
  this.subscription = appService.filterOn('post:create:account')
      .subscribe(d => {
        console.log(d);
        if(d.data.error){
          console.log(d.data.error.status)
          appService.resetCredential();          
        } else {
          console.log(d.data.token);          
        }
      });
  };
  createAccount(pwd, confirmPwd) {
    
  };
  ngOnDestroy() {
    this.subscription.unsubscribe();
  };
}
