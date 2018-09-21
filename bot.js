'use strict';
const Discord = require('discord.js');
const bot = new Discord.Client();
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const lineread = require("line-reader");
const penduFile = require("./pendu.js")


//some library
const Clvbot  = require("cleverbot.io");
//**********************//


//some variable
let prefix_com = "!";
class Exam {
  constructor(name,description,date,id){
    let rand = -1;
    if(id == -1){
      while(rand < 0 && isExisting(rand = generateRandom()) >= 0){}
      this.id = rand;
    } else {
      this.id = id;
    }
    this.name = name;
    this.description = description;
    this.date = date;
  }
}
let ArrayExam = [];
let Pendu = new penduFile.Pendu(bot);


//*********************//


bot.login(process.env.BOT_TOKEN);



let cleverbot = new Clvbot('dG686frlxTXoMdzL','OPrEDPXJvX2083V0JBJbQjxBhtusyS7q');
cleverbot.setNick("HackerMen");

bot.on("ready",()=>{
  console.log("I'm here")
  bot.user.setGame("Hacking in progress !");
  Pendu.start(prefix_com);
});


bot.on("message",(message)=>{
  //if message sent by bot
  if(message.author.equals(bot.user)) { return }
  //if message doesn't begin by prefix
  if(!message.content.startsWith(prefix_com)){ return }

  //we get string after the command
  // ex : !help hello -> we get "hello"

  var cmd = message.content.substring(prefix_com.length).split(" ");

  cmd.forEach(elt=>{
    console.log(elt);
  });
  console.log("size : "+cmd.length);

  switch(cmd[0].toLowerCase()){
    case "help":
      console.log("hello");
      let embHelp = new Discord.RichEmbed();
      embHelp.addField("!help","print this",false);
      embHelp.addField("!dice","throw dice with 6 sides",false);
      embHelp.addField("!speak someSentence ","Hey bitch, speak with me",false);
      embHelp.addField("!invit","create invit to this server",false);
      //embHelp.addField("!exam","print exam",false);
      //embHelp.addField("!addExam name description date ","add Exam",false);
      //embHelp.addField("!delexam ID","delete exam with his ID",false);
      embHelp.addField("!insult [Exactname]","insult",false);
      embHelp.addField("!start hour minute","say PAUSE when input time is on her half",false);
      message.channel.send(embHelp);
      break;
    case "invit":
      message.channel.createInvite(false,3600,0,false,"invit").then(function (invit){
        message.channel.send(invit.toString());
      });
      break;
    case "dice":
      message.channel.send("throwing dice : " + Math.round(Math.random() * (7 - 1) + 1));
      break;
    case "speak":
      let fullcmd ="";
      for(let i = 0; i < cmd.length ; i++){
        if(i >= 1){
          fullcmd += cmd[i] + " ";
        }
      }
      console.log(fullcmd);
      cleverbot.create(function (err, session) {
        cleverbot.ask(fullcmd, function (err, response) {
        message.channel.startTyping();
        setTimeout(() => {
          message.channel.send(response);
          message.channel.stopTyping();
        },Math.random() * (1 - 3) + 1 * 1000);
        });
      });
      break;
    // case "exam":
    //     let embExam = new Discord.RichEmbed();
    //     // if(checkIfEmpty() === true){
    //     //   console.log("EXAM : VIDE ");
    //     //   messagebot.login("NDkxNTg1NDA4MjM3NTY4MDIx.DoVZDQ.H2EqSWS-o-UzCpeF4UXFuGLXfv8");.channel.send("No exam yet !");
    //     // } else {
    //       console.log("EXAM : PAS VIDE");
    //       lineread.eachLine("exam.txt",function(line,last){
    //         let parse = line.split(",");
    //         console.log("EXAM : "+ line);
    //         for(let i = 0; i < parse.length ; i ++){
    //           console.log(parse[i]);
    //         }
    //         embExam.addField(parse[0],parse[3]+" - "+parse[1]+" - "+parse[2],false);
    //         if(last){
    //           message.channel.send(embExam);
    //         }
    //       });
    //     // }
    //
    //     // for(let i = 0; i < ArrayExam.length ; i++){
    //     //   emb.addField(ArrayExam[i].name,ArrayExam[i].id+" - "+ArrayExam[i].description+" - "+ArrayExam[i].date,false);
    //     // }
    //
    //   break;
    // case "addexam":
    //   if(cmd.length < 3){
    //     message.channel.send("Arg missed !");
    //     message.channel.send("!addExam Name Description dd-mm-yyyy");
    //     return;
    //   }
    //   let newExam = new Exam(cmd[1],cmd[2],cmd[3],-1);
    //   fs.appendFile("exam.txt","\n"+newExam.name+","+newExam.description+","+newExam.date+","+newExam.id,function(err){
    //     if(err)
    //       return("ERROR 0 : "+console.log(err));
    //     console.log("adding in file done !");
    //   });
    //   message.channel.send("Exam added !");
    //   break;
    // case "delexam":
    //   if(cmd.length < 2){
    //     message.channel.send("Arg missed !");
    //     message.channel.send("!delExam id");
    //     return;
    //   }
    //
    //   if(isExisting(ArrayExam,parseInt(cmd[2]))){
    //
    //     lineread.eachLine("exam.txt",function(line,last){
    //       let parse = line.split(",");
    //       if(parse[3] == parseInt(cmd[2])){
    //         console.log("trouvé le même ID !");
    //       } else {
    //         fs.write("examaux.txt",line,function(err){
    //           if(err)
    //             return("ERROR 1 : "+console.log(err));
    //         });
    //       }
    //       fs.unlink("exam.txt",(err)=>{
    //         if(err)
    //           return("ERROR 2 : "+console.log(err));
    //         console.log("file deleted !");
    //       });
    //       fs.rename("examaux.txt","exam.txt",function(err){
    //         if(err)
    //           return("ERROR 3 : "+console.log(err));
    //         console.log("rename done !");
    //       });
    //     });
    //     checkIfEmpty();
    //     message.channel.send("Exam deleted !");
    //   } else {
    //     message.channel.send("no match with this ID");
    //     return;
    //   }
    //   break;
    case "delmsg":
        if(!cmd[1]){
          if (message.member.hasPermission("MANAGEPendu_MESSAGES")) {
            message.channel.fetchMessages()
            .then(function(list){
              message.channel.bulkDelete(list);
            }, function(err){message.channel.send("I fail to delete msg !")});
          } else {
            message.channel.send("You don't have right to delete msg !");
          }
          // sinon on supprime le nombre de message quil y'a dans la commande
      } else {
          if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.fetchMessages({limit: (parseInt(cmd[1]) + 1) })
            .then(function(list){
              message.channel.bulkDelete(list);
            }, function(err){message.channel.send("I fail to delete " + cmd[1]+"msg !")});
          } else {
            message.channel.send("You don't have right to delete msg !");
          }
      }
      break;
    case "start":
      if(!cmd[1] && !cmd[2]){
        message.channel.send("Arg missed !");
        message.channel.send("!start hour minute");
        return;
      }
      if(isNaN(parseInt(cmd[1])) || isNaN(parseInt(cmd[2]))){
        message.channel.send("Not a number !");
        return;
      }

      let timeout = (parseInt(cmd[1])*3600) + (parseInt(cmd[2])*60);
      console.log("time : "+timeout+" seconde");

      setTimeout(()=>{
        message.channel.send("PAUSE !");
      },(timeout/2)*1000);
      break;
    case "insult":
      if(!cmd[1]){
        request({
          uri: "http://insultron.fr",
        },function(error,response,body){
          let $ = cheerio.load(body);
          let i = 0;
          let text = $("font").text();
          console.log("text : "+text);
          message.channel.send(text);
        });
      } else {
        if(message.channel.type == "dm"){
          console.log("c'est un MP");
          message.channel.send("We are just together ... dont insult people !");
          return;
        }
        let guildmember = getID(cmd[1],message);
        if(guildmember == -1) {
          return;
        }
        request({
          uri: "http://insultron.fr",
        },function(error,response,body){
          let $ = cheerio.load(body);
          let i = 0;
          let text = $("font").text();
          console.log("text : "+text);

          guildmember.user.send(text);
        });
      }
      break;
    case "pendu":

      if (Pendu.Pendu_inGame && message.author.id !== Pendu.Pendu_GamePlayer) {
        message.channel.send("Quelqu'un est deja entrain de joué");
      } else {


        fs.readFile("pendu.txt", function(err, data) {
          if (err) throw err;
          let lines = data.toString().split('\n');

          Pendu.mots = lines[Math.floor(Math.random() * lines.length)];



          Pendu.mots = Pendu.mots.substring(0, Pendu.mots.length);
          console.log("mots : " + Pendu.mots);
          console.log("mots : " + Pendu.mots.length);
          Pendu.Pendu_GamePlayer = message.author.id;
          Pendu.currentLvl = Pendu.lvl0;
          Pendu.Pendu_gameServer = message.channel.name;
          Pendu.devinemot = "";
          Pendu.lettersaid = "";
          for (let i = 0; i < Pendu.mots.length; i++) {
            Pendu.devinemot += "@";
          }
          message.channel.send("Bienvenue dans le jeu du PENDU");
          var emb = new Discord.RichEmbed();
          emb.addField("Pendu", Pendu.devinemot + "\n\n" + Pendu.currentLvl + "\n\n " + Pendu.lettersaid, false);
          message.channel.send(emb);
          //message.channel.send(devinemot + "\n\n"+ currentLvl + "\n\n "+ lettersaid );
          message.channel.fetchMessages({
            limit: 1
          }).then(msg => {
            let tab = msg.array();

            Pendu.Pendu_gameMessage = tab[0];
          }).catch(console.error);

          Pendu.Pendu_inGame = true;
        });
      }
      break;

    default:
      message.channel.send("no match with this command !");
      break;



  }
});


