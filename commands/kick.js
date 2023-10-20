const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField, ButtonStyle, ButtonBuilder   } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('kick a user from the server.')
    .addUserOption(option => option.setName('user').setDescription('Select a user to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for kicking').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const guildMember = interaction.guild.members.cache.get(user.id);


        if(interaction.appPermissions.any(PermissionsBitField.Flags.KickMembers) === false) return await interaction.reply({ content: "I dont have permissions to do that!", ephemeral: true })

        if(!guildMember) return await interaction.reply({ content: "I cant find that user!", ephemeral: true })
        if(!guildMember.kickable) return await interaction.reply({ content: "I cant kick that user!", ephemeral: true })

        if(user === user.bot || reason === null ) {
            await user.send(`You have been kicked from ${interaction.guild.name}.`)
        } else  {
            await user.send(`You have been kicked from ${interaction.guild.name} for ${reason}.`)

        }

        await guildMember.kick({ reason: reason });

        await interaction.reply({ content: `Successfully kicked ${user} (${user.id})`, ephemeral: true });
 }
};