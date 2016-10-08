let TelegramBot = require('node-telegram-bot-api');

let token;

parseCommandLine();
listenMessages();

function parseCommandLine() {
	if (process.argv.length < 3) {
		console.error('Missing parameters');
		return;
	}
	token = process.argv[2];
}

function listenMessages() {
	var bot = new TelegramBot(token, { polling: true });
	bot.on('message', msg => {
		console.log('Got message:', msg);
		var chatId = msg.chat.id;
		bot.sendMessage(chatId, 'OK');
	});
}
