const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField} = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('characterinfo')
    .setDescription('Displays information about an anime character.')
    .addStringOption(option => option.setName('name').setDescription('The name of the character you want to search for.').setRequired(true)),
    async execute(interaction) {
        const anilist = require('anilist-node');
        const Anilist = new anilist();

        const input = interaction.options.getString('name');

    
         Anilist.search("char", input).then((data) =>{

            if(data.pageInfo.total < 1) return interaction.reply({ content: 'I cannot find this character', ephemeral: true });
            const id  = data.characters[0].id
                getCharacter(id)

        }  
    
        
        
        
        )
        async function getCharacter(id) { 
            Anilist.people.character(id).then(data => {
                const character = data
                
   const embed = {
         "title": character.name.english + ' (' + character.name.native + ')',
            color: 0xDC143C,
            "url": character.siteUrl,
            "description": character.description,
            "image": {
                "url": character.image.large
            }

        } 
         interaction.reply({embeds:  [embed] });
    })
    
  



    }
    }}