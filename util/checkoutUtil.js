module.exports = {
	sendPost : function(req, res, next) {
		console.log(req.body);
		res.json('success');
	}
};