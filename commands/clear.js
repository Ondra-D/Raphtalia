const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears a specific amount of messages.')
    .addIntegerOption(option => option.setName('amount').setDescription('Amount of messages to clear.').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
       if(interaction.appPermissions.any(PermissionsBitField.Flags.ManageMessages) === false) return await interaction.reply({ content: "I dont have permissions to do that!", ephemeral: true })
       if(interaction === false) return await interaction.reply({ content: "I dont have permissions to do that!", ephemeral: true })
       if(interaction.channel.viewable === false) return await interaction.reply({ content: "I dont have access to this channel", ephemeral: true })

        const amount = interaction.options.getInteger('amount');
        if(amount < 0) return await interaction.reply({ content: "Amount must be at least 0!", ephemeral: true })
        const channel = interaction.channel;
        const messages = await channel.messages.fetch({ limit: amount });
        try {
            await channel.bulkDelete(messages);
        } catch(error) {
           return await interaction.reply({content: "I cannot delete messages older than 14 days", ephemeral: true})
        }
        await interaction.reply({ content: `Successfully cleared ${amount} messages.`, ephemeral: true  });
    }

 }
