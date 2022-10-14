const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server.')
    .addUserOption(option => option.setName('user').setDescription('Select a user to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for banning').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');

        if(interaction.appPermissions.any(PermissionsBitField.Flags.BanMembers) === false) return await interaction.reply({ content: "I dont have the permissions to do that!", ephemeral: true })
        if(!user) return await interaction.reply({ content: "I cannot find that user!", ephemeral: true })
        if(!user.bannable) return await interaction.reply({ content: "I cannot ban that user!", ephemeral: true })
        await user.ban({ days: 0, reason: reason });

        await interaction.reply({ content: `Successfully Banned ${user}` });
 }
};