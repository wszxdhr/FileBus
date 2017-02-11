'use strict';
var router = require('express').Router();
var AV = require('leanengine');
var realtime = require('leancloud-realtime');

// realtime.config({
//   WebSocket: require('websocket').w3cwebsocket
// });

// 创建实时通信实例（支持单页多实例）
// realtimeObj = AV.realtime({
//     // 是否开启服务器端认证
//     // auth: authFun,

//     // 是否使用其他地区的节点
//     // region: 'us'

// });

// 当 Conversation 被创建时触发，当然你可以使用回调函数来处理，不一定要监听这个事件
// realtimeObj.on('create', function(data) {

    // 向这个 Conversation 添加新的用户
    // conversationObj.add([
    //     'LeanCloud03', 'LeanCloud04'
    // ], function(data) {
    //     console.log('成功添加用户：', data);
    // });

    // 从这个 Conversation 中删除用户
    // conversationObj.remove('LeanCloud03', function(data) {
    //     console.log('成功删除用户：', data);
    // });

    // 向这个 Conversation 中发送消息
    // conversationObj.send({
    //     abc: 123
    // }, function(data) {
    //     console.log('发送的消息服务端已收收到：', data);
    // });

    // setTimeout(function() {
    //     // 查看历史消息
    //     conversationObj.log(function(data) {
    //         console.log('查看当前 Conversation 最近的聊天记录：', data);
    //     });
    // }, 2000);

    // 当前 Conversation 接收到消息
    // conversationObj.receive(function(data) {
    //     console.log('当前 Conversation 收到消息：', data);
    // });

    // 获取当前 Conversation 中的成员信息
    // conversationObj.list(function(data) {
    //     console.log('列出当前 Conversation 的成员列表：', data);
    // });

    // 取得当前 Conversation 中的人数
    // conversationObj.count(function(num) {
    //     console.log('取得当前的用户数量：' + num);
    // });
// });



// 新增 Todo 项目
router.post('/', function(req, res, next) {
    

    var currentUser = AV.User.current();
    if (currentUser) {
        // 跳转到首页
        // console.log(req.body)
        // console.log(currentUser)
        var File = AV.Object.extend('Message');
        // 新建对象
        var file = new File();
        // 设置user
        var userPointer = AV.Object.createWithoutData('_User', currentUser.id);
        file.set('user', userPointer)
        // 设置content
        file.set('content',req.body.content);
        // 设置type
        file.set('type',req.body.type);
        file.save().then(function (result) {
            // console.log('objectId is ' + result.id);
            res.json({success: 1, msg: '发送成功！', err_code: 200, fileId: result.id})
        }, function (error) {
            console.error(error);
            res.json({success: 0, msg: '发送失败！', err_code: 999})
        });
    }
    else {
        //currentUser 为空时，可打开用户注册界面…
        res.json({success: 0, msg: '用户未登录，请登陆后重试~', err_code: 666})
    }
});

module.exports = router;