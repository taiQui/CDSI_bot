const Discord = require('discord.js');
class Puissance4 {
  constructor(bot){

    this.P4_inGame = false;
    this.P4_GamePlayer1 = 0;
    this.P4_tourjoueur1 = true;
    this.P4_GamePlayer2 = 0;
    this.P4_gameMessage;
    this.P4_gameServer = "";
    this.GrilleJeux = Array(10).fill().map(a => Array(10));
    this.bot = bot;
  }

  controlPlaying(id){
    return((id === this.P4_GamePlayer1) || id === this.P4_GamePlayer2  );
  }

  reset(){
    this.P4_inGame = false;
    this.P4_GamePlayer1 = 0;
    this.P4_tourjoueur1 = true;
    this.P4_GamePlayer2 = 0;
    this.P4_gameMessage;
    this.P4_gameServer = "";
    this.GrilleJeux = Array(10).fill().map(a => Array(10));
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.GrilleJeux[i][j] = "       ";
      }
    }
  }

  init(id,id2,server,message){
    this.reset();
    this.P4_GamePlayer1 = id;
    this.P4_GamePlayer2 = id2;
    this.P4_gameServer = server;
    this.P4_gameMessage = message;
    this.P4_tourjoueur1 = true;
    this.P4_inGame = true;
    this.start();
  }

  start(){
    this.bot.on('message',(msg)=>{
      console.log('test 0 success');
      if (!this.P4_inGame) {
        return;
      }
      console.log('test 1 success');
      if (this.P4_gameServer !== msg.channel.name) {
        return;
      }
      console.log('test 2 success');
      if ((msg.author.id !== this.P4_GamePlayer1) && (msg.author.id !== this.P4_GamePlayer2)) {
        return;
      }
      console.log('test 3 success');
      if (msg.author.equals(this.bot.user)) {
        return
      }
      console.log('test 4 success');
      if (msg.content.startsWith("&")) {
        return
      }
      console.log('test 5 success');
      if (msg.content === "STOP") {
        msg.channel.send("Game end ... 🖕 ");
        this.reset();
        return;
      }
      console.log('test 6 success');
      let regex = new RegExp('^[0-7]+$');
      if (!regex.test(msg.content)) {
        console.log('input not working');
        msg.delete();
        return;
      }
      console.log('test 7 success');
      if ((msg.author.id === this.P4_GamePlayer1) && this.P4_tourjoueur1) {

        switch (msg.content) {
          case "1":
            if (this.findIndex(1 - 1) !== -1) {
              this.GrilleJeux[this.findIndex(1 - 1)][1 - 1] = ":small_orange_diamond:";
              console.log("NIQUEL");
            } else {
              msg.delete();
              return;
            }
            break;
          case "2":
            if (this.findIndex(2 - 1) !== -1) {
              this.GrilleJeux[this.findIndex(2 - 1)][2 - 1] = ":small_orange_diamond:";
            } else {
              msg.delete();
              return;
            }
            break;
          case "3":
            if (this.findIndex(3 - 1) !== -1) {
              this.GrilleJeux[this.findIndex(3 - 1)][3 - 1] = ":small_orange_diamond:";
            } else {
              msg.delete();
              return;
            }
            break;
          case "4":
            if (this.findIndex(4 - 1) !== -1) {
              this.GrilleJeux[this.findIndex(4 - 1)][4 - 1] = ":small_orange_diamond:";
            } else {
              msg.delete();
              return;
            }
            break;
          case "5":
            if (this.findIndex(5 - 1) !== -1) {
              this.GrilleJeux[this.findIndex(5 - 1)][5 - 1] = ":small_orange_diamond:";
            } else {
              msg.delete();
              return;
            }
            break;
          case "6":
            if (this.findIndex(6 - 1) !== -1) {
              this.GrilleJeux[this.findIndex(6 - 1)][6 - 1] = ":small_orange_diamond:";
            } else {
              msg.delete();
              return;
            }
            break;
          case "7":
            if (this.findIndex(7 - 1) !== -1) {
              this.GrilleJeux[this.findIndex(7 - 1)][7 - 1] = ":small_orange_diamond:";
            } else {
              msg.delete();
              return;
            }
            break;
          default:
            msg.delete();
            return;
            break;
        }
        this.P4_tourjoueur1 = false;
      } else if ((msg.author.id === this.P4_GamePlayer2) && (!this.P4_tourjoueur1)) {
        switch (msg.content) {
          case "1":
            if (this.findIndex(1 - 1) !== -1) {
              this.GrilleJeux[this.findIndex(1 - 1)][1 - 1] = ":small_blue_diamond:";
            } else {
              msg.delete();
              return;
            }
            break;
          case "2":
            if (this.findIndex(2 - 1) !== -1) {
              this.GrilleJeux[this.findIndex(2 - 1)][2 - 1] = ":small_blue_diamond:";
            } else {
              msg.delete();
              return;
            }
            break;
          case "3":
            if (this.findIndex(3 - 1) !== -1) {
              this.GrilleJeux[this.findIndex(3 - 1)][3 - 1] = ":small_blue_diamond:";
            } else {
              msg.delete();
              return;
            }
            break;
          case "4":
            if (this.findIndex(4 - 1) !== -1) {
              this.GrilleJeux[this.findIndex(4 - 1)][4 - 1] = ":small_blue_diamond:";
            } else {
              msg.delete();
              return;
            }
            break;
          case "5":
            if (this.findIndex(5 - 1) !== -1) {
              this.GrilleJeux[this.findIndex(5 - 1)][5 - 1] = ":small_blue_diamond:";
            } else {
              msg.delete();
              return;
            }
            break;
          case "6":
            if (this.findIndex(6 - 1) !== -1) {
              this.GrilleJeux[this.findIndex(6 - 1)][6 - 1] = ":small_blue_diamond:";
            } else {
              msg.delete();
              return;
            }
            break;
          case "7":
            if (this.findIndex(7 - 1) !== -1) {
              this.GrilleJeux[this.findIndex(7 - 1)][7 - 1] = ":small_blue_diamond:";
            } else {
              msg.delete();
              return;
            }
            break;
          default:
            msg.delete();
            return;
            break;
        }
        this.P4_tourjoueur1 = true;
      }

      this.printGrid();
      let test = this.testVertical();
      if (test === 1) {
        this.printGrid();
        console.log("GAGNER VERTICAL");
        var emb = new Discord.RichEmbed();
        emb.addField("Joueur 1", "Gagne !");
        msg.channel.send(emb);
        this.P4_inGame = false;
        this.reset();
      } else if (test === 2) {
        this.printGrid();
        console.log("GAGNER VERTICAL");
        var emb = new Discord.RichEmbed();

        emb.addField("Joueur 2", "Gagne !");
        msg.channel.send(emb);
        this.P4_inGame = false;
        this.reset();
      }


      test = this.testDiagonalMontante();
      if (test === 1) {
        this.printGrid();
        console.log("GAGNER DIAGMONTANTE");
        var emb = new Discord.RichEmbed();
        emb
        emb.addField("Joueur 1", "Gagne !");
        msg.channel.send(emb);
        this.P4_inGame = false;
        this.reset();
      } else if (test === 2) {
        this.printGrid();
        console.log("GAGNER DIAGMONTANTE");
        var emb = new Discord.RichEmbed();
        emb.addField("Joueur 2", "Gagne !");
        msg.channel.send(emb);
        this.P4_inGame = false;
        this.reset();
      }

      test = this.testDiagonalDescendante();
      if (test === 1) {
        this.printGrid();
        var emb = new Discord.RichEmbed();
        emb.addField("Joueur 1", "Gagne !");
        msg.channel.send(emb);
        console.log("GAGNER DIAGDESC")
        this.P4_inGame = false;;
        this.reset();
      } else if (test === 2) {
        this.printGrid();
        console.log("GAGNER DIAGDESC");
        var emb = new Discord.RichEmbed();
        emb.addField("Joueur 2", "Gagne !");
        msg.channel.send(emb);
        this.P4_inGame = false;
        this.reset();
      }


      test = this.testHorizontale();
      if (test === 1) {
        this.printGrid();
        var emb = new Discord.RichEmbed();
        emb.addField("Joueur 1", "Gagne !");
        msg.channel.send(emb);
        console.log("GAGNER HORIZON");
        this.P4_inGame = false;
        this.reset();
      } else if (test === 2) {
        this.printGrid();
        var emb = new Discord.RichEmbed();
        emb.addField("Joueur 2", "Gagne !");
        msg.channel.send(emb);
        console.log("GAGNER HORIZON");
        this.P4_inGame = false;
        this.reset();
      }


      if (this.Full()) {
        this.P4_inGame = false;
        var emb = new Discord.RichEmbed();
        emb.addField("Plus de possibilité", "Le jeux est fini !");
        msg.channel.send(emb);
        this.reset();
      }
      msg.delete();
      msg.content = '';
    });
  }

  isInGame(){
    return(this.P4_inGame);
  }

  printGrid(message){

    console.log("puissance 4 status : " + this.P4_inGame);
    let tour = "";
    if (this.P4_tourjoueur1 === true) {
      tour = " c'est au joueur 1 de jouer.";
    } else {
      tour = " c'est au joueur 2 de jouer.";
    }
    if (this.P4_inGame === true) {
      //console.log("p4_gameMessage contenue : "+P4_gameMessage);
      this.P4_gameMessage.edit("|" + this.GrilleJeux[0][0] + "|" + this.GrilleJeux[0][1] + "|" + this.GrilleJeux[0][2] + "|" + this.GrilleJeux[0][3] + "|" + this.GrilleJeux[0][4] + "|" + this.GrilleJeux[0][5] + "|" + this.GrilleJeux[0][6] + "|\n" +

        "|" + this.GrilleJeux[1][0] + "|" + this.GrilleJeux[1][1] + "|" + this.GrilleJeux[1][2] + "|" + this.GrilleJeux[1][3] + "|" + this.GrilleJeux[1][4] + "|" + this.GrilleJeux[1][5] + "|" + this.GrilleJeux[1][6] + "|\n" +

        "|" + this.GrilleJeux[2][0] + "|" + this.GrilleJeux[2][1] + "|" + this.GrilleJeux[2][2] + "|" + this.GrilleJeux[2][3] + "|" + this.GrilleJeux[2][4] + "|" + this.GrilleJeux[2][5] + "|" + this.GrilleJeux[2][6] + "|\n" +

        "|" + this.GrilleJeux[3][0] + "|" + this.GrilleJeux[3][1] + "|" + this.GrilleJeux[3][2] + "|" + this.GrilleJeux[3][3] + "|" + this.GrilleJeux[3][4] + "|" + this.GrilleJeux[3][5] + "|" + this.GrilleJeux[3][6] + "|\n" +

        "|" + this.GrilleJeux[4][0] + "|" + this.GrilleJeux[4][1] + "|" + this.GrilleJeux[4][2] + "|" + this.GrilleJeux[4][3] + "|" + this.GrilleJeux[4][4] + "|" + this.GrilleJeux[4][5] + "|" + this.GrilleJeux[4][6] + "|\n" +

        "|" + this.GrilleJeux[5][0] + "|" + this.GrilleJeux[5][1] + "|" + this.GrilleJeux[5][2] + "|" + this.GrilleJeux[5][3] + "|" + this.GrilleJeux[5][4] + "|" + this.GrilleJeux[5][5] + "|" + this.GrilleJeux[5][6] + "|\n" +
        "   1" + "       2" + "      3" + "      4" + "      5" + "      6" + "      7" + "\n" + tour);

    } else {
      console.log("si faux");
      message.channel.send("|" + this.GrilleJeux[0][0] + "|" + this.GrilleJeux[0][1] + "|" + this.GrilleJeux[0][2] + "|" + this.GrilleJeux[0][3] + "|" + this.GrilleJeux[0][4] + "|" + this.GrilleJeux[0][5] + "|" + this.GrilleJeux[0][6] + "|\n" +

        "|" + this.GrilleJeux[1][0] + "|" + this.GrilleJeux[1][1] + "|" + this.GrilleJeux[1][2] + "|" + this.GrilleJeux[1][3] + "|" + this.GrilleJeux[1][4] + "|" + this.GrilleJeux[1][5] + "|" + this.GrilleJeux[1][6] + "|\n" +

        "|" + this.GrilleJeux[2][0] + "|" + this.GrilleJeux[2][1] + "|" + this.GrilleJeux[2][2] + "|" + this.GrilleJeux[2][3] + "|" + this.GrilleJeux[2][4] + "|" + this.GrilleJeux[2][5] + "|" + this.GrilleJeux[2][6] + "|\n" +

        "|" + this.GrilleJeux[3][0] + "|" + this.GrilleJeux[3][1] + "|" + this.GrilleJeux[3][2] + "|" + this.GrilleJeux[3][3] + "|" + this.GrilleJeux[3][4] + "|" + this.GrilleJeux[3][5] + "|" + this.GrilleJeux[3][6] + "|\n" +

        "|" + this.GrilleJeux[4][0] + "|" + this.GrilleJeux[4][1] + "|" + this.GrilleJeux[4][2] + "|" + this.GrilleJeux[4][3] + "|" + this.GrilleJeux[4][4] + "|" + this.GrilleJeux[4][5] + "|" + this.GrilleJeux[4][6] + "|\n" +

        "|" + this.GrilleJeux[5][0] + "|" + this.GrilleJeux[5][1] + "|" + this.GrilleJeux[5][2] + "|" + this.GrilleJeux[5][3] + "|" + this.GrilleJeux[5][4] + "|" + this.GrilleJeux[5][5] + "|" + this.GrilleJeux[5][6] + "|\n" +
        "   1" + "       2" + "      3" + "      4" + "      5" + "      6" + "      7" + "\n" + tour);
      message.channel.fetchMessages({
        limit: 1
      }).then(msg => {
        let tab = msg.array();

        this.P4_gameMessage = tab[0];
      });
    }
  }

  findIndex(message){
    let i = 5;
    let continuer = true;
    while (i >= 0 && continuer) {
      if (this.GrilleJeux[i][message] === ":small_orange_diamond:" || this.GrilleJeux[i][message] === ":small_blue_diamond:") {
        i--;
      } else {
        continuer = false;
      }
    }
    if (continuer === false)
      return i;
    else
      return -1;
  }

  testDiagonalMontante(){
    for (let i = 3; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.GrilleJeux[i][j] === ":small_orange_diamond:" && this.GrilleJeux[i - 1][j + 1] === ":small_orange_diamond:" && this.GrilleJeux[i - 2][j + 2] === ":small_orange_diamond:" && this.GrilleJeux[i - 3][j + 3] === ":small_orange_diamond:") {
          this.GrilleJeux[i][j] = ":small_red_triangle:";
          this.GrilleJeux[i - 1][j + 1] = ":small_red_triangle:";
          this.GrilleJeux[i - 2][j + 2] = ":small_red_triangle:";
          this.GrilleJeux[i - 3][j + 3] = ":small_red_triangle:";

          return 1;
        } else if (this.GrilleJeux[i][j] === ":small_blue_diamond:" && this.GrilleJeux[i - 1][j + 1] === ":small_blue_diamond:" && this.GrilleJeux[i - 2][j + 2] === ":small_blue_diamond:" && this.GrilleJeux[i - 3][j + 3] === ":small_blue_diamond:") {
          // this.GrilleJeux[i][j] = ":small_red_triangle:";
          // this.GrilleJeux[i-1][j+1] =":small_red_triangle:";
          // this.GrilleJeux[i-2][j+2] = ":small_red_triangle:";
          // this.GrilleJeux[i-3][j+3] = ":small_red_triangle:";
          return 2;
        }
      }
    }
    return -1;
  }
  testDiagonalDescendante() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.GrilleJeux[i][j] === ":small_orange_diamond:" && this.GrilleJeux[i + 1][j + 1] === ":small_orange_diamond:" && this.GrilleJeux[i + 2][j + 2] === ":small_orange_diamond:" && this.GrilleJeux[i + 3][j + 3] === ":small_orange_diamond:") {
          this.GrilleJeux[i][j] = ":small_red_triangle:";
          this.GrilleJeux[i + 1][j + 1] = ":small_red_triangle:";
          this.GrilleJeux[i + 2][j + 2] = ":small_red_triangle:";
          this.GrilleJeux[i + 3][j + 3] = ":small_red_triangle:";
          return 1;
        } else if (this.GrilleJeux[i][j] === ":small_blue_diamond:" && this.GrilleJeux[i + 1][j + 1] === ":small_blue_diamond:" && this.GrilleJeux[i + 2][j + 2] === ":small_blue_diamond:" && this.GrilleJeux[i + 3][j + 3] === ":small_blue_diamond:") {
          this.GrilleJeux[i][j] = ":small_red_triangle:";
          this.GrilleJeux[i + 1][j + 1] = ":small_red_triangle:";
          this.GrilleJeux[i + 2][j + 2] = ":small_red_triangle:";
          this.GrilleJeux[i + 3][j + 3] = ":small_red_triangle:";
          return 2;
        }
      }
    }
    return -1;
  }

  testHorizontale() {
    let countJ1 = 0;
    let countJ2 = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.GrilleJeux[i][j] === ":small_orange_diamond:") {
          countJ1++;
          countJ2 = 0;
        } else if (this.GrilleJeux[i][j] === ":small_blue_diamond:") {
          countJ2++;
          countJ1 = 0;
        } else {
          countJ1 = 0;
          countJ2 = 0;
        }
        if (countJ1 === 4) {
          console.log("gagner : " + this.GrilleJeux[i][j] + " " + this.GrilleJeux[i][j - 1] + " " + this.GrilleJeux[i][j - 2] + " " + this.GrilleJeux[i][j - 3]);
          this.GrilleJeux[i][j] = ":small_red_triangle:";
          this.GrilleJeux[i][j - 1] = ":small_red_triangle:";
          this.GrilleJeux[i][j - 2] = ":small_red_triangle:";
          this.GrilleJeux[i][j - 3] = ":small_red_triangle:";
          return 1;
        } else if (countJ2 === 4) {
          console.log("gagner : " + this.GrilleJeux[i][j] + " " + this.GrilleJeux[i][j - 1] + " " + this.GrilleJeux[i][j - 2] + " " + this.GrilleJeux[i][j - 3]);
          this.GrilleJeux[i][j] = ":small_red_triangle:";
          this.GrilleJeux[i][j - 1] = ":small_red_triangle:";
          this.GrilleJeux[i][j - 2] = ":small_red_triangle:";
          this.GrilleJeux[i][j - 3] = ":small_red_triangle:";
          return 2;
        }
        console.log("count : " + countJ1);
        console.log("count : " + countJ2);
      }
      countJ1 = 0;
      countJ2 = 0;
    }
    return -1;
  }
  testVertical() {
    let countJ1 = 0;
    let countJ2 = 0;
    let i = 0;
    let continuer = true;
    let j = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        if (this.GrilleJeux[j][i] === ":small_orange_diamond:") {
          countJ1++;
          countJ2 = 0;
        } else if (this.GrilleJeux[j][i] === ":small_blue_diamond:") {
          countJ2++;
          countJ1 = 0;
        } else {
          countJ1 = 0;
          countJ2 = 0;
        }
        if (countJ1 >= 4) {
          this.GrilleJeux[j][i] = ":small_red_triangle:";
          this.GrilleJeux[j - 1][i] = ":small_red_triangle:";
          this.GrilleJeux[j - 2][i] = ":small_red_triangle:";
          this.GrilleJeux[j - 3][i] = ":small_red_triangle:";
          return 1;
        } else if (countJ2 >= 4) {
          this.GrilleJeux[j][i] = ":small_red_triangle:";
          this.GrilleJeux[j - 1][i] = ":small_red_triangle:";
          this.GrilleJeux[j - 2][i] = ":small_red_triangle:";
          this.GrilleJeux[j - 3][i] = ":small_red_triangle:";
          return 2;
        }
      }
      countJ1 = 0;
      countJ2 = 0;
    }
    return -1;
  }
  Full() {
    let continuer = true;
    let i = 0;
    let j = 0;
    while ((i < 6) && continuer) {
      while (j < 7 && continuer) {
        if (this.GrilleJeux[i][j] !== ":small_orange_diamond:" && this.GrilleJeux[i][j] !== ":small_blue_diamond:") {
          continuer = false;
        } else {
          j++;
        }
      }
      i++;
    }
    return continuer;
  }
}

module.exports.Puissance4 = Puissance4;
