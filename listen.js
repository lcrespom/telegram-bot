const util = require('util');
const TelegramBot = require('./bot-api');


//-------------------- Heartbeat watchdog --------------------
class HeartBeat {
	constructor(timeout, handler) {
		this.beatCount = 0;
		setInterval(_ => {
			if (this.beatCount == 0) handler();
			this.beatCount = 0;
		}, 1000 * timeout);
	}
	beat() {
		this.beatCount++;
	}
}


//-------------------- Main --------------------

let token;
let count = 1;

main();

function main() {
	parseCommandLine();
	hb = new HeartBeat(60, _ => {
		console.error('Watchdog timed out. Exiting.');
		process.exit();
	});
	let bot = new TelegramBot(token);
	getUpdates(bot);
}

function parseCommandLine() {
	if (process.argv.length < 3) {
		console.error('Missing parameters');
		return;
	}
	token = process.argv[2];
}


//-------------------- Update listening & processing --------------------

function getUpdates(bot, nextUpdate) {
	bot.getUpdates(10, 100, nextUpdate)
	.then(updates => {
		if (updates.length > 0) {
			for (let update of updates)
				processUpdate(bot, update);
			nextUpdate = updates.pop().update_id + 1;
		}
		return nextUpdate;
	})
	.catch(error => {
		console.error('==> error:', e);
		return -1;
	})
	.then(nextUpdate => {
		hb.beat();
		setTimeout(_ => {
			if (nextUpdate < 0) nextUpdate = undefined;
			getUpdates(bot, nextUpdate);
		}, 1000);
	});
}

function processUpdate(bot, update) {
	/* Update example:
	{ update_id: number,
    message:
     { message_id: number,
       from:
        { id: number (same as chat id),
          first_name: 'Name',
          last_name: 'Surname',
          username: 'username' },
       chat:
        { id: number,
          first_name: 'Name',
          last_name: 'Surname',
          username: 'username',
          type: 'private' },
       date: 1476012617,
       text: 'message text' } }
	   */
	let chatId = update.message.chat.id;
	let msg = update.message.text;
	console.log('processUpdate - chatId:', chatId, '- msg:', msg);
	if (msg == '/start') {
		//bot.sendMessage(chatId, msgText);
		//reply welcome message
	}
	else if (!isNaN(msg)) {
		// find user number. If exists, assign chatId, otherwise, error
	}
	else {
		let user = getChatUser(chatId);
		if (user) {
			// reply welcome back and remind how to change number
		}
		else {
			// insist that number is required
		}
	}
}

function getChatUser() {
	return null;
}
