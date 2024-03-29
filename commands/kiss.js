const client = require('nekos.life');
const neko = new client();

const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kiss')
    .setDescription('Kiss someone.')
    .addUserOption(option => option.setName('user').setDescription('Select a user to kiss').setRequired(false)),
    async execute(interaction) {
       
        const member = interaction.options.getUser('user');
        const kiss = await neko.kiss();

        const bot = interaction.client.user.displayName 
        const author = interaction.user.displayName
        
        if(!member) {
            const kissEmbed = {
                    color: 0xDC143C,
                    title: `**${bot} kisses ${author}**`,
                    description: ``,
                    image: {
                        url: kiss.url
            }}
            await interaction.reply({embeds: [kissEmbed]});



    }else{
        const kissEmbed = {
            color: 0xDC143C,
            title: `**${author} kisses ${member.displayName}**`,
            description: ``,
            image: {
                url: kiss.url
        }
    }
    await interaction.reply({embeds: [kissEmbed]});
    }

}}
