'use strict';
const Discord = require('discord.js');
const bot = new Discord.Client();


const penduFile = require("./pendu.js");
const CasinoFile = require("./money.js");
const VoteFile = require("./vote.js");
const Puissance4File = require('./puissance4.js');
const Edt = require('./edt.js')


//some library
const Clvbot  = require("cleverbot.io");
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const lineread = require("line-reader");
//**********************//


//some variable

let Master1FI = 1;
let Master2FI = 2;
let Master1FA = 3;
let Master2FA = 4;

let prefix_com = "!";
class Exam {
  constructor(name,description,date,id){
    let rand = -1;
    if(id == -1){
      while(rand < 0 && isExisting(rand = generateRandom()) >= 0){}
      this.id = rand;
    } else {
      this.id = id;
    }env
    this.name = name;
    this.description = description;
    this.date = date;
  }
}
let ArrayExam = [];
let Pendu = new penduFile.Pendu(bot);
// var Casino = new CasinoFile.Casino(bot);
let voteArray = [];
let vote = new VoteFile.Vote(bot);
var HolidayMode = false;
var P4 = null;
var clock;
var cmdban = [];
var bc = [];
var dtime = Date.now();
var etime;
var yolooo = true;
//*********************//


bot.login(process.env.BOT_TOKEN);


let cleverbot = new Clvbot(process.env.CLVB_ID,process.env.CLVB_PSSWD);
cleverbot.setNick("HackerMen");

bot.on("ready",()=>{
  console.log("I'm here");

  bot.user.setGame("Hacking in progress !");
  // Casino.init();
  Pendu.start(prefix_com);
  var time = WaitEnough();
  var day;
  var d = new Date();
  d.setHours(d.getHours()+2);
  bot.channels.get("582307485239476224").send('Online : '+d.toLocaleDateString()+" -- "+d.toLocaleTimeString()+ '   (UTC+2)');
   if(time[1]==1){
     time = time[0]*3600*1000;
     day = d.getDay()+1;
   } else {
     time = time[0]*60*1000;
     day = d.getDay();
   }
   console.log("time to wait "+time/1000+" second");
   setTimeout(function(){
     console.log("executing");
     edt(null,day,bot.channels.get("519610855927709716"),-1,1);
     edt(null,day,bot.channels.get("519610855927709716"),-1,2);
     clock = setInterval(function(){
       var dat = new Date();
       if(HolidayMode === false){
         if(dat.getDay()>= 1 && dat.getDay() <= 5){
           if(verifDay(dat.getDay())){
             edt(null,dat.getDay(),bot.channels.get("519610855927709716"),-1,1);
             edt(null,dat.getDay(),bot.channels.get("519610855927709716"),-1,2);
           }
         }
       }
     },(3600*24)*1000);
   },time);
   dtime = Date.now();
   //edt 1
   setInterval(function(){
     var dateinterval = new Date();
     dateinterval.setHours(dateinterval.getHours()+2);
     dtime = Date.now();
     bot.channels.get("625675545061097472").fetchMessage("625696059179401246").then(function(msg){
       let schedule = new Edt.EDT(1);
       schedule.exec().then(function(emb){
         msg.edit(emb);
       });
     });
     bot.channels.get("625675545061097472").fetchMessage("625696053794177034").then(function(msg){
       msg.edit("Edited : "+dateinterval.toLocaleTimeString()+" - "+dateinterval.toLocaleDateString());
     });
   },((3600*6)+600)*1000);
   //Edt 2
   setInterval(function(){
     var dateinterval = new Date();
     dateinterval.setHours(dateinterval.getHours()+2);
     dtime = Date.now();
     bot.channels.get("625675545061097472").fetchMessage("631869467902738432").then(function(msg){
       let schedule = new Edt.EDT(2);
       schedule.exec().then(function(emb){
         msg.edit(emb);
       });
     });
     bot.channels.get("625675545061097472").fetchMessage("626330134940745728").then(function(msg){
       msg.edit("Edited : "+dateinterval.toLocaleTimeString()+" - "+dateinterval.toLocaleDateString());
     });
   },((3600*7)+600)*1000);
   setInterval(function(){
     var dateinterval = new Date();
     dateinterval.setHours(dateinterval.getHours()+2);
     dtime = Date.now();
     bot.channels.get("625675545061097472").fetchMessage("631869982178934784").then(function(msg){
       let schedule = new Edt.EDT(4);
       schedule.exec().then(function(emb){
         msg.edit(emb);
       });
     });
     bot.channels.get("625675545061097472").fetchMessage("631869955402629160").then(function(msg){
       msg.edit("Edited : "+dateinterval.toLocaleTimeString()+" - "+dateinterval.toLocaleDateString());
     });
   },((3600*8)+600)*1000);



});

