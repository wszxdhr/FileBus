'use strict';
var router = require('express').Router();
var AV = require('leanengine');



// 新增 Todo 项目
router.post('/', function(req, res, next) {
    var currentUser = AV.User.current();
    if (currentUser) {
        // 跳转到首页
        // console.log(req.body)
        // console.log(currentUser)
        var File = new AV.Query('Message');
        // 设置user
        var userPointer = AV.Object.createWithoutData('_User', currentUser.id);
        File.equalTo('user', userPointer);
        File.include('content');
        var files;
        File.find().then(function (result) {
            console.log(result)
            files = result
            res.json({success: 1, files})
        }, function (error) {
            // console.log(error)
            res.json({success: 0, msg: '查询记录失败！错误代码：' + error.code, err_code: error.code})
        })
        
    }
    else {
        //currentUser 为空时，可打开用户注册界面…
        res.json({success: 0, msg: '用户未登录，请登陆后重试~', err_code: 666})
    }
});

module.exports = router;