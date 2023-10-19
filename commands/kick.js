const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('kick a user from the server.')
    .addUserOption(option => option.setName('user').setDescription('Select a user to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for kicking').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');

        if(interaction.appPermissions.any(PermissionsBitField.Flags.KickMembers) === false) return await interaction.reply({ content: "I dont have permissions to do that!", ephemeral: true })

        if(!user) return await interaction.reply({ content: "I cant find that user!", ephemeral: true })
        if(!user.kickable) return await interaction.reply({ content: "I cant kick that user!", ephemeral: true })
        await user.kick({ days: 0, reason: reason });

        await interaction.reply({ content: `Successfully kicked ${user}` });
 }
};