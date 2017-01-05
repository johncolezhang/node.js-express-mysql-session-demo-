var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/cartlist';

module.exports = {
	insertData: function (req, res, next) {
		//console.log("name " + typeof req.cookies.name);
		if(typeof req.cookies.name !== "undefined"){//登录后才存到数据库
		MongoClient.connect(DB_CONN_STR, function(err, db) {
			console.log("connect success!");
			var collection = db.collection('tb1');
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
	selectData: function (req, res, next) {
		var _id = "user/" + req.body._id;
		console.log(_id);
		MongoClient.connect(DB_CONN_STR, function(err, db) {
			console.log("select connect success!");
			var collection = db.collection('tb1');
			var whereStr = {"_id" : _id};
			collection.find(whereStr).toArray(function(err, result) {
				if(err) {
					console.log("Error:" + err);
					res.json("Error:" + err);
					return;
				}
				//console.log(result);
				res.json(result);
				db.close();
			});
		});
	},
	updateData: function (req, res, next) {
		MongoClient.connect(DB_CONN_STR, function(err, db) {
			console.log("connect success!");
			var collection = db.collection('tb1');
			var whereStr = {"name" : "zk"};
			var updateStr = {"age" : 100};
			collection.update(whereStr, updateStr, function(err, result){
				if(err){
					console.log("Error:" + err);
					res.json("Error:" + err);
					return;
				}
				console.log(result);
				res.json(result);
				db.close();

			});
		});
	},
	delData: function (req, res, next) {
		MongoClient.connect(DB_CONN_STR, function(err, db) {
			console.log("connect success!");
			var collection = db.collection('tb1');
			var whereStr = {"name" : "zq"};
			collection.remove(whereStr, function(err, result){
				if(err){
					console.log("Error:" + err);
					res.json("Error:" + err);
					return;
				}
				console.log(result);
				res.json(result);
				db.close();
			});
		});

	},
	invokeProcData: function (req, res, next) {
		MongoClient.connect(DB_CONN_STR, function(err, db) {
			console.log("connect success!");
			db.eval("get_tb1_count()", function(err, result) {
				if(err){
					console.log("Error:" + err);
					res.json("Error:" + err);
					return;
				}
				console.log(result);
				res.json(result);
				db.close();
			});
		});
	}
}