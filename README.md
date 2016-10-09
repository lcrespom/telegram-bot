# telegram-bot
A telegram bot that posts messages to a channel or chat id.
- In case of messaging a channel, the bot must be authorized as
	an administrator of the channel.
- In case of messaging to a chat, the chat id is obtained by
	first sending a message from a user to the bot


Usage:
```
node telebot bot-token @channel|chatId message
```

## Useful links:
- Telegram bot introduction: https://core.telegram.org/bots
- Telegram bot API: https://core.telegram.org/bots/api
- Telegram channel FAQ: https://telegram.org/faq_channels
- GitHub of API in use: https://github.com/yagop/node-telegram-bot-api
