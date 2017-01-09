var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var session = require('express-session');

var ueditor = require('ueditor');
var index = require('./routes/index');
var users = require('./routes/users');
//var login = require('./views/login.html');
//var register = require('./views/register.html');

//var session = require('express-session');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//set session
/*app.use(session({
	secret: 'secret',
	cookie: {maxAge: 1000*60*30}//session30分钟长度
}));*/

/*
app.use(function(req, res, next){
	res.locals.user = req.session.user;//从session获取user对象
	var err = req.session.error;//获取错误信息
	res.locals.message = "";
	if(err){
		res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'
		+err+'</div>';
	}
	next();//中间传递
});
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.engine("html", require("ejs".__express));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//public为文件路径
app.use(express.static(path.join(__dirname, 'public')));

//ueditor插件
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    //客户端上传文件设置
     var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = '/images/ueditor/';//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//public为文件路径
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);//设置路由
app.use('/users', users);
app.use('/login', index);
app.use('/register', index);
app.use('/home', index);
app.use('/logout', index);
app.use('/ueditor', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.listen(3000);
