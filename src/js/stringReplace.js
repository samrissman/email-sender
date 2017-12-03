var fs = require('fs');

var filePath = './views/index_email.html';

replaceImageString(filePath);

function replaceImageString(filePath) {
	fs.readFile(filePath, 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	  var result = data.replace(/images/g, 'https://s3-ap-southeast-2.amazonaws.com/viemailsender');

	  fs.writeFile('replacedString', result, 'utf8', function (err) {
	     if (err) return console.log(err);
	  });
	});
}