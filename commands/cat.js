const client = require('nekos.life');
const neko = new client();

const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Sends a picture of a cat.'),
    async execute(interaction) {
        const cat = await neko.meow();
        
        await interaction.reply({ files: [cat.url] });
    }

 }
