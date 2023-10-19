const client = require('nekos.life');
const neko = new client();

const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('tickle')
    .setDescription('Tickle someone.')
    .addUserOption(option => option.setName('user').setDescription('Select a user to tickle').setRequired(false)),
    async execute(interaction) {
       
        const member = interaction.options.getMember('user');
        const tickle = await neko.tickle();

        const bot = interaction.client.user.username 
        const author = interaction.member.displayName
        
        if(!member) {
            const tickleEmbed = {
                    color: 0xDC143C,
                    title: `**${bot} tickles ${author}**`,
                    description: ``,
                    image: {
                        url: tickle.url
            }}
            await interaction.reply({embeds: [tickleEmbed]});



    }else{
        const tickleEmbed = {
            color: 0xDC143C,
            title: `**${author} tickles ${member.user.username}**`,
            description: ``,
            image: {
                url: tickle.url
        }
    }
    await interaction.reply({embeds: [tickleEmbed]});
    }

}}
