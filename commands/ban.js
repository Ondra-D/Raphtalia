const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField, ButtonStyle, ButtonBuilder,
    ActionRowBuilder
} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server.')
    .addUserOption(option => option.setName('user').setDescription('Select a user to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for banning').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        let reason = interaction.options.getString('reason');
        const guildMember = interaction.guild.members.cache.get(user.id);

        const unbanButton = new ButtonBuilder()
            .setCustomId("unban")
            .setLabel("Unban")
            .setStyle(ButtonStyle.Danger)

        const button = new ActionRowBuilder()
            .addComponents(unbanButton)

        if(interaction.appPermissions.any(PermissionsBitField.Flags.BanMembers) === false) return await interaction.reply({ content: "I dont have the permissions to do that!", ephemeral: true })
        if(!guildMember) return await interaction.reply({ content: "I cannot find that user!", ephemeral: true })
        if(!guildMember.bannable) return await interaction.reply({ content: "I cannot ban that user!", ephemeral: true })

        if(user === user.bot || reason === null ) {
            await user.send(`You have been banned from ${interaction.guild.name}.`)
        } else  {
            await user.send(`You have been banned from ${interaction.guild.name} for ${reason}.`)

        }
        await guildMember.ban({ reason: reason });

       const response = await interaction.reply({ content: `Successfully Banned ${user} (${user.id})`, components: [button], ephemeral: true });

        const collectorFilter = i => i.user.id === interaction.user.id;

        try{
            const unbanConfirmation = await response.awaitMessageComponent({ filter: collectorFilter })
            if (unbanConfirmation.customId === "unban") {
                await interaction.guild.bans.remove(user.id)
                await response.edit({ content: `${user} has been unbanned.`, components: [] })
            }
        } catch (err) {
            await response.edit({ content: "Something went wrong!", components: []})
            console.log(err)
        }
 }
};