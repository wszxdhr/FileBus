

  'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// 新增 Todo 项目
router.post('/', function(req, res, next) {
    var user = new AV.User();
    AV.User.logOut().then(function () {
        console.log('登出成功')
        res.json({success: 1})
    });
});

module.exports = router;