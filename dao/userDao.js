// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../config/mysql');
var $sql = require('../model/sqlModel');
var session = require('express-session');

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
            req.session.sign = true;
            req.session.name = result[0].user;
            res.json(JSON.stringify(result[0].user));
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
            console.log(result1);
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
          /*console.log(result.length);
          console.log(result);
          //加载div
          var html = "<div class='content-top'><div class='content-top1'>";
          for(var i = 0; i < result.length; i++){
            //处理显示所有的货物的html
            html += "<div class='col-md-3 col-md2'><div class='col-md1 simpleCart_shelfItem'><a href='#'><img class='img-responsive' src=";
            html += "'" + result[i].product_path + "'";
            html += " alt='' /></a><h3 class='item_id item_name'><a href='#'>";
            html += result[i].product_name;
            html += "</a></h3><div class='price'><h5 class='item_price'>";
            html += "$" + result[i].product_price;
            html += "</h5><a href='#' class='item_add'>Add To Cart</a><div class='clearfix'> </div></div></div></div>";
            //记录所有的货物
          }
          html += "<div class='clearfix'></div></div>";

          

          console.log(html);
          console.log(result[0]);
          console.log(result[1]);
          console.log(result[2]);*/
          console.log("哈哈哈哈");
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