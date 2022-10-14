const client = require('nekos.life');
const neko = new client();

const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('Sends a picture of a dog.'),
    async execute(interaction) {
        const dog = await neko.woof();
        
        await interaction.reply({ files: [dog.url] });
    }

 }