function testban(id){
  for(var i = 0; i < cmdban.length; i++){
    if(cmdban[i][1] == id){
      console.log('banned found');
      return true;
    }
  }
  console.log('banned not found');
  return false;
}


bot.on("message",(message)=>{
  //if message sent by bot
  if(message.author.equals(bot.user)) { return }
  //if message doesn't begin by prefix
  if(bc.length > 0){
    for(let i = 0; i < bc.length; i++){
      if(bc[i][0] === message.author.id){
        if(bc[i][1]== null)
          message.delete().then(msg=>console.log("message from "+msg.author.username+" deleted !")).catch(console.error);
        else if(bc[i][1] == message.channel.id){
          message.delete().then(msg=>console.log("message from "+msg.author.username+" deleted !")).catch(console.error);
        }
        return;
      }
    }
  } else {
    console.log("no one is banned!");
  }
  if(!message.content.startsWith(prefix_com)){ return }
  if(P4 !== null){
    if(P4.isInGame() && (P4.controlPlaying(message.author.id))){
      return;
    }
    if(!P4.isInGame()){
      P4 = null;
    }
  }
  //we get string after the command
  // ex : !help hello -> we get "hello"g
  var cmd = message.content.substring(prefix_com.length).split(" ");
  if(testban(message.author.id)) {bot.channels.get("582307485239476224").send(message.author.username+' try to send command while being banned\ncmd : '+cmd[1]);return;}
  cmd.forEach(elt=>{
    console.log(elt);
  });
  var fullcmd ="";
  for(let i = 0; i < cmd.length ; i++){
    if(i >= 1){
      fullcmd += cmd[i] + " ";
    }
  }
  console.log("size : "+cmd.length);
  console.log("message envoyer par : "+message.author.username);
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
      embHelp.addField("!vote:question","add Question for vote",false);
      embHelp.addField("!vote:answer","add one answer for vote",false);
      embHelp.addField("!vote:time","change time you need to vote",false);
      embHelp.addField("!vote:start","start vote !");
      embHelp.addField("!pendu","play !",false);
      // embHelp.addField("!coin","print number of your coin");
      // embHelp.addField("!jackpot","print jackpot");
      // embHelp.addField("!nextcoin","print when you will get next 100 coin");
      // embHelp.addField("!roll","play like in casino");
      embHelp.addField("!rm[stat] [Pseudo RootMe]","Print root-me's point, if rmstat : print statistique");
      embHelp.addField("!p4 [name]","Play Puissance 4 with your friends, put your own name to play in local, put nothing to play vs master 6b3r IA");
      embHelp.addField("!edt class [day]","Print Schedule for specified class\n   Master 1 FI => 1\n   Master 2 FI => 2\n   Master 1 FA => 3\n   Master 2 FA => 4");
      embHelp.addField("!edtnext class","Print next week schedule for specified class, same as edt for class");
      embHelp.addField("!timer [hh:mm:ss]","Run a timer");
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
          if(error){
            message.channel.send('Not insult today - be friendly instead !');
            return;
          }
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
          if(error){
            message.channel.send('Not insult today - be friendly instead !');
            return;
          }
          let $ = cheerio.load(body);
          let i = 0;
          let text = $("font").text();
          console.log("text : "+text);

          guildmember.user.send(text);
          message.reply("A sweet word was sent to "+cmd[1]+" !");
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
          Pendu.Pendu_gameServer = message.channel.name;message
          Pendu.devinemot = "";
          Pendu.lettersaid = "";
          for (let i = 0; i < Pendu.mots.length; i++) {
            Pendu.devinemot += "@";
          }
          message.channel.send("Bienvenue dans le jeu du PENDU");
          var emb = new Discord.RichEmbed();
          emb.addField("Pendu", Pendu.devinemot + "\n\n" + Pendu.currentLvl + "\n\n " + Pendu.lettersaid, false);
          message.channel.send(emb).then(()=>{
            console.log("message envoyé")
            message.channel.fetchMessages({
              limit: 1
            }).then(msg => {

                let tab = msg.array();
                console.log("tab[0] = "+tab[0]);
                Pendu.Pendu_gameMessage = tab[0];
                console.log("message : "+Pendu.Pendu_gameMessage);
            }).catch(console.error)});
          //message.channel.send(devinemot + "\n\n"+ currentLvl + "\n\n "+ lettersaid );


          Pendu.Pendu_inGame = true;
        });
      }
      break;
    case "roll":
      Casino.setMessage(message);
      Casino.Roulette(message.author.id+message.guild.id);
      break;
    // case "jackpot":
    //   Casino.jackpotfonc(message,1);
    //   break;
    // case "coin":
    //   Casino.coin(message.author.id,message.guild.id,message);
    //   break;
    // case "nextcoin":
    //   Casino.nextCoin(message.author.id+message.guild.id,message);
    //   break;
    // case "bailout":
    //   Casino.bailOut();
    //   break;
    case "vote:question":
      if(!cmd[1]){
        message.channel.send("Arg missed !");
        message.channel.send("!vote:question Question");
        return;
      }

      vote.setQuestion(fullcmd);
      break;
    case "vote:answer":
      if(!cmd[1]) {
        message.channel.send("Arg missed !");
        message.channel.send("!vote:answer answer");
        return;
      }
      vote.setAnswer(fullcmd);
      break;
    case "vote:time":
    if(!cmd[1]){
      message.channel.send("Arg missed !");
      message.channel.send("!vote:time time in second");
      return;
    }
      vote.setTime(cmd[1],message);
      break;
    case "vote:start":
      vote.setChannel(message.channel);
      vote.start(message);
      break;
    case "rm":
      request({
        uri: "https://www.root-me.org/"+cmd[1]+"?lang=fr",
      },function(error,response,body){
        let $ = cheerio.load(body);
        let i = 0;
        let text = $(".spip");
         console.log("text : "+text+"a");
        // console.log("size : "+text.length);
        if(text == ""){
          message.channel.send("User "+cmd[1]+" not found !");
          return;
        }
        let span = text.text().split("span");
        let score = span[0].split("\n");
        // score.forEach(a=>{
        //   console.log(j + ": "+a);
        //   j++;
        // });
        message.channel.send(cmd[1] +" - "+ score[3]);
      });
      break;
    case "rmstat":
    request({
      uri: "https://www.root-me.org/"+cmd[1]+"?inc=score&lang=fr",
    },function(error,response,body){
      let $ = cheerio.load(body);
      let i = 0;
      let title = $("h4");
      let pt = $(".gris");
      let number = $(".tl");

      if (pt == "" || title == "" || number == ""){
        message.channel.send("User "+cmd[1]+" not found ! ");
        return;message
      }

      // console.log("title : "+title);
      // ICI !!!!
      let titlesplit = title.text().split("<h4>")[0].split("\n");
      let titleclean = [];
      let compt = 0;
      for(let i = 0; i < titlesplit.length ; i++){
        // console.log("i : "+i+ " :: "+fulltitle[i]);
        if(compt===2){
          // console.log("added ! ");
          titleclean.push(titlesplit[i]);
          compt=0;
        } else {
          compt++;
        }
      }
      let ptsplit = pt.text().split("<span")[0].split("\n");
      compt = 0;
      let cleanpt = [];
      for(let j = 0; j < ptsplit.length; j++){
        // console.log(" i : "+j + " :: "+ptsplit2[j]);
        if(j>=17){
          if(compt<2 || compt ===2){
            // console.log("added ! ");
            cleanpt.push(ptsplit[j]);
            if(compt ===2){
              compt = 0;
            }
          }
          compt++;
        }
      }

      let numberpt = number.text().split("&")[0].split(">")[0].split("\n")[1];
      let rangString = number.text().split("&")[0].split(">")[0].split("\n")[8];
      let place = number.text().split("&")[0].split(">")[0].split("\n")[6];
      let nbchallsuccess = number.text().split("&")[0].split(">")[0].split("\n")[3];
      let embRm = new Discord.RichEmbed();
      embRm.addField(cmd[1]+" - "+numberpt,"rang : "+rangString+" : "+place+"\nChallenge successed : "+nbchallsuccess,false);
      compt = 0;
      for(let i = 0; i < titleclean.length; i++){
        embRm.addField(titleclean[i]+" "+cleanpt[compt+1],cleanpt[compt]+" successed.");
        compt+=2;
      }
      message.channel.send(embRm);

    });
      break;
    case "edt":
      message.reply('edt not available now - probably maintenance');
      return;
      if(!cmd[1]){ message.channel.send("Syntaxe Error =>  !help");return;}
      if(cmd[1] !== "1" && cmd[1] !== "2" && cmd[1] !== "3" && cmd[1] !== "4"){message.channel.send("Syntaxe Error =>  !help");return;}
      if((Number.isInteger(parseInt(cmd[2]))) && cmd[2]){
        if(parseInt(cmd[2])>=1 && parseInt(cmd[2])<= 5){
          edt(message,parseInt(cmd[2]),null,-1,parseInt(cmd[1]));
          return;
        } else {
          message.channel.send("not valid day ! [1-5] ");
        }
      } else if(!cmd[2]) {
        edt(message,null,null,-1,parseInt(cmd[1]));
      } else {
        message.channel.send("not a number ! ");
        return;
      }
      break;
    case "holiday":
      if(!cmd[1]){
        message.channel.send("Arg missed ! ");
        return;
      }
      if(cmd[1] === "true"){
        HolidayMode = true;
        message.channel.send("holiday now set to "+HolidayMode);
      } else if( cmd[1] === "false"){
        HolidayMode = false;
        message.channel.send("holiday now set to "+HolidayMode);
      }
      break;
    case "timer":
      if(!cmd[1]){
        message.channel.send('Arg missed ! => !time HH:MM:SS');
        return;
      }
      if(cmd[1].split(':')[0].length != 2 || cmd[1].split(':')[1].length != 2 || cmd[1].split(':')[2].length != 2 || isNaN(parseInt(cmd[1].split(':')[0])) || isNaN(parseInt(cmd[1].split(':')[1])) || isNaN(parseInt(cmd[1].split(':')[2]))){
        message.channel.send('Fail with arg ! => !time HH:MM:SS');
        return;
      }
      var msg = ""
      for(let j = 2; j < cmd.length;j++){
        msg+=cmd[j];
        msg+=" ";
      }
      setTimeout(function(){
        rep(message,msg);
      },(parseInt(cmd[1].split(':')[0]*3600)+parseInt(cmd[1].split(':')[1]*60)+parseInt(cmd[1].split(':')[2]))*1000);
      message.channel.send('Timer start !');
      break;
    case "edtnext":
      etime = Date.now();
      if(((etime - dtime)/1000.0)/60.0 < 35 ) {
        let time2wait = 35 - (((etime - dtime)/1000.0)/60.0);
        message.reply('Can use this at this moment - time to wait approximately : '+time2wait+" minutes");

        return;
      }
      if(((etime - dtime)/1000.0)/60.0 > 90){
        let time2wait = (60*8) - (((etime - dtime)/1000.0)/60.0);
        message.reply('Can use this at this moment - time to wait approximately : '+time2wait+" minutes");
        return;
      }
      dtime = Date.now();
      if(!cmd[1]){
        message.reply('Syntax Error => !help')
      } else {
        if(cmd[1] !== "1" && cmd[1] !== "2" && cmd[1] !== "3" && cmd[1] !== "4"){message.channel.send("Syntaxe Error =>  !help");return;}
        edt(message,null,null,1,parseInt(cmd[1]));
      }
      break;
    case "p4":
      let bot_or_not = 0;
      let player2;
      if(!cmd[1]){
        cmd[1] = "The BOT";
        bot_or_not = 1;
        player2 = "BOT";
      } else {
        if(P4 !== null){
          if(P4.isInGame()){
            message.channel.send('Someone is currently playing');
            return;
          }
        }
        player2 = getIdPerson(message,cmd[1]);
        if(player2 === "-1"){
          message.channel.send('Name not found');
          return;
        }
      }
      let embP4 = new Discord.RichEmbed();
      embP4.addField('Puissance 4','Player 1 : '+message.author.username+'\nPlayer 2 : '+cmd[1]+'\nTo speak in playing put \'&\'before your message\nSend STOP to stop the game',false);
      message.channel.send(embP4);
      message.channel.send('Game grid loading...');
      message.channel.fetchMessages({
        limit: 1
      }).then(msg => {
        P4 = new Puissance4File.Puissance4(bot);
        P4.init(message.author.id,player2,message.channel.name,msg.array()[0],bot_or_not);
        P4.printGrid(message);
      });
      break;
    case "spam":
      if(!cmd[1]) return;
      if(message.author.username!= "taiQui") { return;}
      if(message.author.id != "255708563635175425") { return;}
      if(message.author.tag != "taiQui#8650") { return; }
      var aux = message.guild.channels.array();

      var id = getIdPerson(message,cmd[1]);
      if(id == "-1") { console.log('no dude with this id'); return;}

      for(var i = 0; i < aux.length; i++){
        if(aux[i].type == "text"){
          bot.channels.get(aux[i].id).send("<@"+id+"> SPAM");
        }
      }
      var aux = bot.users.array()
      var i = 0;
      var yolo = true;
      while(i < aux.length && yolo){
        if(aux[i].id == id){
          aux[i].send("SPAM");
          yolo = false;
        }
        i+=1;
      }
      break;
    case "bc":
      if (!cmd[1]) return;
      // get role
      var timed = 5;
      if (message.member.roles.has('491584433472929793') || message.author.id === "255708563635175425"){
        if(cmd[2]){
          if(Number.isInteger(parseInt(cmd[2]))){
            timed = parseInt(cmd[2]);
          } else{
            message.reply('NaN error');
            return;
          }
        }
        var id = getIdPerson(message,cmd[1]);
        if (id == "-1") {console.log('no guys found with this name');return;}
        for(let i = 0; i < bc.length; i++){
          if (bc[i][0] == id){
            message.reply(cmd[1]+" is already banned from chat");
            return;
          }
        }
        if(cmd[3]){
          if (cmd[3] == "true")
            bc.push([id,message.channel.id]);
           else
            bc.push([id,null])
        } else
          bc.push([id,null]);
        message.reply(cmd[1]+" is banned from chat");
      } else{
        message.reply('Not enough right !');
      }
      setTimeout(function(){
        unban(id,message,cmd[1]);
      },(timed*1000)*60);
      break;
    case "ubc":
      if(!cmd[1]) return;
      var id = getIdPerson(message,cmd[1]);
      if (id == "-1") {console.log('no guys found with this name');return;}
      for(var i = 0; i < bc.length;i++){
        if (bc[i][0] === id){
          bc = bc.slice(0,i).concat(bc.slice(i+1,bc.length));
          message.channel.send(cmd[1]+' can now speak');
          return;
        }

      }
      message.reply(cmd[1] + " is not banned");
      break;
    case "cmdban":
      if(!cmd[1]) return;
      if(message.author.username!= "taiQui") { return;}
      if(message.author.id != "255708563635175425") { return;}
      if(message.author.tag != "taiQui#8650") { return; }
      var id = getIdPerson(message,cmd[1]);
      if (id == "255708563635175425" ) {message.channel.send('Cant ban the boss');return;}
      if (id == "-1") {console.log('no guys found with this name');return;}
      if(testban(id)) { message.channel.send(message.author.username+ " is already banned !");return;}
      cmdban.push([cmd[1],id]);
      message.channel.send(cmd[1]+" is now blacklisted to use command");
      break;
    case "cmdunban":
      if(!cmd[1]) return;
      if(message.author.username!= "taiQui") { return;}
      if(message.author.id != "255708563635175425") { return;}
      if(message.author.tag != "taiQui#8650") { return; }
      var id = getIdPerson(message,cmd[1]);
      if(id == "-1"){console.log('no guys found with this name');return;}
      for(var i = 0; i < cmdban.length;i++){
        if (cmdban[i][1] == id){
          cmdban = cmdban.slice(0,i).concat(cmdban.slice(i+1,cmdban.length));
          message.channel.send(cmd[1]+' can now use command');
          return;
        }
      }
      break;
    case "cmdbanlist":
      let embban = new Discord.RichEmbed();
      embban.addField('Banned','Name + id');
      for(var i = 0; i < cmdban.length; i++){
        embban.addField(cmdban[i][0],'ID : '+cmdban[i][1]);
      }
      message.channel.send(embban);

      break;
    default:
      message.channel.send("no match with this command !");
      break;

  }
});
// END OF EVENT MESSAGE

