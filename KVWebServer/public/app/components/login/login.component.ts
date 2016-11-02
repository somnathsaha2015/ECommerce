import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/subscription';
import { AppService } from '../../services/app.service';
import { md5 } from '../../vendor/md5';

@Component({
  templateUrl: 'app/components/login/login.component.html'
})
export class Login {
  email: string;
  subscription: Subscription;
  constructor(private appService: AppService, private router: Router) {
    this.subscription = appService.filterOn('post:authenticate')
      .subscribe(d => {
        console.log(d);
        if(d.data.error){
          console.log(d.data.error.status)
          localStorage.removeItem('token');
          this.appService.resetEmail();
        } else {
          console.log(d.data.token);
          localStorage.setItem('token', d.data.token);
          this.appService.setEmail(this.email);
          this.router.navigate(['order']);
        }
      }
      );
  };
  authenticate(pwd) {
    let base64Encoded = this.appService.encodeBase64(this.email + ':' + md5(pwd));
    console.log('md5:' + md5(pwd));
    console.log(base64Encoded);
    this.appService.httpPost('post:authenticate', { auth: base64Encoded });
  };
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

@Component({
  templateUrl: 'app/components/login/createAccount.component.html'
})
export class CreateAccount {
  email: string;
  constructor(private appService: AppService, private router: Router) {
  
  };
  createAccount(pwd, confirmPwd) {
    
  };
  ngOnDestroy() {
    //this.subscription.unsubscribe();
  };
}
