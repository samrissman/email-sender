// app/routes.js
var bucketUplaod = require('./src/js/form-handler.js');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

module.exports = function(app, path) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
            res.sendFile(path.join(__dirname+'/views/index.html')); // load the index.handlebars file
        })


    app.post('/upload',function(req, res){
    var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) 
        {
          console.log(files);
        });
    })
}
