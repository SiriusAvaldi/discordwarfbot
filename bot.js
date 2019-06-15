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
				var mes = "";
				for (index = 0; index < info.length; index++) {
				    mes += info[index].tier + ' - ' + info[index].node + ' - ' + info[index].missionType + ' - ' + info[index].enemy  + ' - ' + info[index].eta + '\r\n';
				}
				message.channel.sendMessage(mes);
			}
		})
     }
     if(message.content.startsWith(prefix + 'help')) {
	var mes = "!help - Список команд\r\n!Цетус - Информация о времени стуток на Равнинай Эйдолона\r\n!Разломы - Информация о разломах бездны\r\n";
     }
	 
 });

client.login(process.env.BOT_TOKEN);
