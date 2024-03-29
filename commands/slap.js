const client = require('nekos.life');
const neko = new client();

const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('slap')
    .setDescription('Slap someone.')
    .addUserOption(option => option.setName('user').setDescription('Select a user to slap').setRequired(false)),
    async execute(interaction) {
       
        const member = interaction.options.getUser('user');
        const slap = await neko.slap();

        const bot = interaction.client.user.displayName 
        const author = interaction.user.displayName
        
        if(!member) {
            const slapEmbed = {
                    color: 0xDC143C,
                    title: `**${bot} slaps ${author}**`,
                    description: ``,
                    image: {
                        url: slap.url
            }}
            await interaction.reply({embeds: [slapEmbed]});



    }else{
        const slapEmbed = {
            color: 0xDC143C,
            title: `**${author} slaps ${member.displayName}**`,
            description: ``,
            image: {
                url: slap.url
        }
    }
    await interaction.reply({embeds: [slapEmbed]});
    }

}}
