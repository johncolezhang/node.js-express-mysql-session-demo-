// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../config/mysql');
var $sql = require('../model/sqlModel');
//var session = require('express-session');

// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);

var allList = [];//用来记录所有货物

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
  //console.log("第一次res");
  if(typeof ret === 'undefined') {
    res.json({
      code:'1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};
module.exports = {
  selectUser: function (req, res, next) {
    //console.log(req);
    var param = req.body;
    console.log(param.uname + " " + param.upwd);
    if(param.uname == "" || param.upwd == "") {
      jsonWrite(res, undefined);
      console.log("没有输入参数");
      return;
    }
    pool.getConnection(function(err, connection) {
        connection.query($sql.selectuser, [param.uname, param.upwd],function(err, result) {
          if(result[0] != null) {
            console.log(result[0].user);
            console.log("查询成功");
            //req.session.sign = true;
            //req.session.name = result[0].user;
            console.log(result[0].user);
            res.json(result[0].user);
            //res.render('home', {content: ujson}); // 第二个参数可以直接在jade中使用
        } else {
          console.log("账号或密码错误");
            res.json(false);
        }
        //jsonWrite(res, result);
        connection.release();
      });
    });
  },

  register: function (req, res, next) {
    var param = req.body;
    var bool = 0;
    console.log(param.uname + " " + param.upwd);
    if(param.uname == "" || param.upwd == ""){
      jsonWrite(res, undefined);
      console.log("没有输入参数");
      return;
    }
    //检查是否已注册
    pool.getConnection(function(err, connection) {
      connection.query($sql.existuser, param.uname, function(err, result) {
        console.log(result);
        if(result == null){
          res.json(false);
        }else{
          connection.query($sql.signupuser, [param.uname, param.upwd], function(err1, result1) {
            //console.log(result1);
            res.json(param.uname);
          });
        }
      connection.release();
      });
    });
  },

  selectProduct: function (req, res, next) {
    //console.log(1);
    pool.getConnection( function(err, connection) {
        connection.query($sql.selectproduct, function(err, result) {
          res.json(result);
          connection.release();
        });
    });
  },

  list: function (req, res, next) {
    pool.getConnection( function(err, connection) {
      connection.query($sql.selectproduct, function(err, result) {

      });
    });
  }
};