/*
Project in collaboration with S7AGV and SWonton
https://github.com/s7agv
https://github.com/SWonton
*/

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
var txtomp3 = require("text-to-mp3");
const fetch = require('node-fetch');
let config = require("./config.json");
let isoList = require("./iso.json");
const ud = require('urban-dictionary');
const Booru = require('booru');
const request = require('request');
const wiki = require('wikijs').default;
const nodeHtmlToImage = require("node-html-to-image");
const axios = require('axios');
let CrypPrice = require('crypto-price');
const gis = require('g-i-s');


//global variables
var erCensorSwitch = false;
var lastSpamUser = '0';
var on = false;


//confirmation that bot is online
client.on("ready", () => {
  console.log("I am ready!");
});


//main(void) activates on 
client.on("message", (message) => {


  //intialized variables for commands
  let msgArr = message.content.split(" "); // array of words when a command is invoked
  let cmd = msgArr[0];
  let args = msgArr.slice(1);
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if(!prefixes[message.guild.id]){ //for guilds with specific prefixes
      prefixes[message.guild.id] = {
          prefixes: config.prefix
      };
  }
  let prefix = prefixes[message.guild.id].prefixes;


  if (cmd === `${prefix}prefix`) {
    if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You don't have permission to do this.");
    if (!args[0] || args[0] == "help") return message.reply(`usage for that command is ${prefix}prefix [new prefix]`);
    
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    
    prefixes[message.guild.id] = {
      prefixes: args[0]
    };
    
    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
      message.reply(args[0] + `is now new prefix`);
      if (err) throw err;
    });
  }


  //desc
  if (cmd === `${prefix}help`) {
    var helpFile = fs.readFileSync("./help.txt/", "utf8");
    message.channel.send("```" + helpFile + "```");
  }


  //simple response commands, doesn't use the prefix
  if (message.content.startsWith("can i get a rip in the chat")) {
    message.channel.send("rip");
  }
  if (message.content.startsWith("can I get a rip in the chat")) {
    message.channel.send("rip");
  }
  if (message.content.startsWith("Can i get a rip in the chat")) {
    message.channel.send("rip");
  }
  if (message.content.startsWith("Can I get a rip in the chat")) {
    message.channel.send("rip");
  }
  if (message.content.startsWith("press f to pay respects")) {
    message.channel.send("F");
  }
  if (message.content.startsWith("press F to pay respects")) {
    message.channel.send("F");
  }
  if (message.content.startsWith("Press f to pay respects")) {
    message.channel.send("F");
  }
  if (message.content.startsWith("Press F to pay respects")) {
    message.channel.send("F");
  }
  if (message.content == "gn"){
    if (message.author.bot == false){
      message.channel.send("good night");
    }
  }
  if (message.content == "gm"){
    if (message.author.bot == false){
      message.channel.send("good night");
    }
  }
    

  //test copypasta commands
  if (cmd === `${prefix}test`){
      message.channel.send("⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⡀\n⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⡸⠱⡀\n⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣠⣴⠖⢀⢀⢀⢀⢀⢀⣠⡆⢀⢀⢠⠃⢀⣧\n⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣤⣾⣿⣿⠋⢀⢀⢀⢀⢀⣠⠞⢁⡇⢀⢠⠏⢀⢀⢹\n⢀⢀⢀⢀⢀⢀⢀⢀⢀⣠⣶⣿⢿⣿⣿⠃⢀⢀⢀⢀⣠⠞⠁⢀⣼⠁⣠⠏⢀⢀⢀⣿\n⢀⢀⢀⢀⢀⢀⢀⣠⣾⡿⠋⢀⣼⡿⠁⢀⢀⢀⣠⠞⠁⢀⢀⢰⢏⡼⠃⢀⢀⢀⢀⡇\n⢀⢀⣾⢀⢀⢀⣼⡿⠋⢀⢀⢀⣿⠃⣀⣠⣶⠿⠃⢀⢀⢀⢀⡿⠋⢀⢀⢀⢀⢀⢸⠃⢀⣀⣠⠤⠖⠚⠋⢉⡭⠋\n⢀⣼⣿⢀⣠⣿⠟⠁⢀⢀⢀⠘⠛⠛⠋⠉⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠮⠒⠋⠁⢀⢀⢀⣠⠔⠁\n⢀⡇⢻⣰⡿⠃⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣠⠞⠁\n⢸⠃⠈⠟⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⡾⠋\n⢸⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⠋\n⢸⡄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⡾⠁\n⢀⡇⢀⢀⢀⢀⢀⢀⣀⣀⣀⣠⣤⣤⣤⣤⣤⣤⣤⣤⣤⣄⣀⣀⣀⣀⣀⡀⢀⢠⡞\n⢀⢳⢀⣀⣀⣀⣀⣀⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣀⣉⡉⢉⡟\n⢀⠘⣄⣀⣀⣤⣤⢀⡇⠰⠶⠶⠶⢶⣶⣶⡶⠶⠶⠶⢀⢀⢀⣼⠿⠟⠛⠿⡿\n⢀⢀⢳⢀⣀⣀⣀⣀⡇⢀⢀⡠⠊⠁⣀⣀⠈⠑⣄⢀⢀⢀⣰⡡⠤⠠⢄⣰⠃\n⢀⢀⠈⢏⣉⣀⣀⣸⡇⢀⠸⢀⢀⣾⣿⣿⣷⢀⠘⡄⢀⢠⠏⢠⣤⣤⢀⠹\n⢀⡰⠊⠉⠑⡄⢀⢸⠇⢀⢃⢀⢀⣿⣿⣿⡟⢀⢀⠃⢀⣾⢀⣿⣿⣿⢀⢀⠇\n⢀⠃⠈⠉⢣⠘⠤⠼⢀⢀⠈⢄⢀⠈⠉⠁⢀⣠⠎⢀⡘⠸⡀⠙⠛⠁⢀⢼⡄\n⢀⡀⢀⠐⠎⢀⢀⢀⢀⢀⢀⢀⠁⠐⠒⠒⠈⢀⢀⢀⠧⠤⢬⠒⢀⠂⠁⢀⢳\n⢀⠁⠐⠒⠂⠉⠁⠢⣄⢀⢀⢀⢀⢀⠒⠤⢤⣀⣀⣐⣒⣒⣉⡠⠤⠂⢀⡴⠃\n⢀⢀⢀⢀⢀⢀⢀⢀⠈⠙⢲⣤⣀⡀⢀⢀⢀⢀⢀⠉⠉⠁⢀⣀⣤⠞⠉\n⢀⢀⢀⢀⢀⢀⢀⢀⢀⣦⣬⣇⠈⠉⢿⡒⠶⠶⠶⠶⠶⠚⠛⠉\n⢀⢀⢀⢀⢀⢀⢀⢀⢀⣿⣿⣿⣿⡆⠸⣿⣷⡀\n⢀⢀⢀⢀⢀⢀⢀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧\n⢀⢀⢀⢀⢀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆\n⢀⢀⢀⢀⢀⢰⣿⣿⣿⣿⣿⣿⣿⣿⠿⣿⣿⣷⠁\n⢀⢀⢀⢀⢀⠚⢻⠛⠻⠿⣿⣿⣿⣿⣀⣹⣟⣿⡆\n⢀⢀⢀⢀⢀⢀⡘⢀⢀⢸⣿⣿⣿⣿⣿⡿⢻⣿⣿\n⢀⢀⢀⢀⢀⢀⡇⢀⢀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇\n⢀⢀⢀⢀⢀⣴⣶⣶⣦⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄\n⢀⢀⢀⢀⢀⣿⣏⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠷\n⢀⢀⢀⢀⢀⡝⠉⠉⠉⢀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶\n⢀⢀⢀⢀⢀⣇⢠⢠⢀⣾⣆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟\n⢀⢀⢀⢀⢀⣿⢸⢸⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇\n⢀⢀⢀⢀⢀⠘⣾⢸⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧\n⢀⢀⢀⢀⢀⢀⠈⣹⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇\n⢀⢀⢀⢀⢀⢀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆\n⢀⢀⢀⢀⢀⢀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿\n⢀⢀⢀⢀⢀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧\n⢀⢀⢀⢀⢀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡉⢓⣤⣀⡀\n⢀⢀⢀⢀⢀⣿⢿⣿⣿⣿⣿⣿⠤⠤⠤⠽⡿⢿⣿⣿⣿⣿⣿⣿⣷⣶⣾⣿⣿⣷⣶⣶⣤⡄\n⢀⢀⢀⢀⢀⢀⣼⣿⣿⣿⣿⣿⢒⣒⣂⣀⣉⣦⡀⠈⠉⠉⠙⠛⠛⠛⠋⠉⠉⠉⠉⠁⢸⠁\n⢀⢀⢀⢀⢀⢀⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⡉⠉⠙⠛⠛⠛⠛⠛⠓⠒⠒⠒⠊\n⢀⢀⢀⢀⢀⢀⠇⢀⠈⠉⠛⠛⠛⠛⠛⠛⠉⠁⢀⠠⡇")
  }
    

  //makes bot type message after speak incantation
  if (cmd === `${prefix}speak`) {
    if (config.owners.includes(message.author.id)) {
        message.delete();
        message.channel.send(args.join(" "));
    }else {
      
      let userMoney = JSON.parse(fs.readFileSync("./usermoney.json", "utf8"));
      checkUserAccExist(message);
      let price = 100;
      let balance = userMoney[message.author.id].bal;
      let userStock = userMoney[message.author.id].stocks;
      let channelID = message.channel;
      let channel = client.channels.cache.filter(channel => channel.id == channelID).first();
      async function jeus(channel){
        await channel.send(`that will cost $100`);
        let r = channel.messages.cache.filter(message => message.id == client.user.lastMessageID).first();
          r.react('❌');
          r.react('☑️');
          const filter = (reaction, user) => user.id == message.author.id && reaction.emoji.name === '❌' || user.id == message.author.id && reaction.emoji.name === '☑️'; //filter reactions to only the user who called the bot only the 2 emojis
            const collector = r.createReactionCollector(filter, { time: 60*1000, maxEmojis: 1 });
        collector.on('collect', function(msg){ 
          if(msg.emoji.name == '☑️'){
            if(price > balance){
              message.reply("you cant afford that");
            }else{
              userMoney[message.author.id] = {
                bal: (balance - price),
                stocks: userStock 
              }
              fs.writeFile("./usermoney.json", JSON.stringify(userMoney), (err) => {
                if (err) throw err;
              });
              message.delete();
              message.channel.send(args.join(" "));
              r.delete();
            }
          }
        });
      }
      jeus(channel);
    }
  }


  //sets bot's 'game' under bot name in user list, have to specify what type (PLAYING, STREAMING, LISTENING, WATCHING)
  if (cmd === `${prefix}status`) {
    if (config.owners.includes(message.author.id)) {
      message.delete();
      var activityType = args[0];
      client.user.setActivity(args.slice(1).join(" "), { type: activityType  });
    }else{
      message.channel.send("Nah I'm good"); // anyone else who tries to use this command gets the boot
    }
  }


  //kills the bot and adds a letter to die.txt 
  if (cmd === `${prefix}die`){//bad old code but we dont feel like changing it in this version
    if (config.owners.includes(message.author.id)){
      fs.appendFile("./die.txt","E", function (err){
        if (err) throw err;
        var Death = fs.readFile("./die.txt") // causes an error that crashes the bot
        message.channel.send(Death.legnth); //typo makes bot crash (on purpose (big brain))
      });
  }else{
      message.channel.send("Nah I'm good"); // anyone else who tries to use this command gets the boot
    }
  }


  //shows # of times the 'die' command has been invoked
  if (cmd === `${prefix}check`){
    var deathCount = fs.readFileSync("./die.txt")
    message.channel.send("My Creator has killed me "+ deathCount.length +" times. Please help.");
  }


  if(cmd === `${prefix}toF`){
    let celsius = args[0];
    let num = (celsius*9/5)+32;
    let emb = new Discord.MessageEmbed()
    .setColor('#edd35f')
    .setTitle('Convert')
    .setAuthor(client.user.username, client.user.avatarURL())
    .addFields(
      { name: 'Celsius', value: `${celsius}°C`, inline: true },
      { name: 'Fahrenheit', value: `${num}°F`, inline: true },
    )
    .setTimestamp()
    .setFooter(client.user.username);
    message.channel.send(emb);
  }
  if(cmd === `${prefix}toC`){
    let f = args[0];
    let num = (f-32)*5/9;
    let emb = new Discord.MessageEmbed()
    .setColor('#edd35f')
    .setTitle('Convert')
    .setAuthor(client.user.username, client.user.avatarURL())
    .addFields(
      { name: 'Fahrenheit', value: `${f}°F`, inline: true },
      { name: 'Celsius', value: `${num}°C`, inline: true },
    )
    .setTimestamp()
    .setFooter(client.user.username);
    message.channel.send(emb);
  }



  //sends a reaction image from
  if (cmd === `${prefix}r`) {
  var path = `./reaction/`;
  var imageName = args[0];
  var imageExist = false;
  fs.readdir(path, function(err, items) {
      for (var i=0; i<items.length; i++) {
          if(items[i].startsWith(imageName)){
            path=path+items[i];
            imageExist = true;
          }
      }
      if(!imageExist) {
        message.channel.send(`Image doesn't exist. **${prefix}allr** for list of images.`);
      } else {
        message.channel.send("", {files: [path]});
      }
  });

  }


  //returns list of images in 'reaction' folder
  if (cmd === `${prefix}allr`) {
    fs.readdir("./reaction/", function (err, files) { 
      if (!err) {
        for(var i = 0; i<files.length; i++){
          files[i] = files[i].replace(/(\.).*/g, "");
        }
        message.channel.send(files);
      }
    });
  }


  //sends the same message 5 times to messenger channel 
  if (cmd === `${prefix}spam`){
      if(message.author.id == lastSpamUser) {
        message.channel.send ("Give someone else a chance to use it");
      } else {
          if(args[0].charAt(0) == `${prefix}`){ // if first character of the spam message is the prefix, it wont send the spam
            message.channel.send ("That's a bit much");
          }else{
        lastSpamUser = message.author.id;
      message.channel.send(args.join(" "));
      message.channel.send(args.join(" "));
      message.channel.send(args.join(" "));
      message.channel.send(args.join(" "));
      message.channel.send(args.join(" "));
        }
    }
  }
    

  //replaces letters with text emoji counterpart
  if(cmd === `${prefix}bigtext` || cmd === `${prefix}bt`){
      var msgBT = args.join(" ");
      var postMsgBT =  msgBT.replace(/z/g,"z ").replace(/y/g,"y ").replace(/x/g,"x ").replace(/w/g,"w ").replace(/v/g,"v ").replace(/u/g,"u ").replace(/t/g,"t ").replace(/s/g,"s ").replace(/r/g,"r ").replace(/q/g,"q ").replace(/p/g,"p ").replace(/o/g,"o ").replace(/n/g,"n ").replace(/m/g,"m ").replace(/l/g,"l ").replace(/k/g,"k ").replace(/j/g,"j ").replace(/i/g,"i ").replace(/h/g,"h ").replace(/g/g,"g ").replace(/f/g,"f ").replace(/e/g,"e ").replace(/d/g,"d ").replace(/c/g,"c ").replace(/a/g,"a ").replace(/b/g,"b ").replace(/Z/g,"z ").replace(/Y/g,"y ").replace(/X/g,"x ").replace(/W/g,"w ").replace(/V/g,"v ").replace(/U/g,"u ").replace(/T/g,"t ").replace(/S/g,"s ").replace(/R/g,"r ").replace(/Q/g,"q ").replace(/P/g,"p ").replace(/O/g,"o ").replace(/N/g,"n ").replace(/M/g,"m ").replace(/L/g,"l ").replace(/K/g,"k ").replace(/J/g,"j ").replace(/I/g,"i ").replace(/H/g,"h ").replace(/G/g,"g ").replace(/F/g,"f ").replace(/E/g,"e ").replace(/D/g,"d ").replace(/C/g,"c ").replace(/A/g,"a ").replace(/B/g,"b ").replace(/z /g,":regional_indicator_z:").replace(/y /g,":regional_indicator_y:").replace(/x /g,":regional_indicator_x:").replace(/w /g,":regional_indicator_w:").replace(/v /g,":regional_indicator_v:").replace(/u /g,":regional_indicator_u:").replace(/t /g,":regional_indicator_t:").replace(/s /g,":regional_indicator_s:").replace(/r /g,":regional_indicator_r:").replace(/q /g,":regional_indicator_q:").replace(/p /g,":regional_indicator_p:").replace(/o /g,":regional_indicator_o:").replace(/n /g,":regional_indicator_n:").replace(/m /g,":regional_indicator_m:").replace(/l /g,":regional_indicator_l:").replace(/k /g,":regional_indicator_k:").replace(/j /g,":regional_indicator_j:").replace(/i /g,":regional_indicator_i:").replace(/h /g,":regional_indicator_h:").replace(/g /g,":regional_indicator_g:").replace(/f /g,":regional_indicator_f:").replace(/e /g,":regional_indicator_e:").replace(/d /g,":regional_indicator_d:").replace(/c /g,":regional_indicator_c:").replace(/a /g,":regional_indicator_a:").replace(/b /g,":regional_indicator_b:");  
      if(msgBT != postMsgBT){ //checks if a message doesn't contain letters
        message.channel.send(postMsgBT);
      }
  }
    
    
  //returns bot uptime for current session, using a time format function I stole off of stackoverflow 
  if(cmd === `${prefix}uptime`){
      var uptime = process.uptime();
      message.channel.send(format(uptime));
  }
    

  //generates a sudo-random spiritual evalution of one's day, updates daily as the smallest unit of time to generate the number is the day 
  if(cmd === `${prefix}juju`){
      if (message.author.bot === false){
        var seed = message.author.id;
        var today = new Date();
        var day = today.getDate()+1;
        var month = today.getMonth()+1;
        var year = today.getFullYear();
        var evaluation = ((seed*day*month*year)/100000);
        switch(evaluation % 6){ //readings based off of Stardew Valley's "Fortune Teller"
          case 0:
          message.channel.send("Daily Juju: *The spirits are very happy today! They will do their best to shower everyone with good fortune.*");
          break;
          case 1:
          message.channel.send("Daily Juju: *The spirits are in good humor today. I think you'll have a little extra luck.*");
          break;
          case 2:
          message.channel.send("Daily Juju: *The spirits feel neutral today. The day is in your hands.*");
          break;
          case 3:
          message.channel.send("Daily Juju: *This is rare. The spirits feel absolutely neutral today.*");
          break;
          case 4:
          message.channel.send("Daily Juju: *The spirits are somewhat annoyed today. Luck will not be on your side.*");
          break;
          case 5:
          message.channel.send("Daily Juju: *The spirits are very displeased today. They will do their best to make your life difficult*");
          break;
      }
    }
  }


  //Your average ping command
  if (cmd === `${prefix}ping`) {
    message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");
  }


  //"Censors" all words that end in 'er' --> 'a' & 'ers' --> 'as' 
  if(erCensorSwitch == true){ 
    if (!message.content.startsWith(`${prefix}speak`)){
      if (message.content.includes("er")){
        if (message.author.bot == false){
          var censoredMsg = message.content + " ";                                //adds an extra space to the end of the message to make the .replace commands 
          censoredMsg = censoredMsg.replace(/er /g, "a ").replace(/ers /g,"as "); //function correctly when a censored word is at the end of a message
          censoredMsg = censoredMsg.substring(0, censoredMsg.length - 1);
          if (message.content != censoredMsg){
            message.delete();
            message.channel.send(`${message.author}: ${censoredMsg}`);
          }
        }
      }
    }
  } 


  //turns on/off the 'er' censor, default on start is off
  if (cmd === `${prefix}censor`){
    if(config.owners.includes(message.author.id)){
      if(erCensorSwitch == true){
        erCensorSwitch = false;
        message.channel.send("'er' censor is now " + erCensorSwitch);
      }else{
        erCensorSwitch = true;
        message.channel.send("'er' censor is now " + erCensorSwitch);
      }
    }
  }


  //checks state of 'er' censor
  if (cmd === `${prefix}censorcheck`){
    message.channel.send("'er' censor is " + erCensorSwitch);
  }

  if (cmd === `${prefix}yoda`){
    var str = args.join(" ");
    encodeURI(str);
    axios.get('http://yoda-api.appspot.com/api/v1/yodish?text=' + str)
    .then(response => {
      var text = response.data.yodish;
      var exampleEmbed = new Discord.MessageEmbed()
          .setColor("#588443")
          .setDescription(text)
          .setAuthor("Yoda", "https://i.kym-cdn.com/entries/icons/medium/000/029/165/yoda.jpg", 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')

          message.channel.send(exampleEmbed);
    })
    .catch(error => {
      console.log(error);
    });
  }


  if (cmd === `${prefix}define`){
    var defSearch = args.join(" ");
    var help = message.author.id; //used to filter responses to the bot after the awaitMessages
    var id; //used to id the embed to be deleted later

    let url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/"+ defSearch +"?key=" + config.dictionApiKey;
    var noSuggestion = false;
    var needSuggestion = false;
    let settings = { method: "Get" };

    fetch(url, settings).then(res => res.json()).then((json) => {
      noSuggestion = !(json[0].hasOwnProperty("shortdef"));
      needSuggestion = !(json[0] == '');
      if(needSuggestion){
        if(json[0] != '[object Object]'){
          var suggList = "";
          var num = 10;
          var wantResponse = true;
          if(json.length <= 10) num = json.length;
          for(var i = 0;i < num;i++){
            suggList += "`" + (i + 1) + ".` " + json[i] + '\n'
          }
          suggList += "\n\n**Type a number to make a choice, Type `cancel` to exit**"
          var exampleEmbed = new Discord.MessageEmbed()
          .setColor(message.member.displayHexColor)
          .setDescription(suggList)
          .setAuthor(message.author.username, message.author.avatarURL(), 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')

          message.channel.send(exampleEmbed).then(msg => {
          id = msg.id;
        });
        // Await !vote messages
        const filter = m => m.author.id == help;
        // Errors: ['time'] treats ending because of the time limit as an error
        message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then((collected) => {
          message.channel.messages.fetch(id).then(msg => msg.delete()); 
          const response = collected.first();
            switch(response.content){
              case '1':
              defSearch = json[0];
              break;
              case '2':
              defSearch = json[1];
              break;
              case '3':
                defSearch = json[2];
                break;
              case '4':
                defSearch = json[3];
                break;
              case '5':
                defSearch = json[4];
                break;
              case '6':
                defSearch = json[5];
                break;
              case '7':
                defSearch = json[6];
                break;
              case '8':
                defSearch = json[7];
                break;
              case '9':
                defSearch = json[8];
                break;
              case '10':
                defSearch = json[9];
                break;
              default:
                wantResponse = false;
                break;
            }
            let url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/"+ defSearch +"?key=" + config.dictionApiKey;
            if(wantResponse){
              fetch(url, settings).then(res => res.json()).then((json) => {
                json[0].shortdef.sort(function(a, b){ //moves longest string to shortdef[0]
                  return b.length - a.length;
                });
                var exampleEmbed = new Discord.MessageEmbed()
                .setColor("#d71920")
                .setTitle(json[0].meta.id.replace(/\b[a-z]|['_][a-z]|\B[A-Z]/g, function(x){return x[0]==="'"||x[0]==="_"?x:String.fromCharCode(x.charCodeAt(0)^32)})) //gus is going to see this and cry
                .setDescription(json[0].shortdef[0])
                .setAuthor("Merriam-Webster Dictionary", "https://merriam-webster.com/assets/mw/static/social-media-share/mw-logo-245x245@1x.png", 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                .setThumbnail('https://merriam-webster.com/assets/mw/static/social-media-share/mw-logo-245x245@1x.png')
                .setTimestamp()

                message.channel.send(exampleEmbed);
                });
            }
          })
        }
      } else if(noSuggestion) {
        message.channel.send(`Cannot find, try **${prefix}udefine ${defSearch}**.`);
      } 
      json[0].shortdef.sort(function(a, b){ //get longest string in shortdef
        return b.length - a.length;
      });
      var exampleEmbed = new Discord.MessageEmbed()
          .setColor("#d71920")
          .setTitle(json[0].meta.id.replace(/\b[a-z]|['_][a-z]|\B[A-Z]/g, function(x){return x[0]==="'"||x[0]==="_"?x:String.fromCharCode(x.charCodeAt(0)^32)}))
          .setDescription(json[0].shortdef[0])
          .setAuthor("Merriam-Webster Dictionary", "https://merriam-webster.com/assets/mw/static/social-media-share/mw-logo-245x245@1x.png", 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
          .setThumbnail('https://merriam-webster.com/assets/mw/static/social-media-share/mw-logo-245x245@1x.png')
          .setTimestamp()

          message.channel.send(exampleEmbed);
    });
  }


  //urban dictionary search function
  if(cmd === `${prefix}udefine`){
    var definition = args.join(" ");
    ud.term(definition, (error, entries, tags, sounds) => {
      if (error) {
        console.error(error.message);
        message.channel.send(error.message);
      } else {
        var exampleEmbed = new Discord.MessageEmbed()
          .setColor("#efff00")
          .setTitle(entries[0].word.replace(/\b[a-z]|['_][a-z]|\B[A-Z]/g, function(x){return x[0]==="'"||x[0]==="_"?x:String.fromCharCode(x.charCodeAt(0)^32)}))
          .setDescription(entries[0].definition.replace(/\[/g, "").replace(/\]/g, ""))
          .addField('Ex.', entries[0].example.replace(/\[/g, "").replace(/\]/g, ""), true)
          .setAuthor("Urban Dictionary", "https://lh3.googleusercontent.com/unQjigibyJQvru9rcCOX7UCqyByuf5-h_tLpA-9fYH93uqrRAnZ0J2IummiejMMhi5Ch", 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
          .setTimestamp()

          message.channel.send(exampleEmbed);
      }
    })
  }


  //nsfw search
  if(cmd === `${prefix}r34`){
    var booruArr = ['e6','hh', 'db','kc', 'kn', 'yd' ]; //different "booru" boards that search scraps from 
    Booru.search(booruArr[getRandomInt(6)], args, { limit: 3, random: true })
    .then(post => {
      if(post[0] == undefined){
        message.channel.send(`Could not find ${args.join(" ")}`);
      } else {
        var exampleEmbed = new Discord.MessageEmbed()
        .setColor('#c71ebe')
        .setAuthor('Rule 34', 'https://lh3.googleusercontent.com/proxy/UjvYy6kMArUd0_1B0UpxkgwQQ6l6bLYtfeigzUutm-oO1QPnxo6GT7HGzblU4_y2TFjzbExvo_vQnSoMoeH9oyn9cOEk2Gg', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        .addFields(
          { name: ':cucumber:Tags', value: "`" + post[0].tags.join("`, `") + "`" },
          { name: 'Image Size', value: post[0].width + " x " + post[0].height, inline: true },
          { name: 'Score', value: post[0].score, inline: true },
        )
        .addField("Source", "[Click Here](" + post[0].fileUrl + ")", true)
        .setImage(post[0].fileUrl)
        .setTimestamp()
        .setFooter('Rule 34', 'https://kirbiecravings.com/wp-content/uploads/2019/02/wonton-soup-8.jpg');
      
        message.channel.send(exampleEmbed);
      }
    });
  }
  async function simpEmb(htmlcss){
    await nodeHtmlToImage({
        output: './simpimage.png',
        html: `${htmlcss}`
    });
  }
  async function makeEmb(title,content){
    let par = title;
    let brack = content;
    if(!par||!brack) return undefined;
    await nodeHtmlToImage({
        output: './image.png',
        html: `
        <html>
            <head>
                <style>
                body {
                    width: 800px;
                    background-color: #36393F;
                    color: white;
                    font-family: "Phenomena";
                    height: min-content;
                }
                h1 {
                    font-size: 35pt;
                }
                .wrap {
                    display: inline-flex;
                    width: 100%;
                }
                .text {
                    font-size: 28pt;
                }
                table {
                    font-size: 30pt;
                }
                .theRight {
                    width: 100%;
                    padding: 20px;
                    align-items: flex-end;
                    background-color: #2B2E33;
                }
                .uName {
                    font-size: 30pt;
                    font-family: "Bahnschrift SemiBold";
                }
                .lImg {
                    align-items: center;
                    justify-content: center;
                    padding: 12px;
                }
                </style>
            </head>
            <body>
                <div class="wrap">
                    <div class="theRight">
                        <h1>${par}</h1>
                        <span class="text">${brack}</span>
                    </div>
                </div>
            </body>
        </html>
        `
    });
  }
  if(cmd === `${prefix}weirdbabyshit`){
    message.channel.send("", {files: ["./weirdbabyshit.gif"]});
  }
  if(cmd === `${prefix}songstatus`){
    if(config.owners.includes(message.author.id)){
      if(args[0] == 'on'){
        for(i=0;i<message.author.presence.activities.length;i++){
            console.log(message.author.presence.activities[i].name)
            if(message.author.presence.activities[i].name == 'Spotify'){
                let song = message.author.presence.activities[i].details;
                let artist = message.author.presence.activities[i].state;
                if(song&&artist) client.user.setActivity(`${song} by ${artist}`, { type: "LISTENING" });
            }
        }
        on = true;
        message.channel.send(`Song status: ${on}`);
      } else if(args[0] == 'off'){
          on = false;
          client.user.setActivity(`yes`, { type: "CUSTOM_STATUS" });
          message.channel.send(`Song status: ${on}`);  
      } else {
          message.channel.send(`you're stupid`)
      }
    }
  }
  if(cmd === `${prefix}wiki`){//happy?im not really ever happy but this provides a brief relief 
    let query = args.join(" ");
    let emb = new Discord.MessageEmbed()
    .setColor('#FFFFFF')
    .setAuthor('Wikipedia', 'https://en.wikipedia.org/static/apple-touch/wikipedia.png')
    .setTimestamp()
    .setFooter('Wikipedia', 'https://en.wikipedia.org/static/apple-touch/wikipedia.png');
    wiki({ apiUrl: 'http://en.wikipedia.org/w/api.php' }).search(query).then(data => wiki().page(data.results[0]).then(page => page.summary().then(text => message.channel.send(emb.addFields({name: 'Summary', value: text.substring(0,500)+"...", inline: false }).addField("Source", "[Click Here](" + page.raw.fullurl + ")")))));
  }

  if(cmd === `${prefix}image`){
    if(!args[0]) return message.reply(`correct usage is ${prefix}image (optional: result number) [image search query]`);
    let send = args.join(" ");
    let num = 0;
    let hasNum = false;
    if(args[0].startsWith('(')){
      if (!send.match(/\(([^)]+)\)/)) return message.reply(`correct usage is ${prefix}image (optional: result number) [image search query]`);
      num = send.match(/\(([^)]+)\)/)[1];
      if(num) num--;
      let rep = send.match(/\(([^)]+)\)/)[0];
      send = send.replace(rep,"").replace(" ","");
      hasNum = true;
    }
    if(num!=undefined&&!isNaN(num)&&num>=0&&num!=null&&send){
      gis(send, logResults);
    } else {
      message.reply(`correct usage is ${prefix}image (optional: result number) [image search query]`);
    }
    function logResults(error, results) {
      if (error) {
        console.log(error);
      } else {
        if(results=="") return message.channel.send(`**No results**`);
        const out = JSON.stringify(results);
        let a = JSON.parse(out);
        if(!hasNum) num = Math.floor(Math.random() * a.length);
        if(num+1>a.length){
          message.channel.send(`**Error: ${num+1} is too big. Max results is ${a.length}, so here's that**`)
          num = a.length-1;
        }
        var gImg = new Discord.MessageEmbed()
        .setColor('#0073f7')
        .setAuthor('Google', 'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png')
        .addFields(
          { name: 'Image Size', value: a[num].height + " x " + a[num].width, inline: true }
        )
        .addField("Source", "[Click Here](" + a[num].url + ")", true)
        .setImage(a[num].url)
        .setTimestamp()
        .setFooter('Google Images', 'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png');
        message.channel.send(gImg);
      }
    }
  }

  if(cmd === `${prefix}boobs`){
    var booruArr = ['e6','hh', 'db','kc', 'kn', 'yd' ]; //different "booru" boards that search scraps from 
    Booru.search(booruArr[getRandomInt(6)], "boobs", { limit: 3, random: true })
    .then(post => {
      if(post[0] == undefined){
        message.channel.send("penis soft");
      } else{
      var exampleEmbed = new Discord.MessageEmbed()
      .setColor('#c71ebe')
      .setAuthor('Rule 34', 'https://lh3.googleusercontent.com/proxy/UjvYy6kMArUd0_1B0UpxkgwQQ6l6bLYtfeigzUutm-oO1QPnxo6GT7HGzblU4_y2TFjzbExvo_vQnSoMoeH9oyn9cOEk2Gg', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      .addFields(
        { name: ':cucumber:Tags', value: "`" + post[0].tags.join("`, `") + "`" },
        { name: 'Image Size', value: post[0].width + " x " + post[0].height, inline: true },
        { name: 'Score', value: post[0].score, inline: true },
      )
      .addField("Source", "[Click Here](" + post[0].fileUrl + ")", true)
      .setImage(post[0].fileUrl)
      .setTimestamp()
      .setFooter('God is disappointed in you', 'https://kirbiecravings.com/wp-content/uploads/2019/02/wonton-soup-8.jpg');
    
    message.channel.send(exampleEmbed);
      }
    });
  }


  //timer
  if(cmd === `${prefix}timer`){
    if(!args[0]){
      message.channel.send(`Format is **${prefix}timer [days]:[hrs]:[min]:(sec) [message]**. Max Timer is 7 days.`)
    }else {
      if(!args[1]){
        var timeMsg = ["Timer is up"];
      }else{
        var timeMsg = args.slice(1, args.length);
      }
      var timeMilli = 0;
      var time = args[0].split(":");
      switch(time.length){
        case 1:
          timeMilli = time[0] * 1000;
          break;
        case 2:
          timeMilli = (time[1] * 1000) + (time[0] * 1000 * 60);
          break;
        case 3:
          timeMilli = (time[2] * 1000) + (time[1] * 1000 * 60) + (time[0] * 1000 * 60 * 60);
          break;
        case 4:
          timeMilli = (time[3] * 1000) + (time[2] * 1000 * 60) + (time[1] * 1000 * 60 * 60) + (time[0] * 1000 * 60 * 60 * 24);
          break;
        }
      if(isNaN(timeMilli)){
        message.channel.send(`Format is **${prefix}timer [days]:[hrs]:[min]:(sec) [message]**. Max Timer is 7 days.`);
      } else {
        if(timeMilli > 604800000){
          message.channel.send("Max Time is 7 days.");
        } else {
          var formatTime = format(timeMilli/1000);
          message.channel.send("Timer set for " + formatTime);
          setTimeout(function() {
            message.channel.send(`${message.author}: ${timeMsg.join(" ")}`);
          }, timeMilli);
        } 
      }
    }
  }

  if (cmd === `${prefix}copypasta`) { //copypasta-list & copypasta add
    let pastas = JSON.parse(fs.readFileSync("./copypasta.json", "utf8"));
    var name = args[0];
    if (!args[0] || args[0 == "help"]) return message.reply(`**usage for that command is ${prefix}copypasta [copypasta name]**`);
    if(!pastas[name]) return message.reply("**that's not a pasta**");
    let pastaContent = pastas[name].pasta;
    message.channel.send("```" + pastaContent + "```");
    //content = pastas[name].content
  }
  if (cmd === `${prefix}copypasta-add`) {
    let pastas = JSON.parse(fs.readFileSync("./copypasta.json", "utf8"));
    let name = args[0];
    if (!args[0] || args[0 == "help"]) return message.reply(`usage for that command is ${prefix}copypasta-add [name] [copypasta]`);
    if(pastas[name]) return message.reply("**that's already a pasta**");
    var content = args.join(" ");
    var content = content.replace(name + " ", "");
    pastas[name] = {
      pasta: content
    };
    let pastaContent = pastas[name].pasta;
    fs.writeFile("./copypasta.json", JSON.stringify(pastas), (err) => {
      if (err) throw err;
    });
    fs.appendFileSync("./copypastas.txt", name + "\r\n");
    message.channel.send("**Uploaded " + name + " copypasta!**");
  }
  if (cmd === `${prefix}copypasta-list`) {
    var listPasta = fs.readFileSync("./copypastas.txt", "utf8");
    message.channel.send("```" + listPasta + "```");
  }



  if (cmd === `${prefix}egg`) {
    fs.readdir("./egg/", function (err, files) { 
      if (!err){
        message.channel.send({
          files: [{
            attachment: './egg/' + files[Math.floor (Math.random() * (files.length - 1 + 1)) + 1],
          }]
        })
      }else{
        throw err;
      }
    });
  }


  if (cmd === `${prefix}cake`) {
    fs.readdir("./CAKE/CAKE/", function (err, files) { 
      if (!err){
        message.channel.send({
          files: [{
            attachment: './CAKE/CAKE/' + files[Math.floor (Math.random() * (files.length - 1 + 1)) + 1],
          }]
        })
      } else {
        throw err;
      }
    });
  }

  if (fs.existsSync("./userlogs/" + message.author.id + ".txt")) {
    fs.appendFile("./userlogs/" + message.author.id + '.txt', message.content, function (err) {
      if (err) throw err;
    });
  } else {
    fs.writeFile("./userlogs/" + message.author.id + '.txt', message.content, function (err) {
    if (err) throw err;
    });
  }
  if (cmd === `${prefix}wordcount`) {
    var Word = args.join(" ");
    var fileContent = fs.readFileSync("./userlogs/" + message.author.id + ".txt/", "utf8");
    var realWord = new RegExp(Word, 'g');
    var countWord = fileContent.match(realWord)||[];
    var finalCount = countWord.length;
    message.channel.send(message.author.username + " has said " + Word + " " + finalCount + " times");
  }
  if (cmd === `${prefix}userwordcount`) {
    var usrAndStr = args.join(" ");
    var Word = usrAndStr.substring(usrAndStr.indexOf(' ')+1)//.split(' ')[1];
    var msgUsr = message.mentions.members.first();
    if (msgUsr === undefined) {
      message.reply(`<@!${msgUsr}> either doesn't exist, or you typed it wrong. As a reminder it should be ${prefix}userwordcount @[USER] [the word or phrase] . Check for additional characters.`);
    } else {
      var msgUsrId = msgUsr.id;
      if (fs.existsSync("./userlogs/" + msgUsrId + ".txt")) {
      var fileContent = fs.readFileSync("./userlogs/" + msgUsrId + ".txt/", "utf8");
      var realWord = new RegExp(Word, 'g');
      var countWord = fileContent.match(realWord)||[];
      var finalCount = countWord.length;
      message.channel.send(`<@!${msgUsr}> has said ${Word} ${finalCount} times`);
      } else {
        message.channel.send(msgUsr + " either doesn't exist, or you typed it wrong. As a reminder it should be _userwordcount @[USER] [the word or phrase] . Check for additional characters.");
      }
    }
  }
  // Start of Voice Chat commands
  if(cmd === `${prefix}iso`){
    let str = isoList.array.join(", ");
    message.reply(str);
  }
  if (cmd === `${prefix}play`) {
    let str = args.join(" ");
    let lang = args.shift();
    if(!isoList.array.includes(lang)){
      switch(lang){
        case 'italian':
          lang = "it-it";
          break;
        case 'spanish':
          lang = "es-pr";
          break;
        case 'japanese':
          lang = "ja";
          break;
        case 'korean':
          lang = "ko"
          break;
        case 'russian':
          lang = "ru";
          break;
        case 'hindi':
          lang = 'hi'
          break;
        case 'portugese':
          lang = "pt-br";
          break;
        case 'german':
          lang = 'de'
          break;
        case 'british':
          lang = "en-gb";
          break;
        case 'french':
          lang = 'fr';
          break;
        case 'chinese':
          lang = "zh-hk";
          break;
        case 'brazilian':
          lang = "pt-br";
          break;
        default:
          args.unshift(lang);
          lang = "en-us";
          break;
      }
    }
    var options = {
  tl: lang
}
    var txt4mp3 = args.join(" ");
    txtomp3.saveMP3(txt4mp3, "tmp.mp3" , options , function(err, absoluteFilePath){
      if(err){
        console.log(err);
        message.reply('dumb');
        return;
      }
      console.log("File saved :", absoluteFilePath); //"File saved : /home/enrico/WebstormProjects/textToMp3/FileName.mp3"
      if (message.channel.type !== 'text') return;

      const voiceChannel = message.member.voice.channel;

      if (!voiceChannel) {
        return message.reply('voice channel who');
      }

      voiceChannel.join().then(connection => {
        const stream = 'tmp.mp3';
        const dispatcher = connection.play(stream);

        dispatcher.on('end', () => voiceChannel.leave());
      });
    })
  }
  if(cmd === `${prefix}allsound`){
    message.channel.send(fs.readdirSync("music/"));
  }
  if (cmd === `${prefix}commence`) {
    var song = args.join(" ");
      if (message.channel.type !== 'text') return;

      const voiceChannel = message.member.voice.channel;

      if (!voiceChannel) {
        return message.reply('please join a voice channel first!');
      }

      if(!fs.existsSync('music/'+ song +'.mp3')) return;
      voiceChannel.join().then(connection => {
        const stream = 'music/' + song + '.mp3';
        const dispatcher = connection.play(stream);

        dispatcher.on('end', () => voiceChannel.leave());
      });
    }


    //Start of Economy Commands

    var checkUserAccExist = function(message){                                     //checks if the user has an account, if not, it creates one for them, put inside if statement 
      let userMoney = JSON.parse(fs.readFileSync("./usermoney.json", "utf8"));  //if you dont want to continue the command if the user doesnt have an account
      if(userMoney[message.author.id] == null){
        message.reply("You didn't have an account with Wonton Bank International, you start off with $200.");
        userMoney[message.author.id] = {
            bal: 200,
            stocks : 0,
            username: message.author.username
        }
        fs.writeFile("./usermoney.json", JSON.stringify(userMoney), (err) => {
          if (err) throw err;
        });
        return false;
      }
      return true;
    }


    if (cmd === `${prefix}stock` || cmd === `${prefix}stocks`){
      CrypPrice.getCryptoPrice(`USD`, `DOGE`).then(obj => { // Base for ex - USD, Crypto for ex - ETH 
        let stock = JSON.parse(fs.readFileSync("./stocks.json", "utf8"));
        let dogePrice = new Number(obj.price);
        let change = (dogePrice-stock.doge)*700000;
        change = new Number(Math.floor(change));
        var newStock = stock.curr+change;
        if(stock.curr+change < config.stockMin) newStock = config.stockMin;
        stock = {
            prev: stock.curr,
            curr: newStock,
            doge: dogePrice
        };
        fs.writeFile("./stocks.json", JSON.stringify(stock), (err) => {
            if (err) throw err;
        });
    }).catch(err => {
        console.log(err);
    });
        let stock = JSON.parse(fs.readFileSync("./stocks.json", "utf8"));
        let embCurr;
        let emb;
        let perChange = (stock.curr/stock.prev-1)*100;
        let perStr = `${perChange}`.substring(0,5);
        if((stock.curr-stock.prev)>0){
            embCurr = `+${stock.curr-stock.prev} (${perStr}%)🔺`;
            emb = new Discord.MessageEmbed()
            .setColor('#edd35f')
            .setTitle('Wonton Stock')
            .setAuthor(client.user.username, client.user.avatarURL())
            .addFields(
                { name: 'Current price', value: `$${stock.curr}`, inline: true },
                { name: 'Change', value: embCurr, inline: true },
                { name: 'Up from', value: `$${stock.prev}` }
            )
            .setTimestamp()
            .setFooter(client.user.username);
        } else if((stock.curr-stock.prev)<0){
            embCurr = `${stock.curr-stock.prev} (${perStr}%)🔻`;
            emb = new Discord.MessageEmbed()
            .setColor('#edd35f')
            .setTitle('Wonton Stock')
            .setAuthor(client.user.username, client.user.avatarURL())
            .addFields(
                { name: 'Current price', value: `$${stock.curr}`, inline: true },
                { name: 'Change', value: embCurr, inline: true },
                { name: 'Down from', value: `$${stock.prev}` }
            )
            .setTimestamp()
            .setFooter(client.user.username);
        } else {
            embCurr = `(No change)`;
            emb = new Discord.MessageEmbed()
            .setColor('#edd35f')
            .setTitle('Wonton Stock')
            .setAuthor(client.user.username, client.user.avatarURL())
            .addFields(
                { name: 'Current price', value: `$${stock.curr}`, inline: true },
                { name: 'Change', value: embCurr, inline: true }
            )
            .setTimestamp()
            .setFooter(client.user.username);
        }
        message.channel.send(emb);
    }
    if(cmd == `${prefix}bal` || cmd == `${prefix}balance`){
      let userMoney = JSON.parse(fs.readFileSync("./usermoney.json", "utf8"));
      var userChecked = '';
      if(args[0] == null){ //no args[0] means user is trying to search for their own balance
        if(checkUserAccExist(message)) userChecked = message.author.id;
      } else {
        if(message.mentions.members.first() == null) return;
        let receiver = message.mentions.members.first().id;
        var receiverExist = false;

        for(var i in userMoney){
          if(i == receiver) receiverExist = true;
        }

        if(!receiverExist) return message.reply("The person you are trying to search for doesn't have a Wonton Bank account.");
        userChecked = receiver;
      }

      var emb = new Discord.MessageEmbed()
      .setColor('#edd35f')
      .setTitle('Wonton Stock - ' + userMoney[userChecked].username)
      .setAuthor(client.user.username, client.user.avatarURL())
      .addFields(
          { name: 'Balance', value: `$${userMoney[userChecked].bal}`, inline: true },
          { name: 'Stocks Owned', value: userMoney[userChecked].stocks, inline: true }
      )
      .setTimestamp()
      .setFooter(client.user.username);

      message.channel.send(emb);
    }
    if(cmd == `${prefix}buy`){
      if(checkUserAccExist(message)){
      
      if(!args[0] || (isNaN(args[0]) && (args[0] != "max"))) return message.reply(`The proper usage for the command you are trying to request currently is **${prefix}buy [amount]**.`);
    
      let stocks = JSON.parse(fs.readFileSync("./stocks.json", "utf8"));
      let userMoney = JSON.parse(fs.readFileSync("./usermoney.json", "utf8"));
      let balance = userMoney[message.author.id].bal;
      let stockAmt = userMoney[message.author.id].stocks;
      let buyAmt;
      if(args[0] == "max"){
        buyAmt = Math.floor(balance/stocks.curr); 
      } else {
        buyAmt = parseInt(args[0]);
      }
      if(buyAmt < 0) return message.reply("negative stocks don't exist");
      let price = stocks.curr * buyAmt;
      let channelID = message.channel;
      let channel = client.channels.cache.filter(channel => channel.id == channelID).first();
      
      async function buy(channel){
        emb = new Discord.MessageEmbed()
        .setColor('#edd35f')
        .setTitle('Wonton Stock - ' + message.author.username)
        .setDescription("☑️ to confirm purchase")
        .setAuthor(client.user.username, client.user.avatarURL())
        .addFields(
            { name: 'Balance', value: `$${balance}`, inline: true },
            { name: `Price for ${args[0]} stock(s)`, value: price, inline: true }
        )
        .setTimestamp()
        .setFooter(client.user.username);

        await message.channel.send(emb);
        let r = channel.messages.cache.filter(message => message.id == client.user.lastMessageID).first();
          r.react('❌');
          r.react('☑️');
          const filter = (reaction, user) => user.id == message.author.id && reaction.emoji.name === '❌' || user.id == message.author.id && reaction.emoji.name === '☑️'; //filter reactions to only the user who called the bot only the 2 emojis
            const collector = r.createReactionCollector(filter, { time: 60*1000, maxEmojis: 1 });
        collector.on('collect', function(msg){ 
          if(msg.emoji.name == '☑️'){
            if(price > balance){
              message.reply("you cant afford that");
            }else{
              balance -= price;
              stockAmt += buyAmt;
              userMoney[message.author.id] = {
                bal: balance,
                stocks: stockAmt,
                username: message.author.username
              }
              fs.writeFile("./usermoney.json", JSON.stringify(userMoney), (err) => {
                if (err) throw err;
              });
              message.reply(`purchase of ${buyAmt} Wonton stock(s) successful`);
            }
          }
        });
      }
      buy(channel);
    }
  }
  if(cmd == `${prefix}sell`){
    if(checkUserAccExist(message)){
      
      if(!args[0] || (isNaN(args[0]) && (args[0] != "all"))) return message.reply(`The proper usage for the command you are trying to request currently is **${prefix}sell [amount]**.`);

      let stocks = JSON.parse(fs.readFileSync("./stocks.json", "utf8"))
      let userMoney = JSON.parse(fs.readFileSync("./usermoney.json", "utf8"));
      let balance = userMoney[message.author.id].bal;
      let userStock = userMoney[message.author.id].stocks;
      
      let sellAmt;
      if(args[0] == "all"){
        sellAmt = userMoney[message.author.id].stocks; 
      } else {
        sellAmt = parseInt(args[0]);
      }

      let price = stocks.curr * sellAmt;
      let channelID = message.channel;
      let channel = client.channels.cache.filter(channel => channel.id == channelID).first();

      if(sellAmt < 0) return message.reply("negative stocks don't exist");
      if(sellAmt > userStock) return message.reply("You don't have enough stocks.");

      async function sell(channel){
        emb = new Discord.MessageEmbed()
        .setColor('#edd35f')
        .setTitle('Wonton Stock - ' + message.author.username)
        .setDescription("☑️ to confirm sale")
        .setAuthor(client.user.username, client.user.avatarURL())
        .addFields(
            { name: 'Balance', value: `$${balance}`, inline: true },
            { name: `Cashout for ${args[0]} stock(s)`, value: "$" +price, inline: true },
            { name: 'New Balance', value: "$" + (balance + price), inline: false }
        )
        .setTimestamp()
        .setFooter(client.user.username);

        await message.channel.send(emb);
        let r = channel.messages.cache.filter(message => message.id == client.user.lastMessageID).first();
          r.react('❌');
          r.react('☑️');
          const filter = (reaction, user) => user.id == message.author.id && reaction.emoji.name === '❌' || user.id == message.author.id && reaction.emoji.name === '☑️'; //filter reactions to only the user who called the bot only the 2 emojis
            const collector = r.createReactionCollector(filter, { time: 60*1000, maxEmojis: 1 });
        collector.on('collect', function(msg){ 
          if(msg.emoji.name == '☑️'){
              balance += price;
              userStock -= sellAmt;
              userMoney[message.author.id] = {
                bal: balance,
                stocks: userStock,
                username: message.author.username
              }
              fs.writeFile("./usermoney.json", JSON.stringify(userMoney), (err) => {
                if (err) throw err;
              });
              message.reply(`sale of ${sellAmt} Wonton stock(s) successful`);
          }
        });
      }
      sell(channel);
    }
  }
  if(cmd == `${prefix}baltop` || cmd == `${prefix}balancetop`){

    let userMoney = JSON.parse(fs.readFileSync("./usermoney.json", "utf8"));
    let sortedArr = [];
    for(var i in userMoney){
      sortedArr.push([userMoney[i].bal, userMoney[i].username, userMoney[i].stocks])
    }
    sortedArr.sort(sortFunction).reverse();

    function sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    };

    var topList = '';
    if(sortedArr.length <= 10) num = sortedArr.length;
    for(var i = 0;i < num;i++){
      topList += "`" + (i + 1) + ".` " + sortedArr[i][1] + ' - $' + sortedArr[i][0] + ', ' + sortedArr[i][2] + ' Stocks \n'
    }
    var exampleEmbed = new Discord.MessageEmbed()
      .setColor('#edd35f')
      .setTitle('Wonton Stock - Baltop')
      .setDescription(topList)
      .setAuthor(client.user.username, client.user.avatarURL(),'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      .setTimestamp()
      .setFooter(client.user.username);

    message.channel.send(exampleEmbed);
  }
  if(cmd == `${prefix}stocktop`){

    let userMoney = JSON.parse(fs.readFileSync("./usermoney.json", "utf8"));
    let sortedArr = [];
    for(var i in userMoney){
      sortedArr.push([userMoney[i].stocks, userMoney[i].username])
    }
    sortedArr.sort(sortFunction).reverse();

    function sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    };

    var topList = '';
    if(sortedArr.length <= 10) num = sortedArr.length;
    for(var i = 0;i < num;i++){
      topList += "`" + (i + 1) + ".` " + sortedArr[i][1] + ' - ' + sortedArr[i][0] + '\n'
    }
    var exampleEmbed = new Discord.MessageEmbed()
      .setColor('#edd35f')
      .setTitle('Wonton Stock - Stock Top')
      .setDescription(topList)
      .setAuthor(client.user.username, client.user.avatarURL(),'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      .setTimestamp()
      .setFooter(client.user.username);

    message.channel.send(exampleEmbed);
  }
  if(cmd == `${prefix}pay`){
    if(checkUserAccExist(message)){
        if(args[0] == null || isNaN(args[1]) || message.mentions.members.first() == null) return message.reply(`The proper usage for the command you are trying to request currently is **${prefix}pay [person] [amount]**.`)

        let userMoney = JSON.parse(fs.readFileSync("./usermoney.json", "utf8"));
        let price = parseInt(args[1]);
        let receiver = message.mentions.members.first().id;
        let receiverExist = false;
        let channelID = message.channel;
        let channel = client.channels.cache.filter(channel => channel.id == channelID).first();

        for(var i in userMoney){
          if(i == receiver) receiverExist = true;
        }

        if(!receiverExist) return message.reply("The person you are trying to give money to doesn't have a Wonton Bank account.");
        if(price > userMoney[message.author.id].bal) return message.reply("You don't have the money for that.")

          async function pay(channel){
            emb = new Discord.MessageEmbed()
          .setColor('#edd35f')
          .setTitle('Wonton Stock - ' + message.author.username)
          .setDescription(`☑️ to confirm transfer of $${price} to ${args[0]}`)
          .setAuthor(client.user.username, client.user.avatarURL())
          .setTimestamp()
          .setFooter(client.user.username);

          await message.channel.send(emb);
          let r = channel.messages.cache.filter(message => message.id == client.user.lastMessageID).first();
            await r.react('❌');
            await r.react('☑️');
            const filter = (reaction, user) => user.id == message.author.id && reaction.emoji.name === '❌' || user.id == message.author.id && reaction.emoji.name === '☑️'; //filter reactions to only the user who called the bot only the 2 emojis
              const collector = r.createReactionCollector(filter, { time: 60*1000, maxEmojis: 1 });
          collector.on('collect', function(msg){ 
            if(msg.emoji.name == '☑️'){
                userMoney[receiver].bal += price;
                userMoney[message.author.id].bal -= price;
                fs.writeFile("./usermoney.json", JSON.stringify(userMoney), (err) => {
                  if (err) throw err;
                });
                message.reply("Transaction successful, New balance: $" + userMoney[message.author.id].bal);
              }
            });
        }
        pay(channel);
      }
  }
  if(cmd == `${prefix}hexcheck`){
    if(args[0] == null) return message.reply("not hex");
    if(/^#[0-9A-F]{6}$/i.test(args[0])) return message.reply("yes hex");
    message.reply("not hex");
  }
  if(cmd === `${prefix}blackjack` || cmd === `${prefix}bj`|| cmd === `${prefix}blowjob`){
    checkUserAccExist(message);

    var winStreak = 0;
    var restart = function(){
      var suits = ["spades", "diamonds", "clubs", "hearts"];
      var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
      var deck = new Array();

      for(var i = 0; i < suits.length; i++){ //deck init shit
      
        for(var x = 0; x < values.length; x++)
        {
          var card = {Value: values[x], Suit: suits[i]};
          deck.push(card);
        }
      }
      
      for (var i = 0; i < 1000; i++) //deck randomizer shit
      {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];
        deck[location1] = deck[location2];
        deck[location2] = tmp;
      }
      
      var getReadHand = function(deck){ //returns a string from a hand, since hands are stored as arrays
        var result = '';
        for(var i = 0; i < deck.length; i++){
          result += deck[i].Value + ' ' + deck[i].Suit + ' ';
        }
        return result;
      }
      
      var getValue  = function(deck){ //returns score of a hand as an integer
        var value = 0;
        var valueArr = [];
        for(var j = 0; j < deck.length; j++){
          valueArr.push(deck[j].Value)
        }
        let ct = 0;
        let nArr = [];
        for(let x of valueArr){ //sorts valueArr to move all "A"s in array to the end 
          if(x=="A"){           //in order to correctly evaluate "A"
            ct++;
          } else {
          nArr.push(x);
          }
        }
        for(i=0;i<ct;i++){
          nArr.push("A");
        }
        for(var i = 0; i < nArr.length; i++){
          switch(nArr[i]){
            case "J": 
            case "Q":
            case "K":
              value += 10;
              break;
            case "A":
              if(value > 10){ // case for dealing with 2 possible "A" values, 11 and 1
                value += 1
              }else{
                value += 11
              }
              break;
            default:
              value += parseInt(nArr[i]);
              break;
          }
        }
        return value;
      }

      var rulesResult = "first to 21 wins, go over 21 and you lose, ties go to the house. \n 👊 to hit, ✋ to stay."; //will show result after win/lose condition has been met
      var playerHand = deck.splice(-2,2); //gives both players 
      var compHand = deck.splice(-2,2);   //two cards to start
      var compHandValue = "?";      //hides COM information from User
      var compReadableHand = '🎴🎴';//until user goes over or stays

      let channelID = message.channel;
      let channel = client.channels.cache.filter(channel => channel.id == channelID).first();
      var gameOver = false;
      var compTurn = false;


      async function game(channel){
        if(getValue(playerHand) > 20){
          if(getValue(playerHand) == 21) {
            winStreak++;
            updateBJjson(message.author.id, winStreak);
            let userMoney = JSON.parse(fs.readFileSync("./usermoney.json", "utf8"));
            let balance = userMoney[message.author.id].bal + 10;
            userMoney[message.author.id].bal = balance;
            fs.writeFile("./usermoney.json", JSON.stringify(userMoney), (err) => {
              if (err) throw err;
            });
            rulesResult = `You Win! \nBalance: $${balance}\nCurrent Win Streak: ${winStreak}\n🔄 to play again`;
          } else {
            updateBJjson(message.author.id, winStreak);
            let bjscore = JSON.parse(fs.readFileSync("./bjscore.json", "utf8"));
            var best = bjscore[message.author.id].highScore;
            winStreak = 0;
            rulesResult = `You Lose... \n Personal Best: ${best}\n🔄 to try again`;
          }
          compReadableHand = getReadHand(compHand).replace(/hearts/g, "❤️").replace(/diamonds/g, "♦️").replace(/spades/g, "♠️").replace(/clubs/g, "♣️");
          compHandValue = getValue(compHand); //reveals COM hand and value after end conditions have been met
          gameOver = true;
        }
        if(compTurn){ //flagged only when user "stays"
          while(getValue(playerHand) > getValue(compHand)){ //continues to pull cards from deck until COM hand 
            compHand.push(deck.pop());                      //value is equal to or greater than user 
          }
          if(!(getValue(compHand) > 21) || getValue(compHand) == getValue(playerHand)){
            updateBJjson(message.author.id, winStreak);
            let bjscore = JSON.parse(fs.readFileSync("./bjscore.json", "utf8"));
            var best = bjscore[message.author.id].highScore;
            winStreak = 0;
            rulesResult = `You Lose... \n Personal Best: ${best}\n🔄 to try again`;
          } else {
            winStreak++;
            updateBJjson(message.author.id, winStreak);
            let userMoney = JSON.parse(fs.readFileSync("./usermoney.json", "utf8"));
            let balance = userMoney[message.author.id].bal + 10;
            userMoney[message.author.id].bal = balance;
            fs.writeFile("./usermoney.json", JSON.stringify(userMoney), (err) => {
              if (err) throw err;
            });
            rulesResult = `You Win! \nBalance: $${balance}\nCurrent Win Streak: ${winStreak}\n🔄 to play again`;
          }
          compReadableHand = getReadHand(compHand).replace(/hearts/g, "❤️").replace(/diamonds/g, "♦️").replace(/spades/g, "♠️").replace(/clubs/g, "♣️");
          compHandValue = getValue(compHand); //reveals COM hand and value after end conditions have been met
          gameOver = true;
        }
        var exampleEmbed = new Discord.MessageEmbed() //embed shit
            .setColor("#d71920")
            .setTitle(message.author.username)
            .setDescription(rulesResult)
            .setAuthor("Blackjack", "https://i7.pngguru.com/preview/77/229/253/blackjack-online-casino-game-baccarat-others.jpg", 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .addFields(
              { name: 'Your Hand(' + getValue(playerHand) + ")", value: getReadHand(playerHand).replace(/hearts/g, "❤️").replace(/diamonds/g, "♦️").replace(/spades/g, "♠️").replace(/clubs/g, "♣️"), inline: true },
              { name: 'COM Hand(' + compHandValue + ")", value: compReadableHand, inline: true },
            )
          await channel.send(exampleEmbed);
          let r = channel.messages.cache.filter(message => message.id == client.user.lastMessageID).first();
          if(!gameOver){
          await r.react('👊'); //reacts to itself to make it 
          await r.react('✋'); //easier for the user to react
          const filter = (reaction, user) => user.id == message.author.id && reaction.emoji.name === '👊' || user.id == message.author.id && reaction.emoji.name === '✋'; //filter reactions to only the user who called the bot only the 2 emojis
          const collector = r.createReactionCollector(filter, { time: 86400000, maxEmojis: 1 });
          collector.on('collect', function(msg){ 
            if(msg.emoji.name == '👊'){
              r.delete(); //deletes the message through every iteration because editing embeds is not a thing you want to do
              playerHand.push(deck.pop()); //gives player another card, checking value happens at the beginning of the function 
              game(channel); //calls function within itself to continue game until end conditions have been met
            } else {
              compTurn = true;
              r.delete();
              game(channel);
            }
          });
        } else{
          await r.react('🔄');
          await r.react('❌');
          const filter = (reaction, user) => user.id == message.author.id && reaction.emoji.name === '🔄' || user.id == message.author.id && reaction.emoji.name === '❌'; 
          const collector = r.createReactionCollector(filter, { time: 86400000, maxEmojis: 1 });
          collector.on('collect', function(msg){ 
            if(msg.emoji.name == '🔄'){
              r.delete();
              restart();
            }
          });
        }
      }
      game(channel);//calls function for the first time
    }
    restart();
      var updateBJjson = function(user, streak){ //updates bjscore json 
        let bjscore = JSON.parse(fs.readFileSync("./bjscore.json", "utf8"));  
        if(bjscore[user] == undefined || bjscore[user].highScore < streak){ 
          bjscore[user] = {
            highScore: streak
          };
          fs.writeFile("./bjscore.json", JSON.stringify(bjscore), (err) => {
            if (err) throw err;
          });
        } 
      }
  }
});


let guildsIndex = 0;
client.on("presenceUpdate", (old, novo) => {
    let guildsTotal = novo.user.client.guilds.cache.size;
    if(guildsIndex==0){
        if(old&&old.activities.some(activity => activity.name=='Spotify')&&!novo.activities.some(activity => activity.name=='Spotify')){
            client.user.setActivity(`yes`, { type: "CUSTOM_STATUS" });
        }
    }
    if(on&&guildsIndex==0){
        for(i=0;i<novo.activities.length;i++){
            if(novo.activities[i].name == 'Spotify'){
                let song = novo.activities[i].details;
                let artist = novo.activities[i].state;
                if(song&&artist) client.user.setActivity(`${song} by ${artist}`, { type: "LISTENING" });
            }
        }
    }
    if(novo.user.id == '149950354778226688'&&guildsIndex==0){
      let channelID;
      if(novo.user.lastMessageChannelID == null){
          channelID = '149956319380504576';
      } else {
          channelID = novo.user.lastMessageChannelID;
      }
      let channel = client.channels.cache.filter(channel => channel.id == channelID).first();
      let stock = JSON.parse(fs.readFileSync("./noah.json", "utf8"));
      let stockIO = Math.floor(Math.random() * 17) - 5;
      let stockIdle = Math.floor(Math.random() * 21) - 10;
      let stockDnD = Math.floor(Math.random() * 31) - 15;
      if(channel){
          if(novo.status == 'online'){
              var newStock = stock.curr+stockIO;
              if(newStock < config.stockMin) newStock = config.stockMin;
              channel.send('NOAH MOMENTS HAVE BEGUN');
              stock.prev = stock.curr;
              stock.curr = newStock;
          } else if(novo.status == 'offline') {
              var newStock = stock.curr-stockIO;
            if(newStock < config.stockMin) newStock = config.stockMin;
              channel.send('NOAH MOMENTS HAVE ENDED');
              stock.prev = stock.curr;
              stock.curr = newStock;
          } else if(novo.status == 'idle') {
              var newStock = stock.curr+stockIdle;
              if(newStock < config.stockMin) newStock = config.stockMin;
              channel.send('NOAH MOMENTS HAVE BEEN PAUSED');
              stock.prev = stock.curr;
              stock.curr = newStock;
          } else {
              var newStock = stock.curr+stockDnD;
              if(newStock < config.stockMin) newStock = config.stockMin;
              channel.send('NOAH MOMENTS HAVE BEEN SUPPRESSED');
              stock.prev = stock.curr;
              stock.curr = newStock;
          }
          fs.writeFile("./noah.json", JSON.stringify(stock), (err) => {
              if (err) throw err;
          });
      }
  }
    guildsIndex++;
    if(guildsIndex==guildsTotal){
        guildsIndex = 0;
    }
});

//functions
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function format(seconds){
      function pad(s){
        return (s < 10 ? '0' : '') + s;
      }
      var days = Math.floor(seconds / (60*60*24));
      var hours = Math.floor(seconds % (60*60*24) / (60*60));
      var minutes = Math.floor(seconds % (60*60) / 60);
      var seconds = Math.floor(seconds % 60);
    
      return pad(days) + ':' + pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  }
//token to login
client.login(config.token);
/*
if(cmd === `${prefix}embed`){
  var exampleEmbed = new Discord.MessageEmbed()
	.setColor(args[0])
	.setTitle('Some title')
	.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
  message.channel.send(exampleEmbed);
}
*/