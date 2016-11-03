import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Login} from '../login/login.component';
import {CreateAccount } from '../createAccount/createAccount.component';
import {ForgotPassword, SendPassword, ChangePassword } from '../managePassword/managePassword.component';
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
export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);