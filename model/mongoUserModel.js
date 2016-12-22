var mogoose = require("mongoose");
var Schema = mongoose.Schema;//创建模型
var userSchema = new Schema({
	userid : String,
	password : String
});//定义用户模型
exports.mongouser = mongoose.model('users' , userSchema);//与users进行关联