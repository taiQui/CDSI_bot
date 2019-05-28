"use strict";
const Discord = require('discord.js');
var globalVar = false;
var Channel;
class Vote {
  constructor(bot,channel){
    this.VotedArray = [];
    this.indexArray = [];
    this.bot = bot;
    this.prefix_com = "$";
    this.question = "";
    this.channel = channel;
    this.answer = [];
    this.clock = null;
    this.stop = false;
    this.time = 2;

  }

  findInd(element){
    let find = false;
    let i = 0;
    while(i < this.VotedArray.length && find === false){
      if(this.VotedArray[i] === element){
        find = true;
      }
      i++;
    }
    return find;
  }
  start(channel){
    globalVar = true;
    for(let i = 0; i < this.answer.length ; i++){
      this.indexArray[i] = 0;
    }
    if(this.question === ""){ return; }
    if(this.answer.length === 0){ return; }
    setTimeout(function(){
      globalVar = false;
      Channel.send("Votes closed.");
      //console.log("TEEEEEEEEEEEEEEEEST");
    },(this.time*1000)*60);
    this.channel.send("Vote : "+this.question);
    for(let i = 0 ; i < this.answer.length ; i++){
      this.channel.send("choix "+i+1+ " : "+this.answer[i]);
    }
    this.channel.send("Come on let's go vote ! --> $[choice]");
    this.channel.send(this.time + " minute to vote.");
    this.bot.on("message",(msg)=>{
      //console.log("test1");
      if(msg.channel.name != Channel.name){ return; }
      console.log("test2");
      if(msg.author.equals(this.bot.user) && (msg.content == "Votes closed.")){
        //console.log("hello");
        let emb = new Discord.RichEmbed();
        emb.addField(this.question,this.VotedArray.length+" votes.",false);
        // msg.channel.send(this.question+" : "+this.VotedArray.length+" votes.",false);
        for(let i = 0; i < this.answer.length ; i++){
          emb.addField("Choice "+i,this.answer[i]+ " : "+this.indexArray[i]+" votes. - "+(this.indexArray[i]/this.VotedArray.length)*100 +"%");
          // msg.channel.send(this.answer[i]+" : "+this.indexArray[i]+" votes. - "+(this.indexArray[i]/this.VotedArray.length)*100 +"%");

        }
        msg.channel.send(emb)
        // this.stop();
        return;
      }
      //console.log("test3");
      if(msg.author.equals(this.bot.user)) { return; }
      //console.log("test4");
      if(!msg.content.startsWith(this.prefix_com)){ return; }
      //si y'a pas de vote en cours tu arrete de joué
      //console.log("test5");
      if(globalVar === false){ return; }
      //sit
      //console.log("test6");
      if(this.VotedArray.includes(msg.author.id)) {
        msg.reply("You have already voted ! ");
        return;
      }
      //console.log("test7");
      var cmd = msg.content.substring(this.prefix_com.length).split(" ");
      // console.log("cmd[0] : "+cmd[0]);
      // console.log(cmd[0].length);
      // console.log("answer : "+this.answer);
      // console.log(this.answer[0].length);
      // console.log("cond : "+this.answer.includes(cmd[0]));
      let number = -1;
      if(!this.answer.includes(cmd[0])){
        if(Number.isInteger(parseInt(cmd[0]))){
          number = parseInt(cmd[0]);
          if(number < 0 || number > this.VotedArray.length){
            return;
          }
        } else {
          return;
        }
      }
      //console.log("test8");
      //console.log("test : "+this.answer.findIndex(function(elt){return elt == cmd[0]}));
      if(number != 1){
        this.indexArray[number] += 1;
      } else {
        this.indexArray[this.answer.findIndex(function(elt){return elt == cmd[0]})] += 1;
      }
      this.VotedArray.push(msg.author.id);
      msg.reply("voted !");
    });
  }

  setQuestion(question){
    this.question = question;
  }

  setAnswer(answer){
      this.answer.push(answer.replace(" ",""));
  }
  setChannel(channel){
    this.channel = channel;
    Channel = this.channel;
  }

  setTime(time,msg){
    if(Number.isInteger(time)){
      this.time = time;
    } else {
      msg.reply("Not a number");
    }
  }

  close(){
    this.question = "";
    this.answer = [];
    this.indexArray = [];
    globalVar = false;
    this.VotedArray = [];
  }
}

module.exports.Vote = Vote;
