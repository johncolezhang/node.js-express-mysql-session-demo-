var express = require('express');
var router = express.Router();
var adminDao = require('../dao/adminDao');
//var serverPictureAdd = require('../util/serverPictureAdd');
var crypto = require('crypto');
var common = require('../util/common');

router.get('/', function(req, res, next) {
  if(!Boolean(req.session.user)) {
		res.redirect('/admin/admin_login')
		return
	}
	res.render('admin', {
		user: req.session.user? req.session.user : {}
	})
});

router.get('/admin_login', function(req, res, next) {
	res.render('admin_login', { 
		title: '管理员登录',
		msg: '',
		user: req.session.user? req.session.user : {}
	});
});

router.get('/admin_register', function(req, res, next) {
	res.render('admin_register', { 
		title: '管理员注册',
		msg: '',
		user: req.session.user? req.session.user : {}
	});
});

router.get('/admin_account', function(req, res, next) {
	if(!Boolean(req.session.user)) {
		res.redirect('/admin/admin_login');
		return;
	}
	res.render('admin_account', {
		user: req.session.user? req.session.user : {},
		account_msg: ''
	});
});

/*router.get('/admin_upload', function(req, res, next) {
	if(!Boolean(req.session.user)) {
		res.redirect('/admin/admin_login');
		return;
	}
	res.render('admin_upload', {
		user: req.session.user? req.session.user : {}
	});
});*/

router.get('/admin_products', function(req, res, next) {
	if(!Boolean(req.session.user)) {
		res.redirect('/admin/admin_login');
		return;
	}
	res.render('admin_products', {
		user: req.session.user? req.session.user : {}
	});
});

router.get('/admin_message', function(req, res, next) {
	if(!Boolean(req.session.user)) {
		res.redirect('/admin/admin_login');
		return;
	}
	res.render('admin_message', {
		user: req.session.user? req.session.user : {}
	});
});

router.get('/admin_products_add', function(req, res, next) {
	if(!Boolean(req.session.user)) {
		res.redirect('/admin/admin_login');
		return;
	}
	res.render('admin_products_add', {
		user: req.session.user? req.session.user : {}
	});
});

router.get('/delete_product', function(req, res, next){
	adminDao.delete_product(req, res, next);
});


router.post('/admin_login', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	if(username.length <= 0 || password.length <=0) {
		res.render('admin_login', {
			status: 'fail',
			msg: '用户名或密码不能为空'
		});
		return;
	}

	if(common.containSpecial(username) || common.containSpecial(password)) {
		res.render('login', {
			status: 'fail',
			msg: '用户名和密码不能包含特殊字符'
		});
		return;
	}

	adminDao.login(req, res, next);
	/*req.session.user = {'username': username};
	res.redirect('/admin');*/
});

router.post('/admin_register', function(req, res, next){
	console.log(req);
	var username = req.body.username;
	var password = req.body.password;

	if(username.length <= 0 || password.length <=0) {
		//console.log('注册失败，账号密码不能为空');
		res.render('admin_register', {
			status: 'fail',
			msg: '用户名或密码不能为空'
		});
		return;
	}

	if(common.containSpecial(username) || common.containSpecial(password)) {
		res.render('login', {
			status: 'fail',
			msg: '用户名和密码不能包含特殊字符'
		});
		return;
	}

	adminDao.register(req, res, next);
})

router.post('/admin_products_add', function(req, res, next) {
	//serverPictureAdd.upload_file(req,res,next);
	adminDao.upload_file(req, res, next);
});

router.post('/admin_changePassword', function(req, res, next) {
	var old = req.body.old_password;
	var new1 = req.body.new_password;
	var new2 = req.body.sec_new_password; 

	if(old.length == 0 || new1.length == 0 || new2.length == 0){
		res.render('admin_account', {
		user: req.session.user? req.session.user : {},
		account_msg: '不能为空'
		});
		return;
	}

	if(new1 !== new2) {
		res.render('admin_account', {
		user: req.session.user? req.session.user : {},
		account_msg: '新密码不一致'
		});
		return;
	} else if(old == new1) {
		res.render('admin_account', {
		user: req.session.user? req.session.user : {},
		account_msg: '新密码与旧密码重复'
		});
		return;
	}

	adminDao.changePassword(req, res, next);
});


module.exports = router;