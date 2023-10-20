const { SlashCommandBuilder, PermissionFlagsBits, MembershipScreeningFieldType, PermissionsBitField } = require('discord.js');
const fetch = require('node-fetch');
const Topgg = require("@top-gg/sdk")
const { topggtoken } = require('../config.json');
const api = new Topgg.Api(topggtoken)

module.exports = {
    data: new SlashCommandBuilder()
    .setName('nsfw')
    .setDescription('sends a picture of anime feet.')
    .addSubcommand(subcommand =>
		subcommand
			.setName('feet')
			.setDescription('Send a picture of anime feet.'))
    		.addSubcommand(subcommand =>
		subcommand
			.setName('catgirl')
			.setDescription('Send a picture of a catgirl.'))
      .addSubcommand(subcommand =>
        subcommand
          .setName('rule34')
          .setDescription('Sends a picture from rule34.')
          .addStringOption(option => option.setName('tags').setDescription('Separate tags with spaces and words with underscores.'))),

    async execute(interaction) {


       async function hasUserVoted() {
           try {
               await api.hasVoted(interaction.user.id)
           } catch (error) {
               return true
           }
           return await api.hasVoted(interaction.user.id)
       }

        if(!interaction.channel.nsfw) return await interaction.reply({ content: "This channel is not nsfw!", ephemeral: true })
        if(await hasUserVoted() === false) return await interaction.reply({ content: "You must vote [here](https://top.gg/bot/697047267265216543) to use this command.", ephemeral: true })

        const feet = interaction.options._subcommand === 'feet';
        const catgirl = interaction.options._subcommand === 'catgirl';
        const rule34 = interaction.options._subcommand === 'rule34';

        if(feet) {
            const image = await getImage('feet');
            await interaction.deferReply()
            await interaction.editReply({  files: [image] })

 }else if(catgirl) {
    const image1 = await getImage('nekos');
    await interaction.deferReply()
    await interaction.editReply({  files: [image1] })

 } else if(rule34) {

  const tags = interaction.options.getString('tags');

  
  function getRandomInt(max) {
      return Math.floor(Math.random() * max);
  }

  if(tags) {
  const replacedTags = tags.replaceAll(" ", "+")
       await getImages(replacedTags)
  } else {
      await getImages(" ")
  }

 }
        








 async function getImage(type) {
  const response = await fetch("https://api.raphtalia.xyz/" + type);
  const data = await response.json();
  return data.image;
}






 async function getImages(replacedTags) {
  try{ 
      const url = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1000&pid=0&json=1&tags=` + replacedTags

      const response = await fetch(url);
      const data = await response.json()

      const random = getRandomInt(data.length)


      const finalImage = data[random].file_url

      await interaction.deferReply()
      await interaction.editReply({  files: [finalImage] })
  } catch(err) {
      return await interaction.reply({ content: "No results", ephemeral: true})

  } 






     
 }
}}
