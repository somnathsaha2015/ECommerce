"use strict";
var handler = require('./handler');
var express = require('express');
var router = express.Router();
var config, def, messages, data;
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

router.init = function (app) {
    config = app.get('config');
    def = app.get('def');
    messages = app.get('messages');
    data = { action: 'init', conn: config.connString.replace('@dbName', config.dbName) }
    handler.init(app, data);
}

router.post('/api/validate/token', function (req, res, next) {
    try {
        var ret = false;
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.jwtKey, function (error, decoded) {
                if (!error) {
                    ret = true;
                }
                res.status(200).send(ret);
            });
        } else {
            err = new def.NError(400, messages.errTokenNotFound, messages.messTokenNotFound);
            next(err);
        }
    } catch (err) {
        let err = new def.NError(500, messages.errInternalServerError, messages.errInternalServerError);
        next(err);
    }
});

//authenticate
router.post('/api/authenticate', function (req, res, next) {
    try {
        let auth = req.body.auth;
        let err;
        if (auth) {
            var data = { action: 'authenticate', auth: auth };
            handler.edgePush(res, next, 'authenticate', data);
        }
        else {
            err = new def.NError(404, messages.errAuthStringNotFound, messages.messAuthStringinPostRequest);
            next(err);
        }
    } catch (err) {
        let err = new def.NError(500, messages.errInternalServerError, messages.errInternalServerError);
        next(err);
    }
});

//forgot password url
router.post('/api/send/password', function (req, res, next) {
    try {
        let auth = req.body.auth;
        if (auth) {
            jwt.verify(auth, config.jwtKey, function (error, decoded) {
                if (error) {
                    res.status(406).send(false);
                } else {
                    var random = crypto.randomBytes(4).toString('hex');
                    var htmlBody = config.sendPasswordMailBody.replace('@pwd', random).replace('@url', config.host);
                    handler.sendMail(res, next, decoded, null, htmlBody);
                }
            });
        } else {
            res.status(404).send(false);
        }
    } catch (err) {
        let err = new def.NError(500, messages.errInternalServerError, messages.errInternalServerError);
        next(err);
    }
});

//forgot password
router.post('/api/forgot/password', function (req, res, next) {
    try {
        let auth = req.body.auth;
        if (auth) {
            let email = Buffer.from(auth, 'base64').toString();
            var data = { action: 'isEmailExist', email: email };
            //verify email if it exists and then send url to the verified mail
            handler.edgePush(res, next, 'forgotPassowrd', data);
        } else {
            let err = new def.NError(404, messages.errAuthStringNotFound, messages.messAuthStringinPostRequest);
            next(err);
        }
    } catch (err) {
        let err = new def.NError(500, messages.errInternalServerError, messages.errInternalServerError);
        next(err);
    }
});

router.all('/api*', function (req, res, next) {
    // implementation for token verification
    try {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.jwtKey, function (error, decoded) {
                if (error) {
                    let err = new def.NError(401, messages.errInvalidToken, messages.messInvalidToken);
                    next(err);
                }
                else {
                    user = decoded;
                    req.user = user;
                    next();
                }
            });
        }
        else {
            err = new def.NError(400, messages.errTokenNotFound, messages.messTokenNotFound);
            next(err);
        }
    } catch (err) {
        let err = new def.NError(500, messages.errInternalServerError, messages.errInternalServerError);
        next(err);
    }
});

//change password. auth is base64(email:hashOfOldPassword:hashOfNewPassword)
router.post('/api/change/password', function (req, res, next) {
    try {
        let auth = req.body.auth;
        if (auth) {
            var data = { action: 'changePassword', auth: auth };
            handler.edgePush(res, next, 'changePassword', data);
        } else {
            let err = new def.NError(404, messages.errAuthStringNotFound, messages.messAuthStringinPostRequest);
            next(err);
        }
    } catch (err) {
        let err = new def.NError(500, messages.errInternalServerError, messages.errInternalServerError);
        next(err);
    }
});
router.get('/api/order', function (req, res) {
    console.log('send order');
    res.json({ date: 'This is order' });
});
// apiRouter.post('/sale', function (req, res, next) {
//     var user = req.user;
//     var data = { "action": "addSales", authorize: { apiApplicationName: 'sale', httpMethod: req.method, user: user }, innerData: { sale: req.body } };
//     util.processRequest(data, res, next, null);
// });
//}
module.exports = router;
