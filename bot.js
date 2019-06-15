const Discord = require('discord.js');
const request = require('request-promise');

const client = new Discord.Client();

var prefix = '!'
 
 client.on('message', message => {
    if(message.author === client.user) return;
    if(message.content.startsWith(prefix + 'Цетус')) {
		request('https://api.warframestat.us/pc/cetusCycle', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				if(info['isDay'] === true)
				{
					message.channel.sendMessage('До ночи осталось ' + info['timeLeft']);
				}		
				else
				{
					message.channel.sendMessage('До дня осталось ' + info['timeLeft']);
				}	
			}
		})
     }
     if(message.content.startsWith(prefix + 'Разломы')) {
		request('https://api.warframestat.us/pc/fissures', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				var index;
				for (index = 0; index < info.length; index++) {
				    message.channel.sendMessage(info[index].node);
				}
			}
		})
     }
	 
 });

client.login(process.env.BOT_TOKEN);
