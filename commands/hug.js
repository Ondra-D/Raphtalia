const client = require('nekos.life');
const neko = new client();

const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hug')
    .setDescription('Hug someone.')
    .addUserOption(option => option.setName('user').setDescription('Select a user to hug').setRequired(false)),
    async execute(interaction) {
       
        const member = interaction.options.getMember('user');
        const hug = await neko.hug();

        const bot = interaction.client.user.username 
        const author = interaction.member.displayName
        
        if(!member) {
            const hugEmbed = {
                    color: 0xDC143C,
                    title: `**${bot} hugs ${author}**`,
                    description: ``,
                    image: {
                        url: hug.url
            }}
            await interaction.reply({embeds: [hugEmbed]});



    }else{
        const hugEmbed = {
            color: 0xDC143C,
            title: `**${author} hugs ${member.user.username}**`,
            description: ``,
            image: {
                url: hug.url
        }
    }
    await interaction.reply({embeds: [hugEmbed]});
    }

}}
