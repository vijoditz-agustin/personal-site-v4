import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';

import sendgrid from 'sendgrid';

import config from './webpack.config.babel';

const app = express();
const PORT = process.env.PORT || 8080;

let webpackDevMiddleware;
let webpackHotMiddleware;
let webpack;

//
// using webpack-dev-server and middleware in development environment
//
if (process.env.NODE_ENV !== 'production') {
	// use "require" instead of import because these are dev dependencies
	webpackDevMiddleware = require('webpack-dev-middleware');
	webpackHotMiddleware = require('webpack-hot-middleware');
	webpack = require('webpack');

	const compiler = webpack(config);

	app.use(webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));
	app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

//
// Index.html
// {vijoditz.com, www.vijoditz.com} => agustin.vijoditz.com
//
app.get('/', (req, res) => {
	let ext;
	if (req && req.hostname) {
		[, ext] = req.hostname.match(/.*\.(com|com.ar|local)/);

		if (req.hostname != 'agustin.vijoditz.' + ext) {
			res.redirect(301, 'http://agustin.vijoditz.' + ext);
			return;
		}
	}
	res.sendFile(__dirname + '/dist/index.html');
});

//
// Email API
//
app.post('/send-email', (req, res) => {

	request.post({
		url: 'https://www.google.com/recaptcha/api/siteverify',
		form: {
			secret: process.env.RECAPTCHA_KEY,
			response: req.body.recaptcha
		}
	},
		(error, response, body) => {
			const parsedBody = JSON.parse(body);
			if (parsedBody.success) {
				sendEmail();
			} else {
				res.status(400).send();
			}
		}
	);

	const sendEmail = () => {
		const helper = sendgrid.mail;

		const emailData = [ // mantain order: From, Subject, To, Message
			new helper.Email(process.env.SENDGRID_TO, 'Agustin Vijoditz'),
			`Email from ${req.body.name}`,
			new helper.Email(req.body.email, req.body.name),
			new helper.Content('text/plain', req.body.message)
		];

		const sender = sendgrid.SendGrid(process.env.SENDGRID_API_KEY);
		const request = sender.emptyRequest();
		request.method = 'POST';
		request.path = '/v3/mail/send';
		request.body = new helper.Mail(...emailData).toJSON();
		sender.API(request, response => {
			if (response.statusCode != 202) {
				console.log(response);
			}
			res.status(response.statusCode).send(); // 400: Error
		});
	};
});

//
// Express.listen
//
app.listen(PORT, function (error) {
	if (error) {
		console.error(error);
	} else {
		console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
	}
});