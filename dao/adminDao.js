// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../config/mysql');
var $sql = require('../model/sqlModel');
var picture = require('../util/pictureUtil');
var pool  = mysql.createPool($conf.mysql);

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

exports.login = function (req, res, next) {
	var param = req.body;
    /*console.log(param.uname + " " + param.upwd);
    if(param.uname == "" || param.upwd == "") {
      jsonWrite(res, undefined);
      console.log("没有输入参数");
      return;
    }*/
    pool.getConnection(function(err, connection) {
        connection.query($sql.selectadmin, [param.username, param.password],function(err, result) {
          if(result[0] != null) {
            //console.log(result[0].admin);
            //console.log("查询成功");
            //req.session.sign = true;
            //req.session.name = result[0].user;
            //console.log(result[0].admin);
            //res.json(result[0].admin);
            req.session.user = {'username': result[0].admin};
            res.redirect('/admin');
            //res.render('home', {content: ujson}); // 第二个参数可以直接在jade中使用
        } else {
          console.log("账号或密码错误");
            res.render('admin_login',{
            status: 'fail',
            msg: '账号或密码错误',
            user: {}
          });
        }

        //jsonWrite(res, result);
        connection.release();
      });
    });
}

exports.register = function (req, res, next) {
	var param = req.body;
    //var bool = 0;
    console.log(param.username + " " + param.password);
    /*if(param.uname == "" || param.upwd == ""){
      jsonWrite(res, undefined);
      console.log("没有输入参数");
      return;
    }*/
    //检查是否已注册
    pool.getConnection(function(err, connection) {
      connection.query($sql.existadmin, param.username, function(err, result) {
        //console.log(typeof result);
        if(result instanceof Object){
          console.log('注册失败，用户名重复');
          res.render('admin_register',{
            status: 'fail',
            msg: '用户已被注册',
            user: {}
          });
        } else {
          connection.query($sql.signupadmin, [param.username, param.password], function(err1, result1) {
            //console.log(result1);
            res.redirect('/admin/admin_login');
          });
        }
      connection.release();
      });
    });
}

exports.upload_file = function (req, res, next) {
    var param = req.body;
    var path_name1 = req.files[0].originalname;
    var path_name2 = req.files[1].originalname;
    var path_name3 = req.files[2].originalname;
    var path_name4 = req.files[3].originalname;  
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query($sql.add_priture_array, 
        [
          param.product_name,
          param.product_price,
          "/images/" + path_name1,
          "/images/" + path_name2,
          "/images/" + path_name3,
          "/images/" + path_name4
        ],
         function(err, rows) {
          if (err) throw  err;
            picture.upload_file(req,res,next);
        });
        //回收pool
        connection.release();
    });
}

exports.delete_product = function (req, res, next) {
    //console.log(req);
    var product_name = req.query.product_name;
    //console.log(product_name);
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query($sql.delete_product,[product_name,product_name], function(err, result) {
            if (err) throw  err;
            //console.log(result);
            //var i = 1;
            //console.log(result[0]);
            //var tmp = result[0];
            //console.log(tmp[0]);
            //console.log(tmp[0]['product_path' + i]);
            //console.log(tmp['product_path' + i]);
            picture.delete_file(result[0],res,next);
            //res.redirect('/admin/admin_products');
        });
        //回收pool
        connection.release();
    });
}

exports.changePassword = function (req, res, next) {
  //console.log(req);
  res.render('admin_account', {
    user: req.session.user? req.session.user : {},
    account_msg: '********'
    });
}