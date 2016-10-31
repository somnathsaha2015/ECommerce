"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('../login/login.component');
var forgotPassword_component_1 = require('../forgotPassword/forgotPassword.component');
var order_component_1 = require('../order/order.component');
var app_service_1 = require('../../services/app.service');
var routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: login_component_1.Login
    },
    {
        path: 'order',
        component: order_component_1.Order,
        canActivate: [app_service_1.LoginGuard]
    },
    {
        path: 'forgot/password',
        component: forgotPassword_component_1.ForgotPassword
    },
    {
        path: 'send/password',
        component: forgotPassword_component_1.SendPassword
    },
    {
        path: 'change/password',
        component: forgotPassword_component_1.ChangePassword,
        canActivate: [app_service_1.LoginGuard]
    },
    {
        path: '**',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
//var Routing = {};
//export var Routing = {};
exports.Routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map