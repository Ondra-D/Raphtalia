const client = require('nekos.life');
const neko = new client();

const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('fact')
    .setDescription('Sends an interesting fact.'),
    async execute(interaction) {
        const fact = await neko.fact();


        console.log(fact.fact);
        await interaction.reply({ content: fact.fact });
    }

 }
