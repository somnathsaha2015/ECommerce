"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var app_service_1 = require('../../services/app.service');
var md5_1 = require('../../vendor/md5');
var ForgotPassword = (function () {
    function ForgotPassword(appService, router) {
        this.appService = appService;
        this.router = router;
        this.subscription = appService.filterOn('post:forgot:password')
            .subscribe(function (d) {
            if (d.data.error) {
                console.log(d.data.error.status);
            }
            else {
                console.log('Success');
            }
        });
    }
    ;
    ForgotPassword.prototype.sendMail = function () {
        var base64Encoded = this.appService.encodeBase64(this.email);
        this.appService.httpPost('post:forgot:password', { auth: base64Encoded });
    };
    ForgotPassword.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ForgotPassword = __decorate([
        core_1.Component({
            templateUrl: 'app/components/forgotPassword/forgotPassword.component.html'
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, router_1.Router])
    ], ForgotPassword);
    return ForgotPassword;
}());
exports.ForgotPassword = ForgotPassword;
//send password component
var SendPassword = (function () {
    function SendPassword(appService, router) {
        this.appService = appService;
        this.router = router;
        this.subscription = appService.filterOn('post:send:password')
            .subscribe(function (d) {
            if (d.data.error) {
                console.log(d.data.error.status);
            }
            else {
                console.log('Success');
            }
        });
    }
    ;
    SendPassword.prototype.sendPassword = function () {
        var code = window.location.search.split('=')[1];
        console.log(code);
        this.appService.httpPost('post:send:password', { auth: code });
    };
    SendPassword.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    SendPassword = __decorate([
        core_1.Component({
            template: "\n  <button (click)=\"sendPassword()\">Send Password</button>\n  "
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, router_1.Router])
    ], SendPassword);
    return SendPassword;
}());
exports.SendPassword = SendPassword;
//change password component
var ChangePassword = (function () {
    function ChangePassword(appService, router) {
        this.appService = appService;
        this.router = router;
        this.subscription = appService.filterOn('post:change:password')
            .subscribe(function (d) {
            if (d.data.error) {
                console.log(d.data.error.status);
            }
            else {
                console.log('Success');
            }
        });
    }
    ;
    ChangePassword.prototype.changePassword = function (oldPwd1, oldPwd2, newPwd) {
        var email = this.appService.getEmail();
        if (oldPwd1 === oldPwd2) {
            var base64Encoded = this.appService.encodeBase64(email + ':' + md5_1.md5(oldPwd1) + ':' + md5_1.md5(newPwd));
            console.log(base64Encoded);
            this.appService.httpPost('post:change:password', { auth: base64Encoded });
        }
    };
    ChangePassword.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ChangePassword = __decorate([
        core_1.Component({
            templateUrl: 'app/components/forgotPassword/changePassword.component.html'
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, router_1.Router])
    ], ChangePassword);
    return ChangePassword;
}());
exports.ChangePassword = ChangePassword;
//# sourceMappingURL=forgotPassword.component.js.map