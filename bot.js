'use strict';
const Discord = require('discord.js');
const bot = new Discord.Client();
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const lineread = require("line-reader");


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
//*********************//


bot.login(process.env.BOT_TOKEN);

let cleverbot = new Clvbot('dG686frlxTXoMdzL','OPrEDPXJvX2083V0JBJbQjxBhtusyS7q');
cleverbot.setNick("HackerMen");

bot.on("ready",()=>{
  console.log("I'm here")
  bot.user.setGame("Hacking in progress !");
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
      var emb = new Discord.RichEmbed();
      emb.addField("!help","print this",false);
      emb.addField("!dice","throw dice with 6 sides",false);
      emb.addField("!invit","create invit to this server",false);
      emb.addField("!speak someSentence ","Hey bitch, speak with me",false);
      emb.addField("!exam","print exam",false);
      emb.addField("!addExam name description date ","add Exam",false);
      emb.addField("!delexam ID","delete exam with his ID",false);
      emb.addField("!start hour minute","say PAUSE when input time is on her half",false);
      message.channel.send(emb);
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
    case "exam":
        var emb = new Discord.RichEmbed();
        if(checkIfEmpty()){
          console.log("EXAM : VIDE ");
          message.channel.send("No exam yet !");
        } else {
          console.log("EXAM : PAS VIDE");
          lineread.eachLine("exam.txt",function(line,last){
            let parse = line.split(",");
            emb.addField(parse[0],parse[3]+" - "+parse[1]+" - "+parse[2],false);
          });
          message.channel.send(emb);
        }

        // for(let i = 0; i < ArrayExam.length ; i++){
        //   emb.addField(ArrayExam[i].name,ArrayExam[i].id+" - "+ArrayExam[i].description+" - "+ArrayExam[i].date,false);
        // }

      break;
    case "addexam":
      if(cmd.length < 3){
        message.channel.send("Arg missed !");
        message.channel.send("!addExam Name Description dd-mm-yyyy");
        return;
      }
      let newExam = new Exam(cmd[1],cmd[2],cmd[3],-1);
      fs.writeFile("exam.txt",newExam.name+","+newExam.description+","+newExam.date+","+newExam.id,function(err){
        if(err)
          return("ERROR 0 : "+console.log(err));
        console.log("adding in file done !");
      });
      message.channel.send("Exam added !");
      break;
    case "delexam":
      if(cmd.length < 2){
        message.channel.send("Arg missed !");
        message.channel.send("!delExam id");
        return;
      }

      if(isExisting(ArrayExam,parseInt(cmd[2]))){

        lineread.eachLine("exam.txt",function(line,last){
          let parse = line.split(",");
          if(parse[3] == parseInt(cmd[2])){
            console.log("trouvé le même ID !");
          } else {
            fs.write("examaux.txt",line,function(err){
              if(err)
                return("ERROR 1 : "+console.log(err));
            });
          }
          fs.unlink("exam.txt",(err)=>{
            if(err)
              return("ERROR 2 : "+console.log(err));
            console.log("file deleted !");
          });
          fs.rename("examaux.txt","exam.txt",function(err){
            if(err)
              return("ERROR 3 : "+console.log(err));
            console.log("rename done !");
          });
        });
        checkIfEmpty();
        message.channel.send("Exam deleted !");
      } else {
        message.channel.send("no match with this ID");
        return;
      }
      break;
    case "delmsg":
        if(!cmd[1]){
          if (message.member.hasPermission("MANAGE_MESSAGES")) {
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
            message.channel.fetchMessages({limit: (parseInt(commande[1]) + 1) })
            .then(function(list){
              message.channel.bulkDelete(list);
            }, function(err){message.channel.send("I fail to delete " + commande[1]+"msg !")});
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
    request({
      uri: "http://insultron.fr",
    },function(error,response,body){
      let $ = cheerio.load(body);
      let i = 0;
      let text = $("font").text();
      console.log("text : "+text);
      message.reply(text);
    });
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

//
// let promise = new Promise(function(resolve,reject){
//   resolve(getInsult());
// });
