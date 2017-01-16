var mogoose = require("mongoose");
var config = require("../config/mongo.js");
mongoose.connect(config.host + config.db);

var MessageSchema = new mongoose.Schema({
	name: { type: String },
	email: { type: String },
	subject: { type: String },
	message: { type: String },
	create_at: { type: Date, default: Date.now }
});//message

mongoose.model('Message', MessageSchema);
exports.Message = mongoose.model('Message');

var ProjectSchema = new mongoose.Schema({
	name: { type: String },
	intro: { type: String },
	imgs: { type: [] },
	create_at: { type: Date, default: Date.now }
});//project

mongoose.model('Project', ProjectSchema);
exports.Project = mongoose.model('Project');

var SubPageSchema = new mongoose.Schema({
	title: { type: String },
	content: { type: String }
});//subpage

mongoose.model('SubPage', SubPageSchema);
exports.SubPage = mongoose.model('SubPage');

var UserSchema = new mongoose.Schema({
	username: { type: String },
	password: { type: String },
	power: { type: Number, default: -1},
	create_at: { type: Date, default: Date.now }
});//user

mongoose.model('User', UserSchema);
exports.User = mongoose.model('User');