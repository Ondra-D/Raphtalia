const client = require('nekos.life');
const neko = new client();

const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pat')
    .setDescription('Pat someone.')
    .addUserOption(option => option.setName('user').setDescription('Select a user to pat').setRequired(false)),
    async execute(interaction) {
       
        const member = interaction.options.getUser('user');
        const pat = await neko.pat();

        const bot = interaction.client.user.displayName 
        const author = interaction.user.displayName
        
        if(!member) {
            const patEmbed = {
                    color: 0xDC143C,
                    title: `**${bot} pats ${author}**`,
                    description: ``,
                    image: {
                        url: pat.url
            }}
            await interaction.reply({embeds: [patEmbed]});



    }else{
        const patEmbed = {
            color: 0xDC143C,
            title: `**${author} pats ${member.displayName}**`,
            description: ``,
            image: {
                url: pat.url
        }
    }
    await interaction.reply({embeds: [patEmbed]});
    }

}}
