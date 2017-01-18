var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/zhangke9569';

module.exports = {
	insertCart: function (req, res, next) {
		//console.log("name " + typeof req.cookies.name);
		if(typeof req.cookies.name !== "undefined"){//登录后才存到数据库
		MongoClient.connect(DB_CONN_STR, function(err, db) {
			console.log("insert success!");
			var collection = db.collection('cartlist');
			req.body["_id"] = "user/" + req.cookies.name;
			console.log(req.body._id);
			collection.save(req.body, function(err, result) {
				if(err) {
					console.log("Error:" + err);
					res.json("Error:" + err);
					return;
				}
				console.log(result.result);
				res.json(result.result);
				db.close();
				
			});
		});
		} else {
			console.log("not login");
			res.json("not login");
		}
	},
	selectCart: function (req, res, next) {//登录后刷新页面加载
		var _id = "user/" + req.body._id;
		console.log(_id);
		MongoClient.connect(DB_CONN_STR, function(err, db) {
			console.log("select success!");
			var collection = db.collection('cartlist');
			var whereStr = {"_id" : _id};
			collection.find(whereStr).toArray(function(err, result) {
				if(err) {
					console.log("Error:" + err);
					res.json("Error:" + err);
					return;
				}
				res.json(result);
				db.close();
			});
		});
	},
	insertOrder: function (req, res, next) {
		if(typeof req.cookies.name !== "undefined"){
			MongoClient.connect(DB_CONN_STR, function(err, db) {
				console.log("insert success");
				var collection = db.collection('order');
				req.body["user"] = "user/" + req.cookies.name;
				console.log(req.body.user);
				collection.save(req.body, function(err, result) {
					if(err) {
						console.log("Error:" + err);
						res.json("Error:" + err);
						return;
					}
					console.log(result.result);
					//res.json(result.result);
					db.close();
				});
			});
		} else {
			console.log("not login");
			res.json("not login");
		}
	},
	selectOrder: function (req, res, next) {
		if(typeof req.cookies.name !== "undefined"){
			var user = "user/" + req.cookies.name;
			console.log(user);
			MongoClient.connect(DB_CONN_STR, function(err, db) {
				console.log("select success!");
				var collection = db.collection('order');
				var whereStr = {"user" : user};
				collection.find(whereStr).toArray(function(err, result) {
					if(err) {
						console.log("Error:" + err);
						res.json("Error:" + err);
						return;
					}
					console.log(result);
					res.json(result);
					db.close();
				});
			});
		} else {
			console.log("not login");
			res.json("not login");
		}
	}
}