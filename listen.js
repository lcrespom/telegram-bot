const util = require('util');
const TelegramBot = require('node-telegram-bot-api');

let token;
let count = 1;

class HeartBeat {
	constructor(timeout, handler) {
		this.beatCount = 0;
		setInterval(_ => {
			console.log('... watchdog, beatCount:', this.beatCount);
			if (this.beatCount == 0) handler();
			this.beatCount = 0;
		}, 1000 * timeout);
	}
	beat() {
		this.beatCount++;
	}
}

parseCommandLine();
hb = new HeartBeat(60, _ => process.exit());
let bot = new TelegramBot(token);
getUpdates(bot);

function getUpdates(bot, nextUpdate) {
	bot.getUpdates(10, 100, nextUpdate)
	.then(updates => {
		console.log('==> Updates:', util.inspect(updates, { colors: true, depth: 5 }));
		if (updates.length > 0)
			nextUpdate = updates.pop().update_id + 1;
		return nextUpdate;
	})
	.catch(error => {
		console.error('==> error:', e);
		return -1;
	})
	.then(nextUpdate => {
		hb.beat();
		console.log('Looping with update_id =', nextUpdate, 'count:', count++);
		setTimeout(_ => {
			if (nextUpdate < 0) nextUpdate = undefined;
			getUpdates(bot, nextUpdate);
		}, 1000);
	});
}

function parseCommandLine() {
	if (process.argv.length < 3) {
		console.error('Missing parameters');
		return;
	}
	token = process.argv[2];
}


//---------------------------------------------------------------
// No longer used, but kept for refactoring into message handling
//---------------------------------------------------------------

function onTextForever() {
	let bot = new TelegramBot(token, { polling: true });
	try {
		listenMessages(bot);
	}
	catch (e) {
		console.log('---------- Error ----------');
		console.error(e);
	}
}

function listenMessages(bot) {
	bot.onText(/.*/, msg => {
		console.log('Got text:', msg);
		var chatId = msg.chat.id;
		bot.sendMessage(chatId, 'OK');
	});
}
