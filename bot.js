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
     if(message.content.startsWith(prefix + 'Ивенты')) {
		request('https://api.warframestat.us/pc/events', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				var index;
				var mes = "";
				if(info.length > 0)
				{
					for (index = 0; index < info.length; index++) {
					    mes += info[index].description + ' - ' + info[index].tooltip + ' - ' + info[index].expiry + '\r\n';
					}
					message.channel.sendMessage(mes);
				}
				else
					message.channel.sendMessage('Ивентов не обнаружено');
			}
		})
     }
     if(message.content.startsWith(prefix + 'Вылазка')) {
		request('https://api.warframestat.us/pc/sortie', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				var index;
				var mes = "";
				mes += info.faction + ' - ' + info.eta + '\r\n';
				for (index = 0; index < info.variants.length; index++) {
				    mes += info.variants[index].missionType + ' - ' + info.variants[index].node + ' - ' + info.variants[index].modifier + '\r\n';
				}
				message.channel.sendMessage(mes);
			}
		})
     }
     if(message.content.startsWith(prefix + 'Вторжения')) {
		request('https://api.warframestat.us/pc/invasions', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				var index;
				var mes = "";
				if(info.length > 0)
				{
					for (index = 0; index < info.variants.length; index++) {
						if(info[index].vsInfestation === true)					
							mes += info[index].desc + ' - ' + info[index].defenderReward.itemString + ' - ' + info[index].node + ' - ' + info[index].completion + '% - ' + info[index].eta + '\r\n';
						else
							mes += info[index].desc + ' - ' + info[index].attackerReward.itemString + ' vs ' + info[index].defenderReward.itemString + ' - ' + info[index].node + ' - ' + info[index].completion + '% - ' + info[index].eta + '\r\n';
					}
					message.channel.sendMessage(mes);
				}
				else
					message.channel.sendMessage('Вторжений не обнаружено');
			}
		})
     }
     if(message.content.startsWith(prefix + 'Новости')) {
		request('https://api.warframestat.us/pc/news', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				var index;
				var mes = "";
				for (index = info.variants.length; index >= 0; index--) {
				    mes += info[index].translations.ru + ' - ' + info[index].eta + '\r\n';
				}
				message.channel.sendMessage(mes);
			}
		})
     }
     if(message.content.startsWith(prefix + 'help')) {
	var mes = "!help - Список команд\r\n!Цетус - Информация о времени стуток на Равнинах Эйдолона\r\n!Разломы - Информация о разломах бездны\r\n!Ивенты - Информация об активных ивентах\r\n!Вылазка - Информация о текущей вылазке\r\n";
     	message.channel.sendMessage(mes);
     }
	 
 });

client.login(process.env.BOT_TOKEN);
