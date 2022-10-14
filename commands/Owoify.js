const client = require('nekos.life');
const neko = new client();

const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('owoify')
    .setDescription('owoify a word or a sentence.')
    .addStringOption(option => option.setName('input').setDescription('A word/sentence u want to owoify.').setRequired(true)),
    async execute(interaction) {
       
        const input = interaction.options.getString('input');
 
      if(!isNaN(input)) return interaction.reply({ content: 'You cannot owoify a number', ephemeral: true});

        const owo = await neko.OwOify({text: input});
        

       await interaction.reply({ content: owo.owo });

    }}