import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Login,CreateAccount } from '../login/login.component';
import {ForgotPassword, SendPassword, ChangePassword } from '../forgotPassword/forgotPassword.component';
import { Order } from '../order/order.component';
import {LoginGuard} from '../../services/app.service';

const routes: Routes = [
    {
        path: '',
        redirectTo:'/login',
        pathMatch:'full'        
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'order',
        component:Order
        ,canActivate:[LoginGuard]
    },
    {
        path:'forgot/password',
        component:ForgotPassword
    },
    {
        path:'send/password',
        component:SendPassword
    },
    {
        path:'change/password',
        component: ChangePassword
        ,canActivate:[LoginGuard]
    },
    {
        path:'create/account',
        component:CreateAccount
    },
    {
        path:'**',
        redirectTo:'/login',
        pathMatch:'full'
    }    
];
//var Routing = {};
//export var Routing = {};
export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);