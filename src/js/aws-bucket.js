var dotenv = require('dotenv/config');
var AWS = require('aws-sdk')
AWS.config.update({
	accessKeyId: process.env.S3ID,
    secretAccessKey: process.env.S3KEY,
    region: 'ap-northeast-1'});
var bucketName = user = process.env.bucketName
var s3 = new AWS.S3({apiVersion: '2006-03-01'});
var s3Bucket = new AWS.S3( { params: {Bucket: bucketName} } );
var fs = require('fs');
var async = require('async');
var path = require("path");

var directoryName = './src/img';

uploadFile(directoryName);

function uploadFile(directoryName) {
	var directoryPath = path.resolve(directoryName);

	fs.readdir(directoryName, (err, files) => {
	  files.forEach(file => {
	    
	  	var directoryFiles = fs.readdirSync(directoryPath);
			async.map(directoryFiles, function (f, cb) {
			    var filePath = path.join(directoryPath, f);

			    var options = {
			        Bucket: 'viemailsender',
			        Key: file,
			        Body: fs.readFileSync(filePath),
			        ACL:'public-read'
			    };

			    s3.putObject(options, cb);

			}, function (err, results) {
			    if (err) console.error(err);
			    console.log(results);
			});


	  });
	})
};

function getImage() {
	var params = {Bucket: 'myBucket'};
		s3.listObjects(params, function(err, data){
		  var bucketContents = data.Contents;
		    for (var i = 0; i < bucketContents.length; i++){
		      var urlParams = {Bucket: 'myBucket', Key: bucketContents[i].Key};
		        s3.getSignedUrl('getObject',urlParams, function(err, url){
		          console.log('the url of the image is', url);
		        });
		    }
		});
}

function listBuckets() {
s3.listBuckets(function(err, data) {
   if (err) {
      console.log("Error", err);
   } else {
      console.log("Bucket List", data.Buckets);
   }
});
};