bot.on('raw', packet => {
    // We don't want this to run on unrelated packets
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    // Grab the channel to check the message from
    const channel = bot.channels.get(packet.d.channel_id);
    // There's no need to emit if the message is cached, because the event will fire anyway for that
    if (channel.messages.has(packet.d.message_id)) return;
    // Since we have confirmed the message is not cached, let's fetch it
    channel.fetchMessage(packet.d.message_id).then(message => {
        // Emojis can have identifiers of name:id format, so we have to account for that case as well
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        // This gives us the reaction we need to emit the event properly, in top of the message object
        const reaction = message.reactions.get(emoji);
        // Adds the currently reacting user to the reaction's users collection.
        if (reaction) reaction.users.set(packet.d.user_id, bot.users.get(packet.d.user_id));
        // Check which type of event it is before emitting
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            bot.emit('messageReactionAdd', reaction, bot.users.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            bot.emit('messageReactionRemove', reaction, bot.users.get(packet.d.user_id));
        }
    });
});


bot.on("messageReactionAdd",(reaction,user)=>{
  if(!user) return;
  if(user.bot) return;
  console.log('type :'+reaction);
  let role = "";
  if(reaction.message.id == "619622989323042816"){
    reaction.message.guild.member(user).addRole("619596015615344669").catch(console.error);
  } else if (reaction.message.id == "619623025557372951"){
    reaction.message.guild.member(user).addRole("514021108484276224").catch(console.error);
  }
});

