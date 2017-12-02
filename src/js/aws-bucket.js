var AWS = require('aws-sdk'),
dotenv = require('dotenv/config');
var bucketName = user = process.env.bucketName
var s3 = new AWS.S3();
var s3Bucket = new AWS.S3( { params: {Bucket: bucketName} } )
var path = './src/img';
var fs = require('fs');
var multer = require('multer');

readFile(path);

function readFile(path) {
	// fs.readdir(path, (err, files) => {
	//   files.forEach(file => {
	//     console.log(file);
	//   });
	// })
	// fs.realpath(path, (err, filePaths) => {
	// 		console.log(filePaths)
	// })

	upload.array('photos', 12), function (req, res, next) {
		console.log(req.files, req.body);
	  // req.files is array of `photos` files
	  // req.body will contain the text fields, if there were any
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

