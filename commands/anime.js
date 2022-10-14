const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField} = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('anime')
    .setDescription('Displays information about an anime.')
    .addStringOption(option => option.setName('anime').setDescription('an anime you want to search for.').setRequired(true)),
    async execute(interaction) {


        const anilist = require('anilist-node');
        const Anilist = new anilist();

        const input = interaction.options.getString('anime');

    
         Anilist.search("anime", input).then((data) =>{

            if(data.pageInfo.total < 1) return interaction.reply({ content: 'I cannot find this anime', ephemeral: true });
            const id  = data.media[0].id
                getAnime(id)
        }  )

     async function getAnime(id) { 

        Anilist.media.anime(id).then(data => {
            const anime = data
            const description = anime.description.replace(/<br>/g, '\n') //removes html tags
            const description2 = description.replace(/<i>/g, ' ') //removes html tags
            const description3 = description2.replace(/<\/i>/g, ' ')   //removes html tags
           if(anime.isAdult && !interaction.channel.nsfw) return interaction.reply({ content: 'This anime is NSFW, search it in a nsfw channel.', ephemeral: true });


           const embed = {

                "title": anime.title.romaji,
                color: 0xDC143C,
                "url": anime.siteUrl,
                "description": description3,
                Fields: [
                    {
                        name: "English",
                        value: anime.title.romaji,
                        inline: true
                    },
                    {
                        name: "Native",
                        value: anime.title.native,
                        inline: true
                    },
                    {
                        name: "Type",
                        value: anime.format,
                        inline: true
                    },
                    {
                        name: "Episodes",
                        value: anime.episodes  || "Not yet released",
                        inline: true
                    },
                    {
                        name: "Status",
                        value: anime.status,
                        inline: true
                    },
                    {
                        name: "Average Score",
                        value: anime.averageScore,
                        inline: true
                    },
                    {
                        name: "Genres",
                        value: anime.genres.join(", "),
                        inline: true
                    },
                    {
                        name: "Adult",
                        value: anime.isAdult,
                        inline: true
                    },


                ],
                "image": {
                    "url": anime.coverImage.large
                }
                    

                
        }
         interaction.reply({embeds: [embed]})
        }

        )}}}