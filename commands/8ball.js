const client = require('nekos.life');
const neko = new client();

const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the magic 8ball a question.')
    .addStringOption(option => option.setName('question').setDescription('question').setRequired(true)),
    async execute(interaction) {
       
        const input = interaction.options.getString('question');
        const eightball = await neko.eightBall({text: input});

        await interaction.reply({ content: `:8ball:` + "`" + eightball.response + "`" });  //I am sure there is a better way to do this.


    }}