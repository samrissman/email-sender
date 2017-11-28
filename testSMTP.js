'use strict';

const dotenv = require('dotenv/config'),
    colors = require('colors'),
    bunyan = require('bunyan'),
    nodemailer = require('./node_modules/nodemailer'),
    user = process.env.EMAIL_USER,
    pass = process.env.EMAIL_PASS,
    fromAddress = process.env.FROM_ADDRESS,
    toAddress = process.env.LITMUS_TEST_EMAIL,
    subjectLine = process.env.EMAIL_SUBJECT_LINE,
    filePath = process.env.EMAIL_FILE_PATH;

//Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
    host: 'mail.vi.com.au',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: user,
        pass: pass
    },
    tls: {
        // do not fail on invalid certs
    },    
    logger: false,
    debug: false
    }, {
        // default message fields

        // sender info
        from: fromAddress,
        headers: {
        }
    });

transporter.verify(function(error, success) {
   if (error) {
        console.log('There was an error in server setup '.red + error.red);
   } else {
        console.log('Server is ready to take our messages'.green);
   }
});