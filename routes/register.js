'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// 新增 Todo 项目
router.post('/', function(req, res, next) {
    var user = new AV.User();
    user.setUsername(req.body.username);
    user.setPassword(req.body.password);
    // user.setEmail(email);
    user.signUp().then(function (loginedUser) {
        // 注册成功，跳转到商品 list 页面
        console.log(loginedUser)
        console.log('注册成功')
        res.json({success: 1, loginedUser: loginedUser})
    }, (function (error) {
        console.log('注册失败: ' + error)
        res.json({success: 0, msg: '', err_code: error.code})
    }));
    
});

module.exports = router;
