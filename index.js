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
    filePath = process.env.EMAIL_FILE_PATH,
    prompt = require('prompt');

var sendAddress = "";

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
    logger: bunyan.createLogger({
        name: 'nodemailer'
    }),
    debug: true
}, {
    // default message fields

    // sender info
    from: fromAddress,
    headers: {
    }
});

console.log('SMTP Configured'.green);

userInput();

//Ask user for send info
function userInput() {
    console.log("Please choose the recipient list --- test (initial Litmus), retest (litmus retest), internal, client or other (to specify a one off send)".cyan);
    prompt.start();

      prompt.get(['recipients'], function (err, result) {
        if (err) { return onErr(err); }
        console.log('\n ---------------------------------- \n');
        console.log('   Command-line input received:');
        console.log('   Send To: '.green + result.recipients.green);
        console.log('\n ---------------------------------- \n');

        if (result.recipients == 'test') {
            sendAddress = process.env.LITMUS_TEST_EMAIL;
        } else if (result.recipients == 'retest') {
            sendAddress = process.env.LITMUS_RETEST_EMAIL;
        } else if (result.recipients == 'internal') {
            sendAddress = process.env.INTERNAL_EMAILS;
        } else if (result.recipients == 'client') {
            sendAddress = process.env.CLIENT_EMAILS;
        } else if (result.recipients == 'other') {
            newAddress();
            return false;
        } 
        else {
            console.log("Please enter a valid option".red);
            return false;
        }

     	sendEmail(sendAddress);

      });

      function onErr(err) {
        console.log(err);
        return 1;
      }
};

function newAddress() {
console.log("Please enter a different email address".cyan);
            prompt.start();
            prompt.get(['newAddress'], function (err, result) {
            if (err) { return onErr(err); }
            console.log('   Send To: '.green + result.newAddress.green);
            sendAddress = result.newAddress;

            sendEmail(sendAddress);

            });

            function onErr(err) {
                console.log(err);
                return 1;
            }
};

function sendEmail(Address) {
// Message object
let message = {

// Comma separated list of recipients
    to: Address,

//     // Subject of the message
    subject: subjectLine,

//     // HTML body
    html: {path: "../"+filePath},

};

console.log('Sending Mail'.green);
transporter.sendMail(message, (error, info) => {
    if (error) {
        console.log('Error occurred'.red);
        console.log(error.message.underline.red);
        return;
    }
    console.log('Message sent successfully!'.green);
    console.log('Server responded with "%s"', info.response.yellow);
    transporter.close();
});
};