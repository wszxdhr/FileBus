

  'use strict';
var router = require('express').Router();
var AV = require('leanengine');

// 新增 Todo 项目
router.post('/', function(req, res, next) {
    var currentUser = AV.User.current();
    if (currentUser) {
        res.json({success: 1, user: currentUser})
    }
    else {
        res.json({success: 0})
    }
});

module.exports = router;