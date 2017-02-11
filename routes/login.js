

  'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// 新增 Todo 项目
router.post('/', function(req, res, next) {
    var user = new AV.User();
    user.setUsername(req.body.username);
    user.setPassword(req.body.password);
    // user.setEmail(email);
    AV.User.logIn(req.body.username, req.body.password).then(function (loginedUser) {
        // 登录成功，跳转到商品 list 页面
        console.log(loginedUser)
        console.log('登陆成功！')
        res.json({success: 1, loginedUser: loginedUser})
    }, function (error) {
        console.log('登录失败: ' + error)
        res.json({success: 0, msg: '', err_code: error.code})
        // alert(JSON.stringify(error));
    });
    // console.log(req.body)
});

module.exports = router;