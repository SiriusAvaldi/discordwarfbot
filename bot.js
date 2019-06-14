const Discord = require('discord.js');
const request = require('request-promise');

const client = new Discord.Client();

var prefix = '!'
 
 client.on('message', message => {
    if(message.author === client.user) return;
    if(message.content.startsWith(prefix + 'Цетус')) {
        //message.channel.sendMessage('Привет я БОТ!');
		request('https://api.warframestat.us/pc/cetusCycle', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				//message.channel.sendMessage(info['isDay']);
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
 });

client.login('NTg5MTQ4NTE4ODE2NDE1NzU1.XQPkgg.yb6Xwsx6TcrX_76dGRKWGVWc8Og');