const client = require('nekos.life');
const neko = new client();

const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cuddle')
    .setDescription('Cuddle someone.')
    .addUserOption(option => option.setName('user').setDescription('Select a user to cuddle').setRequired(false)),
    async execute(interaction) {
       
        const member = interaction.options.getUser('user');
        const cuddle = await neko.cuddle();

        const bot = interaction.client.user.displayName 
        const author = interaction.user.displayName
        
        if(!member) {
            const cuddleEmbed = {
                    color: 0xDC143C,
                    title: `**${bot} cuddles ${author}**`,
                    description: ``,
                    image: {
                        url: cuddle.url
            }}
            await interaction.reply({embeds: [cuddleEmbed]});



    }else{
        const cuddleEmbed = {
            color: 0xDC143C,
            title: `**${author} cuddles ${member.displayName}**`,
            description: ``,
            image: {
                url: cuddle.url
        }
    }
    await interaction.reply({embeds: [cuddleEmbed]});
    }

}}
