const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField} = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('manga')
    .setDescription('Displays information about a manga.')
    .addStringOption(option => option.setName('manga').setDescription('A manga you want to search for.').setRequired(true)),
    async execute(interaction) {


        const anilist = require('anilist-node');
        const Anilist = new anilist();

        const input = interaction.options.getString('manga');

    
         Anilist.search("manga", input).then((data) =>{

            if(data.pageInfo.total < 1) return interaction.reply({ content: 'I cannot find this manga', ephemeral: true });
            const id  = data.media[0].id
                getManga(id)
        }  )

     async function getManga(id) { 

        Anilist.media.manga(id).then(data => {
            const manga = data
            const description = manga.description.replace(/<br>/g, '\n') //removes html tags
            const description2 = description.replace(/<i>/g, ' ') //removes html tags
            const description3 = description2.replace(/<\/i>/g, ' ')   //removes html tags
           if(manga.isAdult && !interaction.channel.nsfw) return interaction.reply({ content: 'This manga is NSFW, search it in a nsfw channel.', ephemeral: true });


              const embed = {

                "title": manga.title.romaji,
                color: 0xDC143C,
                "url": manga.siteUrl,
                "description": description3,
                Fields: [
                    {
                        name: "English",
                        value: manga.title.romaji,
                        inline: true
                    },
                    {
                        name: "Native",
                        value: manga.title.native,
                        inline: true
                    },
                    {
                        name: "Type",
                        value: manga.format,
                        inline: true
                    },
                    {
                        name: "Chapters",
                        value: manga.chapters || "Not yet released",
                        inline: true
                    },
                    {
                        name: "Volumes",
                        value: manga.volumes || "Not yet released",
                        inline: true
                    },
                    {
                        name: "Status",
                        value: manga.status,
                        inline: true
                    },
                    {
                        name: "Average Score",
                        value: manga.averageScore,
                        inline: true
                    },
                    {
                        name: "Genres",
                        value: manga.genres.join(", "),
                        inline: true
                    },
                    {
                        name: "Adult",
                        value: manga.isAdult,
                        inline: true
                    },


                ],
                "image": {
                    "url": manga.coverImage.large
                }
                    

                
        }

            interaction.reply({embeds: [embed]})

        }

     
        )}}}