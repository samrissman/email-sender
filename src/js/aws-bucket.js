var AWS = require('aws-sdk')
AWS.config.update({
	accessKeyId: process.env.s3Id,
    secretAccessKey: process.env.s3Key,
    region: 'ap-northeast-1'});
var dotenv = require('dotenv/config');
var bucketName = user = process.env.bucketName
var s3 = new AWS.S3({apiVersion: '2006-03-01'});
var s3Bucket = new AWS.S3( { params: {Bucket: bucketName} } );
var fs = require('fs');
var async = require('async');
var path = require("path");

var directoryName = './src/img',
	directoryPath = path.resolve(directoryName);

readFile(directoryName);

function readFile(directoryName) {
	fs.readdir(directoryName, (err, files) => {
	  files.forEach(file => {
	    
	  	var directoryFiles = fs.readdirSync(directoryPath);
			async.map(directoryFiles, function (f, cb) {
			    var filePath = path.join(directoryPath, f);

			    var options = {
			        Bucket: 'viemailsender',
			        Key: file,
			        Body: fs.readFileSync(filePath)
			    };

			    s3.putObject(options, cb);

			}, function (err, results) {
			    if (err) console.error(err);
			    console.log(results);
			});


	  });
	})
};

function addImage(imageName, imageFile) {
	var data = {Key: imageName, Body: imageFile};
		s3Bucket.putObject(data, function(err, data){
		  if (err) 
		    { console.log('Error uploading data: ', data); 
		    } else {
		      console.log('succesfully uploaded the image!');
		    }
		});
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

