var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '主页' });
});

router.get('/login', function(req, res, next){
	res.render('login', {title: ' 登录'});
});

router.post('/loginhandle', function(req, res, next){
	//console.log(req.body);//输出的参数
	userDao.selectUser(req, res, next);
});

router.get('/loginhandle', function(req, res, next){
	userDao.selectUser(req, res, next);
});

router.get('/register', function(req, res, next){
	res.render('register', {title: '注册'});
});

router.get('/home', function(req, res, next){
	var ujson = {"name" : "zq"} ;
	console.log(req.session);
	if (req.session.sign) {
	res.render('home', {"name" : req.session.name});
	}else{
		res.render('home', ujson);
	}
})

router.get('/sess', function(req, res){
	if (req.session.sign) {//检查用户是否已经登录
		console.log(req.session);//打印session的值
		res.send('welecome <strong>' + req.session.name + '</strong>, 欢迎你再次登录');
	} else {//否则展示index页面
		req.session.sign = true;
		req.session.name = '汇智网';
		res.end('欢迎登陆！');
	}
});

module.exports = router;
