const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('sends a picture of your avatar.')
    .addUserOption(option => option.setName('user').setDescription('Select the user.').setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');



        if(!user) {
            await interaction.reply({ content: interaction.member.displayAvatarURL() });
        } else {
            await interaction.reply({ content: user.displayAvatarURL() }); }}


        }  
