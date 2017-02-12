// -------------引入模块-------------
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
// var mongoStore = require('connect-mongodb'); //持久会登陆
var mongoStore = require('connect-mongo')(expressSession);        //持久会登陆
var mongoose = require('mongoose');
var multipart = require('connect-multiparty') //上传文件
var sio = require('socket.io'); //即时聊天
var http = require('http');
// 引入数据库模块
var User = require('./app/models/user');
var Friends = require('./app/models/friends');
var ChatHistory = require('./app/models/chatHistory');

// ---------------连接数据库---------
var dbUrl = 'mongodb://localhost/qqApp1'; //数据库的名字，
mongoose.connect(dbUrl,{db:{safe:true}});

// ---------------创建。配置服务--------------
var app = express();
var server = http.createServer(app);
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'headerImg'))) //在html模板中要用到的文件
app.use(bodyParser.urlencoded({
  'extended': true
})); //解释请求中数据body
app.use(bodyParser.json())
app.use(multipart()) //处理文件上传
app.use(cookieParser());
app.use(expressSession({
  'secret': 'qqApp1',
  'resave': false, //添加这行  
  'saveUninitialized': true, //添加这行  
  'store': new mongoStore({ //在数据库中保存session,刷新继续存在
    url: dbUrl,
    collection: 'sessions'
  })
}));

// ---------------监听端口----------------
// var port = process.env.PORT || 4000; //监听的端口
var port = 4000; //监听的端口
server.listen(port);
console.log(" qqApp1.1 run in " + port);


// --------------配置路由-------------
// 退出
app.get('/logout',function(req,res){
  delete req.session.user;
  res.send({sign:1})
})
// 登录
app.post('/login', function(req, res) {
    console.log('开始登录');
    var loginId = req.body.loginId;
    var password = req.body.password;
    User.findOne({
      loginId: loginId
    }, function(err, user) {
      if (err) {
        console.log(err);
      };
      if (!user) {
        console.log('用户不存在');
        res.send({
          sign: 2
        });
      } else {
        user.comparePassword(password, function(err, isMatch) {
          if (err) console.log(err);
          if (isMatch) {
            console.log('登录成功');
            // 记录user
            req.session.user = user;
            res.send({
              sign: 1,
              user: user
            });
          } else {
            console.log('密码不正确');
            res.send({
              sign: 3
            });
          };
        });
      };
    });
  })
  // 注册
app.post('/register', function(req, res) {
    console.log('开始注册');
    var register = req.body.register;
    console.log(register)
    User.findOne({
      loginId: register.loginId
    }, function(err, user) {
      if (err) {
        console.log("findOne error");
      };
      if (user) {
        console.log('账号：' + register.loginId + '--已经存在');
        res.send({
          sign: 2
        });
      } else {
        var _user = new User(register);
        _user.save(function(err, user) {
          if (err) {
            console.log("save error");
          };
          console.log("账号：" + user.loginId + "注册成功")
          res.send({
            sign: 1
          })
        });
      };
    });
  })
  // 添加朋友
app.post('/addFriend', function(req, res) {
    console.log('开始添加')
    var _user = req.session.user;
    var addLoginId = req.body.addLoginId;

    // -判断是否存在这个人-
    User.findOne({
      loginId: addLoginId
    }, function(err, user) {
      if (err) console.log(err);

      if (!user) {
        res.send({
          sign: 2
        });
        console.log('不存在这个人');
      } else {
        // --判断是否已经添加--
        Friends
          .find({
            userId: _user._id
          })
          .populate('friendId')
          .exec(function(err, friends) {
            for (var i = 0, len = friends.length; i < len; i++) {
              if (addLoginId == friends[i].friendId.loginId) {
                break;
              }
            }
            // 已添加
            if (i < len) {
              res.send({sign:3})
              console.log('已添加该好友');
            }
            // 未添加
            else {
                var _friends = new Friends({
                  friendId: user._id,
                  userId: _user._id
                })
              _friends.save(function(err, friends) {
                if (err) console.log(err);
                res.send({sign:1});
                console.log('添加---' + addLoginId + ' ---成功')
              })
            }
          })
      }
    })
  })
  // 获取正在联系的人
app.get('/getCommunicating', function(req, res) {
  var _user = req.session.user;
  var _friends = null;
  var _sign = -1;
  var _chatHistorys = null;
  // 获取friends
  Friends.find({
      userId: _user._id,
      isChating: true
    })
    .populate('friendId')
    .exec(function(err, friends) {
      res.send({sign:1,friends:friends});
    }); 
})
// 获取聊天记录
app.post('/getHistory', function(req, res) {
  var _friendId = req.body.friendId;
  var _user = req.session.user;
  var _chatHistorys = [];
  // 朋友发给自己的
  ChatHistory.find({
      fromUserId: _friendId,
      toUserId: _user._id
    })
    .populate('fromUserId')
    .exec(function(err, chatHistorysT) {
      // 自己发给朋友的
      ChatHistory.find({
          fromUserId: _user._id,
          toUserId: _friendId
        })
        .populate('fromUserId')
        .exec(function(err, chatHistorysF) {
          _chatHistorys = chatHistorysT.concat(chatHistorysF);
          _chatHistorys.sort(function(a, b) {
            return a.time - b.time;
          })
          res.send({
            sign: 1,
            chatHistory: _chatHistorys
          })
        })
    })
})

// ---------------socket.io即时聊天----------------
var io = sio.listen(server);

io.sockets.on('connection', function(socket) {
  console.log("someone connecte")

  socket.on('sendMsg', function(msg, cb) {
    console.log('sendMsg start')
      // 广播信息
    

    var _chatHistory = new ChatHistory(msg);
    _chatHistory.save(function(err,chatHistory){
      if(err) console.log(err);
      ChatHistory.findOne(chatHistory)
                .populate('fromUserId')
                .exec(function(err,_chatHistory){
                  cb(_chatHistory);
                  socket.broadcast.emit('broadcastMsg', _chatHistory);
                })
      console.log('save chatHistory success')
    })
  })
  socket.on('disconnect', function(msg) {
    console.log('断开连接')
  })
});