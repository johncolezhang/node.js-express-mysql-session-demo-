var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '主页' });
});

router.get('/login', function(req, res, next) {
	res.render('login', {title: ' 登录'});
});

router.get('listhandle', function(req, res, next) {
	userDao.list(req, res, next);
});

router.get('/list', function(req, res, next){
	var ujson = {"name" : "Log In" , "item" : "Sign Up"} ;
	console.log(req.session);
	if (req.session.sign) {
	res.render('list', {"name" : req.session.name , "item" : "Change Password"});
	}else{
		res.render('list', ujson);
	}
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

router.post('/registerhandle', function(req, res, next){
	userDao.register(req, res, next);
});

router.get('/home', function(req, res, next){
	var ujson = {"name" : "Log In" , "item" : "Sign Up"} ;
	console.log(req.session);
	if (req.session.sign) {
	res.render('home', {"name" : req.session.name , "item" : "Change Password"});
	}else{
		res.render('home', ujson);
	}
});

router.get('/producthandle', function(req, res, next) {
	console.log(2);
	userDao.selectProduct(req, res, next);
});

module.exports = router;
