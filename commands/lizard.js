const client = require('nekos.life');
const neko = new client();

const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('lizard')
    .setDescription('Sends a picture of a lizard.'),
    async execute(interaction) {
        const lizard = await neko.lizard();
        
        await interaction.reply({ files: [lizard.url] });
    }

 }
