


const Discord = require('discord.js');
class Pendu {
  constructor(bot){
    this.lvl0 = "";
    this.lvl1 = "___ _____ ___ ______ ____";
    this.lvl2 = "    |\n    |\n    |\n    |\n___ _____ ___ __";
    this.lvl3 = "----------------\n    |\n    |\n    |\n    |\n___ _____ ___ ______ ____";
    this.lvl4 = "----------------\n    |      |\n    |      |\n    |\n    |\n    |\n    |\n___ _____ ___ ______ ____";
    this.lvl5 = "----------------\n    |      |\n    |      |\n    |      0\n    |\n    |\n    |\n___ _____ ___ ______ ____";
    this.lvl6 = "----------------\n    |      |\n    |      |\n    |      0\n    |      |\n    |\n    |\n___ _____ ___ ______ ____";
    this.lvl7 = "----------------\n    |      |\n    |      |\n    |      0\n    |     -|\n    |\n    |\n___ _____ ___ ______ ____";
    this.lvl8 = "----------------\n    |      |\n    |      |\n    |      0\n    |     -|-\n    |\n    |\n___ _____ ___ ______ ____";
    this.lvl9 = "----------------\n    |      |\n    |      |\n    |      0\n    |     -|-\n    |     /\n    |\n___ _____ ___ ______ ____";
    this.lvl10 = "----------------\n    |      |\n    |      |\n    |      0\n    |     -|-\n    |     /\\\n    |\n___ _____ ___ ______ ____";
    this.Pendu_inGame = false;
    this.Pendu_GamePlayer = 0;
    this.mots = "";
    this.devinemot = "";
    this.currentLvl = this.lvl0;
    this.lettersaid = "";
    this.Pendu_gameMessage;
    this.Pendu_gameServer = "";
    this.bot = bot;
  }

  stop(){
    this.Pendu_inGame = false;
    this.Pendu_GamePlayer = 0;
    this.mots = "";
    this.devinemot = "";
    this.currentLvl = this.lvl0;
    this.lettersaid = "";
    this.Pendu_gameMessage;
    this.Pendu_gameServer = "";
  }

  start(prefix_com,){
    this.bot.on('message', (msg) => {
      if (this.Pendu_inGame === false) {
        return
      }
      if (this.Pendu_gameServer !== msg.channel.name) {
        return
      }
      if (msg.author.id !== this.Pendu_GamePlayer) {
        return
      }
      if (msg.content.startsWith("&")) {
        return;
      }
      if (msg.content.startsWith(prefix_com)) {
        msg.channel.send("Tu es en plein jeux, envoie \"STOP\n au 3616 pour arreter le jeux");
        setTimeout(function(message) {
          msg.channel.fetchMessages({
            limit: 2
          }).then(function(list) {
            let tab = list.array();
            tab[0].delete();
            tab[1].delete();
          });
        }, 2000);
        return;
      }
      if (msg.author.equals(this.bot.user)) {
        return
      } // si c'est un bot qui ecrit
      if (msg.content === "STOP") {
        msg.channel.send("Jeu terminer ... 🖕 ");
        this.Pendu_inGame = false;
        return;
      }
      if (msg.content === "HELP") {
        msg.channel.send("taper \"STOP\" pour arreter le jeux")
      }
      if (msg.content.length > 1) {
        if (msg.content === this.mots) {
          msg.channel.send("T'as trouver le bon mot ... :ok_hand: ");
          this.Pendu_inGame = false;
          return;
        } else {
          msg.channel.send("Une lettre par une lettre s'il te plait !");
          setTimeout(function(message) {
            msg.channel.fetchMessages({
              limit: 1
            }).then(function(list) {
              let tab = list.array();
              tab[0].delete();
            });
          }, 2000);
        }
      }
      console.log("devine : " + this.devinemot);
      console.log("Pendu_inGame : " + this.Pendu_inGame);
      //msg.channel.send(msg.content);
      if (this.Pendu_inGame) { // si le jeu du pendu est lancé

        //console.log("message biatch : "+ Pendu_gameMessage.content);
        let letter = msg.content;
        console.log("lettre : " + letter);

        if (this.mots.includes(msg.content) && (!this.devinemot.includes(msg.content))) {
          for (let i = 0; i < this.mots.length; i++) {
            if (this.mots.charAt(i) === letter) {

              //  console.log("test : "+ devinemot + '\n' + "test 2 : "+ devinemot[i]);
              //devinemot.charAt(i) = letter;
              //console.log("testA : " + devinemot +"\n testB : "+devinemot.substring(0,i) + "\n testC : "+devinemot.substring(i+1,devinemot.length));
              this.devinemot = this.devinemot.substring(0, i) + letter + this.devinemot.substring(i + 1, this.devinemot.length);
              //  console.log(devinemot);
            }
          }
          this.lettersaid += letter + " ";
          var emb = new Discord.RichEmbed();
          emb.addField("Pendu", this.devinemot + "\n\n" + this.currentLvl + "\n\n" + this.lettersaid, false);
          this.Pendu_gameMessage.edit(emb);
        } else if ((!this.mots.includes(msg.content)) && (!this.lettersaid.includes(msg.content))) {
          switch (this.currentLvl) {
            case this.lvl0:
              this.currentLvl = this.lvl1;
              break;
            case this.lvl1:
              this.currentLvl = this.lvl2;
              break;
            case this.lvl2:
              this.currentLvl = this.lvl3;
              break;
            case this.lvl3:
              this.currentLvl = this.lvl4;
              break;
            case this.lvl4:
              this.currentLvl = this.lvl5;
              break;
            case this.lvl5:
              this.currentLvl = this.lvl6;
              break;
            case this.lvl6:
              this.currentLvl = this.lvl7;
              break;
            case this.lvl7:
              this.currentLvl = this.lvl8;
              break;
            case this.lvl8:
              this.currentLvl = this.lvl9;
              break;
            case this.lvl9:
              this.currentLvl = this.lvl10;
              break;
          }
          this.lettersaid += letter + " ";
          if (this.currentLvl === this.lvl10) {
            var emb = new Discord.RichEmbed();
            emb.addField("Pendu", this.devinemot + "\n\n" + this.currentLvl + "\n\n" + this.lettersaid + " \n\n " + "PERDU ! \nLe mot etait : " + this.mots, false);
            this.Pendu_gameMessage.edit(emb);
            this.Pendu_inGame = false;
            this.stop();
          } else {
            var emb = new Discord.RichEmbed();
            emb.addField("Pendu", this.devinemot + "\n\n" + this.currentLvl + "\n\n" + this.lettersaid + " \n\n ", false);
            this.Pendu_gameMessage.edit(emb);
          }

        } else if ((!this.mots.includes(msg.content)) && this.lettersaid.includes(msg.content)) {
          var emb = new Discord.RichEmbed();
          emb.addField("Pendu", this.devinemot + "\n\n" + this.currentLvl + "\n\n" + this.lettersaid + "\n\n " + "Tu as déjà dis : " + letter, false);
          this.Pendu_gameMessage.edit(emb);

        }
      }
      if (this.devinemot === this.mots) {
        msg.channel.send("T'as trouver le bon mot ... :ok_hand: ");
        this.Pendu_inGame = false;
        this.stop();
        return;
      }
      msg.delete();
    });
  }


}

module.exports.Pendu = Pendu;
