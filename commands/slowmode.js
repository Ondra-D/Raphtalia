const {BaseInteraction, message, SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Set the slowmode of a channel.')
    .addIntegerOption(option => option.setName('rate').setDescription('Rate in seconds').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
        const rate = interaction.options.getInteger('rate');
         const channel = interaction.channel
         if(interaction.appPermissions.any(PermissionsBitField.Flags.ManageChannels) === false) return await interaction.reply({ content: "I dont have permissions to do that!", ephemeral: true })
         if(interaction.channel.viewable === false) return await interaction.reply({ content: "I dont have access to this channel", ephemeral: true })

         if(rate < 0) return await interaction.reply({ content: "Rate must be at least 0 seconds!", ephemeral: true })

         await channel.setRateLimitPerUser(rate)

        await interaction.reply({ content: `Successfully enabled slowmode. (1 msg per ${rate}s)` });
 }
};