function generateRandom(){
  return(Math.round(Math.random() * (100000 - 1) + 1));
}

function isExisting(array,id){
  for(let i = 0 ; i < array.length ; i++){
    if(array[i].id == id){
      return i;
    }
  }
  return -1;
}

function checkIfEmpty(){
  let empty = true;
  lineread.eachLine("exam.txt",function(line,last){

    console.log("CHECK IF EMPTY TEST : "+line);
    if(line) {
      console.log("PAS VIDE");
      empty = false;
    } else {
      console.log("FICHIER VIDE");
    }
  });
  if(empty){
    fs.unlink("exam.txt",(err)=>{
      if(err)
        return("ERROR checkIfEmpty : "+console.log(err));
      console.log("file deleted in check file !");
    });
    return true;
  }
  return false;
}


function getID(name,message){
    let collectionMember = message.guild.members;
    let tabMember = collectionMember.array();
    for (let i = 0; i < tabMember.length; i++) {
      console.log("tab[" + i + "] = " + tabMember[i].user.username);
    }
    let trouver = false;
    let i = 0;
    while (i < tabMember.length && !trouver) {
      if (tabMember[i].user.username === name) {
        trouver = true;
        console.log("trouver");
      } else {
        i++;
      }
    }
    if (trouver === false) {
      message.channel.send("Pas trouver de personne avec ce nom");
      return -1;
    }
    return(tabMember[i]);
}
//
// let promise = new Promise(function(resolve,reject){
//   resolve(getInsult());
// });
