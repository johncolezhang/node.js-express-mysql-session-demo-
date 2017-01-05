var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');
//var session = require('express-session');
var checkoutUtil = require('../util/checkoutUtil');
var MongoDao = require('../dao/MongoDao');

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
//	var ujson = {"name" : "Log In" , "item" : "Sign Up"} ;
//	console.log(req.session);
//	if (req.session.sign) {
	res.render('list', {title: '购物车'});
//	}else{
//		res.render('list', ujson);
//	}
});

//登录处理
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

//注册处理
router.post('/registerhandle', function(req, res, next){
	userDao.register(req, res, next);
});

router.get('/home', function(req, res, next){
//	var ujson = {"name" : "Log In" , "item" : "Sign Up"} ;
//	console.log(req.session);
//	if (req.session.sign) {
	res.render('home', {title: '主页'});
//	}else{
//		res.render('home', ujson);
//	}
});

//处理货物
router.get('/producthandle', function(req, res, next) {
	//console.log(2);
	userDao.selectProduct(req, res, next);
});

//处理付款
router.post('/checkouthandle', function(req, res, next) {
	console.log("check post");
	checkoutUtil.sendPost(req, res, next);
});

router.get('/checkouthandle', function(req, res, next) {
	console.log("check get");
	checkoutUtil.sendPost(req, res, next);
});

//加载购物车
router.post('/cartinfo', function(req, res, next) {
	//console.log(req);
	MongoDao.selectData(req, res, next);
});

//存储在mongo
router.post('/savelist', function(req, res, next) {
	MongoDao.insertData(req, res, next);
});

module.exports = router;