bot.on("messageReactionRemove",(reaction,user)=>{
  if(!user) return;
  if(user.bot) return;
  if(!reaction.message.channel.guild) return;
  let role = "";
  if(reaction.message.id == "619622989323042816"){
    reaction.message.guild.member(user).removeRole("619596015615344669").catch(console.error);
  } else if (reaction.message.id == "619623025557372951"){
    reaction.message.guild.member(user).removeRole("514021108484276224").catch(console.error);
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
      console.log("PAS VIDE");message
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
      message.channel.send("no one find with this name !");
      return -1;
    }
    return(tabMember[i]);
}
//
// let promise = new Promise(function(resolve,reject){
//   resolve(getInsult());
// });
function getIdPerson(message, name) {
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
  if (trouver === true) return tabMember[i].user.id;
  if (trouver === false) return "-1";
}

function DateParsing(message,jour,oclock,html,classe){
  console.log('-------------------\n\n\n\n');
  var test = html.match(/<td class="blank_column"><b>(.|\n|\r)*<tr class="even_row"><td class="blank_column" colspan="58">/gi);
  if(test === null){
    message.channel.send('Error ! not loaded or no class !');
    return;
  }
  var test1 = test[0].split("<td class=\"blank_column\" colspan=\"58\">");
  for(let i = 0; i < test1.length; i++){
    if(test1[i] == ""){
      test1.splice(i,1);
    }
  }
  var embedt = new Discord.RichEmbed();
  switch(classe){
    case Master1FI:
      embedt.addField('Master 1 FI - Schedule !',"###############################");
      break;
    case Master2FI:
      embedt.addField('Master 2 FI - Schedule !',"###############################");
      break;
    case Master1FA:
      embedt.addField('Master 1 FA - Schedule !',"###############################");
      break;
    case Master2FA:
      embedt.addField('Master 2 FA - Schedule !',"###############################");
      break;
  }
  var i = 0;
  var red = 0;
  while(i < test1.length -1 ){
    var Day = test1[i].match(/blank_column"><b>[a-zA-Z0-9. -]+/g);
    // console.log("--------------------------- "+Day[0]+"\n\n");
    var Heure = test1[i].match(/(TD|TP|CM|AUTRE|RES)"><tbody><tr><td><b>([0-9:-]+)/g);
    var Type = test1[i].match(/info_bulle"><br\/><br\/><b>[A-Z0-9 ]+\./g);
    var Cour = test1[i].match(/content_bulle"><u>[a-zA-Z0-9- ()]+/g);
    var location = test1[i].match(/rouge'>[A-Z0-9() -]+/g);
    var prof = test1[i].match(/vert'>[A-Za-z ]+/g);
    // if(Heure != null)
    // // console.log("heure : "+Heure+" : "+Heure.length);
    // if(Type != null)
    // // console.log("type : "+Type+" : "+Type.length);
    // if(Cour != null)
    // // console.log("cours : "+Cour+" : "+Cour.length);
    // if(location != null)
    // // console.log("location : "+location+" : "+location.length);
    // if(prof != null)
    // // console.log("prof : "+prof+" : "+prof.length);
    if(jour != null){
      if(jour-1 === i){
        embedt.addField(Day[0].split("<b>")[1],"-------------------------------");
      }
    } else {
      embedt.addField(Day[0].split("<b>")[1],"-------------------------------");
    }
    console.log('HEURE :'+Heure);
    if(Heure != null){
      for(let j = 0; j < Heure.length; j++){
        var Coursaux = "";
        var Heureaux = "";
        var Typeaux = "";
        var Locationaux = "";
        var Profaux = "";
        try {
          Coursaux = Cour[j].split("<u>")[1];
        }catch(err){
          Coursaux = "undefined";
        }
        try{
          Heureaux = Heure[j].split("<b>")[1];
        }catch(err){
          Heureaux = "undefined";
        }
        try{
          Typeaux = Type[j].split("<b>")[1];
        }catch(err){
          Typeaux = "undefined";
        }
        try{
          Locationaux = location[j].split(">")[1];
        }catch(err){
          Locationaux = "undefined";
        }
        try{
          Profaux = prof[j].split(">")[1];
        }catch(err){
          Profaux = "undefined";
        }

        // console.log("ite : "+j);
        if (location !== null) {
          if(Locationaux === "undefined"){
            var ez = test1[i].match(/style="color:[a-z]*;"><br\/>[A-Z0-9]*<\/span>/g);
            // console.log('------------------------');
            // console.log(ez);

            Locationaux = "a>"+ez[red].split('<br/>')[1].split('</span>')[0];
            Locationaux = Locationaux.split(">")[1];
            red+=1;
          }
        }
        if (prof !== null) {
          if(Profaux === "undefined"){
            var ez = test1[i].match(/style="color:[a-z]*;"><br\/>[A-Z0-9]*<\/span>/g);
            // console.log('------------------------');
            console.log(ez);
            try{
              Profaux = "a>"+ez[red].split('<br/>')[1].split('</span>')[0];
              Profaux = Profaux.split(">")[1]
              red+=1;
            }catch(err){
              console.log('err prof - ez : '+ez);
              console.log('err prof - ref : '+red);
            }
          }
        }
        if(prof != null){
          if(jour != null){
            if(jour-1 === i){
              embedt.addField(Coursaux,Heureaux+" "+Typeaux+" en "+Locationaux+" avec "+Profaux);
            }
          } else {
            embedt.addField(Coursaux,Heureaux+" "+Typeaux+" en "+Locationaux+" avec "+Profaux);
          }

        }  else {
          if(jour != null){
            if(jour-1 === i){
              embedt.addField(Coursaux,Heureaux+" "+Typeaux+" en "+Locationaux+" avec un prof non specifié sur l'edt");
            }
          } else {
            embedt.addField(Coursaux,Heureaux+" "+Typeaux+" en "+Locationaux+" avec un prof non specifié sur l'edt");
          }

        }
      }
    } else {
      if(jour != null){
        if(jour-1 === i){
          embedt.addField("no class found !","ez");
        }
      } else {
        embedt.addField("no class found !","ez");
      }

    }
    i++;
  }

  if(oclock === null){

    if(jour != null){
        if(embedt.fields.length > 0)
          message.channel.send(embedt);
    } else {
        if(embedt.fields.length > 0)
          message.channel.send(embedt);
    }
  } else {
    if(jour != null){
        if(jour === new Date().getDay())
          if(embedt.fields.length > 0)
            oclock.send(embedt);
    } else {
        if(embedt.fields.length > 0)
          oclock.send(embedt);
    }
  }
}


function edt(message,jour,oclock,next,classe){
  request({
    uri: "https://cas.uphf.fr/cas/login?service=https%3A%2F%2Fvtmob.uphf.fr%2Fesup-vtclient-up4%2Fstylesheets%2Fdesktop%2Fwelcome.xhtml",
    followAllRedirects: true
  },function(error,response,body){
    var _lt = body.match(/LT-[0-9]+-[a-zA-Z0-9]+-cas\.uphf\.fr/g)[0];
    var _exec =body.match(/execution" value="[a-zA-Z0-9]+/g)[0].split("=")[1].replace("\"","");
    var _evt = "submit";
    var _ipadress = body.match(/ipAddress" value="[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/g)[0].split("=")[1].replace("\"","");
    var _useragent = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) \\ Gecko/20100101 Firefox/40.1"
    var _submit ="Connexion";
    var sessionid = body.match(/jsessionid=[a-zA-Z0-9]+/g)[0].split("=")[1];
    var username = "";
    var password = "";
    if(classe === Master1FI){
      username = process.env.ISTVUM1;
      password = process.env.ISTVPM1;
    } else if (classe === Master2FI){
      username = process.env.ISTVUSER;
      password = process.env.ISTVPASS;
    } else if (classe === Master1FA){

    } else if (classe === Master2FA){

    }
    var form_data = {
      'username': username,
      'password': password,
      'lt': _lt,
      'execution': _exec,
      '_eventId': 'submit',
      'ipAddress': _ipadress,
      'userAgent': _useragent,
      'submit': 'Connexion'
    }
    var header ={
      'Host': 'cas.uphf.fr',
      'Referer': 'https://cas.uphf.fr/cas/login?service=https%3A%2F%2Fvtmob.uphf.fr%2Fesup-vtclient-up4%2Fstylesheets%2Fdesktop%2Fwelcome.xhtml',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) \\ Gecko/20100101 Firefox/40.1',
      'Cookie': response.headers['set-cookie'],
      'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.9'
    }
    var  option = {
        jar: true,
        followAllRedirects: true,
        uri : 'https://cas.uphf.fr/cas/login?service=https%3A%2F%2Fvtmob.uphf.fr%2Fesup-vtclient-up4%2Fstylesheets%2Fdesktop%2Fwelcome.xhtml',
        method: 'POST',
        headers: header,
        form: form_data
    };



    request(option,function(err,resp,bodyy){
      if(err){
        console.log("err : "+err);
        exit();
      }
      console.log("status : "+resp.statusCode);
      if(next === -1){
          // console.log('html : '+html);
          DateParsing(message,jour,oclock,bodyy,classe);

      } else {
        var header ={
          'Host': 'vtmob.uphf.fr',
          'Referer': 'https://vtmob.uphf.fr/esup-vtclient-up4/stylesheets/desktop/welcome.xhtml',
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) \\ Gecko/20100101 Firefox/40.1',
          'Cookie': resp.headers['set-cookie'],
          'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.9'
        }
        var formdata = {
          'org.apache.myfaces.trinidad.faces.FORM':'form_week',
          '_noJavaScript':'false',
          'javax.faces.ViewState':'!'+next.toString(),
          'form_week:_idcl':'form_week:btn_next'
        }
        var  option = {
            jar: true,
            followAllRedirects: true,
            uri : 'https://vtmob.uphf.fr/esup-vtclient-up4/stylesheets/desktop/welcome.xhtml',
            method: 'POST',
            headers: header,
            form: formdata
        };
        request(option,function(erro,response,body){

            DateParsing(message,jour,oclock,body,classe);

          // console.log(erro);
          // console.log(response);
        });
      }


    });

  });
  return;
}

function WaitEnough(){
  var d = new Date();
  var compt = 0;
  if(d.getHours()!=6){
    while(d.getHours()!= 6){
      d.setHours(d.getHours()+1);
      compt++;
    }
    return([compt,1]);
  } else {
    while(d.getMinutes()!= 1){
      d.setMinutes(d.getMinutes()+1);
      compt++;
    }
    return([compt,2]);
  }
}

function rep(message,msg){
  if(msg)
    message.reply('Time Up ! - '+msg);
  else
    message.reply('Time Up !');
}

function verifDay(date1){
  var date = new Date();
  return((date.getDay() === date1)&&(date.getDay() >=1 && date.getDay()<=5));
}

function unban(id,message,name){
  console.log('yolo');
  for(var i = 0; i < bc.length;i++){
    if (bc[i][0] === id){
      bc = bc.slice(0,i).concat(bc.slice(i+1,bc.length));
      message.channel.send(name+' can now speak');
      return;
    }

  }
}
