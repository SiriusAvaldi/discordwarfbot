const Discord = require('discord.js');
const request = require('request-promise');

const client = new Discord.Client();

var prefix = '!'
client.on("ready", () => {
	var date1 = new Date();
	var date2 = new Date('11-24-2020');
	var daysLag = Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));
	client.user.setActivity(`армии уже ${daysLag} дней`);
 });
 
 client.on('message', message => {
    var date1 = new Date();
    var date2 = new Date('12-05-2019');
    var daysLag = Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));
    client.user.setActivity(`армии уже ${daysLag} дней`);
	 
    if(message.author === client.user) return;
    if(message.content.startsWith(prefix + 'Цетус')) {
		request('https://api.warframestat.us/pc/cetusCycle', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				if(info.isDay === true)
				{
					message.channel.sendMessage('До ночи осталось ' + info.timeLeft);
				}		
				else
				{
					message.channel.sendMessage('До дня осталось ' + info.timeLeft);
				}	
			}
		})
     }
     if(message.content.startsWith(prefix + 'Фортуна')) {
		request('https://api.warframestat.us/pc/vallisCycle', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				if(info.isWarm === true)
				{
					message.channel.sendMessage('До холодной погоды осталось ' + info.timeLeft);
				}		
				else
				{
					message.channel.sendMessage('До теплой погоды осталось ' + info.timeLeft);
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
				    mes += info[index].tier + ' - ' + info[index].missionType + ' - ' + info[index].node + ' - ' + info[index].enemy  + ' - ' + info[index].eta + '\r\n';
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
					for (index = 0; index < info.length; index++) {
						if(info[index].vsInfestation === true)					
							mes += info[index].defenderReward.itemString + ' - ' + info[index].desc + ' - ' + info[index].node + ' - ' + info[index].completion + '% - ' + info[index].eta + '\r\n';
						else
							mes += info[index].attackerReward.itemString + ' vs ' + info[index].defenderReward.itemString + ' - ' + info[index].desc + ' - ' + info[index].node + ' - ' + info[index].completion + '% - ' + info[index].eta + '\r\n';
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
				for (index = info.length - 1; index >= 0; index--) {
					if(typeof(info[index].translations.ru) != "undefined")
					{
				        	mes += info[index].translations.ru + ' - ' + info[index].eta + '\r\n';
					}
				}
				message.channel.sendMessage(mes);
			}
		})
     }
     if(message.content.startsWith(prefix + 'Волна')) {
		request('https://api.warframestat.us/pc/nightwave', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				var index;
				var mes = "Сезон " + info.season + ", Фаза " + info.phase  + ", Заканчивается " + info.expiry + "\r\n";			
				for (index = 0; index < info.activeChallenges.length; index++) {
				        mes += info.activeChallenges[index].title + ' - ' + info.activeChallenges[index].desc + ' - ' + info.activeChallenges[index].reputation + '\r\n';
				}
				message.channel.sendMessage(mes);
			}
		})
     }
     if(message.content.startsWith(prefix + 'Баро')) {
		request('https://api.warframestat.us/pc/voidTrader', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				var index;
				if(info.active === true)
				{
					var mes = "Локация " + info.location + ", Уходит через " + info.endString + "\r\n";			
					for (index = 0; index < info.inventory.length; index++) {
						mes += info.inventory[index].item + ' - Дукаты ' + info.inventory[index].ducats + ' + Кредиты ' + info.inventory[index].credits + '\r\n';
					}
					message.channel.sendMessage(mes);
				}
			}
		})
     }
     if(message.content.startsWith(prefix + 'help')) {
	var mes = prefix + "help - Список команд\r\n"
	+ prefix + "Цетус - Информация о времени стуток на Равнинах Эйдолона\r\n"
	+ prefix + "Фортуна - Информация о погоде в Долине Сфер\r\n"
	+ prefix + "Разломы - Информация о разломах бездны\r\n"
	+ prefix + "Ивенты - Информация об активных ивентах\r\n"
	+ prefix + "Вылазка - Информация о текущей вылазке\r\n"
	+ prefix + "Вторжения - Список текущих вторжений\r\n"
	+ prefix + "Новости - Список последних новостей\r\n"
	+ prefix + "Волна - Информация о Ночной Волне\r\n"
	+ prefix + "Баро - Информация о Торговце бездны\r\n";
     	message.channel.sendMessage(mes);
     }
	 
 });

client.login(process.env.BOT_TOKEN);
