// app/routes.js
var bucketUplaod = require('./src/js/form-handler.js');

module.exports = function(app, path) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
            res.sendFile(path.join(__dirname+'/views/index.html')); // load the index.handlebars file
        })


    app.post('/upload', function(req, res) {
            fileInput(req);
        });
    };
