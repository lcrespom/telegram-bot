const request = require('request');


const protocol = 'https';
const host = 'api.telegram.org';


class BotApi {

	constructor(token) {
		this.token = token;
		this.botURL = 'https://api.telegram.org/bot' + token + '/';
	}

	getUpdates(offset, limit, timeout) {
		return this._request('getUpdates', { offset, limit, timeout });
	}

	_request(method, obj) {
		return new Promise((resolve, reject) => {
			request({
				url: this.botURL + method,
				method: 'POST',
				gzip: true,
				json: true,
				body: obj
			}, (error, message, body) => {
				if (error) reject(error, message, body);
				else resolve(body, message);
			});
		});
	}
}

module.exports = BotApi;