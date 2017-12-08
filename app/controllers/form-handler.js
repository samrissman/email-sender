var awsUpload = require('./src/js/aws-bucket.js');
// expose this function to our app using module.exports
var exports = module.exports = {};

exports.validateInputs = function() {

}

exports.fileInput = function(req, res) {
	uploadFile(req.file);
}