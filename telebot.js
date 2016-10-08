let TelegramBot = require('node-telegram-bot-api');

let token;
let channel;
let message;

parseCommandLine();
sendMessage();

function parseCommandLine() {
	if (process.argv.length < 5) {
		console.error('Missing parameters');
		return;
	}
	token = process.argv[2];
	channel = process.argv[3];
	message = process.argv[4];
	console.log('Token:', token);
	console.log('Channel:', channel);
	console.log('Message:', message);
}

function sendMessage() {
	var bot = new TelegramBot(token, {polling: true});
	bot.sendMessage(channel, message)
	.then(sent => {
		console.log('sendMessage reply:', sent);
	})
	.catch(err => {
		console.log('sendMessage error:', err);
	})
	.then(_ => {
		process.exit();
	});
}
