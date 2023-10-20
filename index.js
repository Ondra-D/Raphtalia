const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits} = require('discord.js');
const { AutoPoster } = require('topgg-autoposter')
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildBans] });
const { token, topggtoken } = require('./config.json');

PushCommands()

client.commands = new Collection();
const commandsPath = path.join(__dirname, `commands`);  

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

autoPost()

function autoPost() {

const ap = AutoPoster(topggtoken, client)

ap.on('posted', () => {
	console.log('Posted stats to Top.gg!')
 })

ap.on('error', () => {
	console.log('Top.gg token is missing or is invalid.')
	})
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


function PushCommands() {
	const { REST } = require('@discordjs/rest');
	const { Routes } = require('discord.js');
	const fs = require('node:fs');
	const { token, id } = require('./config.json')


	const commands = [];
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

	const clientId = id;

	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		commands.push(command.data.toJSON());
	}

	const rest = new REST({ version: '10' }).setToken(token);

	(async () => {
		try {
			console.log('Started refreshing application (/) commands.');

			await rest.put(
				Routes.applicationCommands(clientId),
				{ body: commands },
			);

			console.log('Successfully reloaded application (/) commands.');
		} catch (error) {
			console.error(error);
		}
	})();


}

client.login(token);
