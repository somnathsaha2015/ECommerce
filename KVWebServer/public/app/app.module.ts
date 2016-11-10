import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './components/app.component';
import { Login } from './components/login/login.component';
import { CreateAccount } from './components/createAccount/createAccount.component';
import { ForgotPassword, SendPassword, ChangePassword } from './components/managePassword/managePassword.component';
import { Order } from './components/order/order.component';
//import {ChildComponent} from './childComponent';
import { AppService, LoginGuard } from './services/app.service';
//import { LoginGuard } from './services/app.loginGuard';
import { Routing } from './components/routes/app.routes';
import { Profile } from './components/profile/profile.component';
import { Approve } from './components/approve/approve.component';
import { Receipt } from './components/receipt/receipt.component';
import { OrderHistory } from './components/orderHistory/orderHistory.component';
import { ShippingAddress } from './components/shippingAddress/shippingAddress.component';
import { PaymentMethod } from './components/PaymentMethod/PaymentMethod.component';
//import {Route1, Route2, Home} from './app.routes.components';
//import {ComponentStub1} from './componentStub1';

@NgModule({
  imports: [BrowserModule, HttpModule, Routing, FormsModule]
  , declarations: [AppComponent, Login, Order, ForgotPassword
    , SendPassword, ChangePassword, CreateAccount,
    Profile, Approve, Receipt, OrderHistory, ShippingAddress, PaymentMethod]
  , providers: [AppService, LoginGuard]
  , bootstrap: [AppComponent]
})

export class AppModule { }
