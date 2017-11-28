# email-sender-cli
Send emails from the command line using node-mailer

NODE EMAIL SENDER CLI

1. Make sure NODE is VERSION 6 otherwise nodemailer will not be able to open a connection to the smtp server.

2. run npm install

3. postinstall will run npm setup to create a .env copy of the sample-env file which you can edit with your settings.

4. 	Fill in the created .env file with your:
	- email username and password
	- email subjectline
	- path to html file (will need images to have absolute paths)
	- from address
	- internal emails from the brief (comma separated)
	- client emails from the brief (comma separated)
	- your Litmus test email to send intially
	- the retest email from Litmus

5. 	npm start

6. 	Enter the list you wish to send to into the command line prompt
	- test = Litmus intial test
	- retest = Litmus retest
	- internal list
	- client list
	- other to enter a one off email address

7. 	Off goes the email :)
