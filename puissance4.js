const Discord = require('discord.js');
class Puissance4 {
  constructor(bot){
    this.itemP1 = ":small_blue_diamond:";
    this.itemP2 = ":small_orange_diamond:";
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
        this.GrilleJeux[i][j] = ":black_small_square:";
        // this.GrilleJeux[i][j] = "0";
      }
    }
  }

  init(id,id2,server,message,gamemod){
    this.reset();
    this.P4_GamePlayer1 = id;
    this.P4_GamePlayer2 = id2;
    this.P4_gameServer = server;
    this.P4_gameMessage = message;
    this.P4_tourjoueur1 = true;
    this.P4_inGame = true;
    if(gamemod == 0)
      this.start();
    else
      this.start_against_bot();
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
            if (this.findIndex(1 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(1 - 1,this.GrilleJeux)][1 - 1] = this.itemP2;
              console.log("NIQUEL");
            } else {
              msg.delete();
              return;
            }
            break;
          case "2":
            if (this.findIndex(2 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(2 - 1,this.GrilleJeux)][2 - 1] = this.itemP2;
            } else {
              msg.delete();
              return;
            }
            break;
          case "3":
            if (this.findIndex(3 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(3 - 1,this.GrilleJeux)][3 - 1] = this.itemP2;
            } else {
              msg.delete();
              return;
            }
            break;
          case "4":
            if (this.findIndex(4 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(4 - 1,this.GrilleJeux)][4 - 1] = this.itemP2;
            } else {
              msg.delete();
              return;
            }
            break;
          case "5":
            if (this.findIndex(5 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(5 - 1,this.GrilleJeux)][5 - 1] = this.itemP2;
            } else {
              msg.delete();
              return;
            }
            break;
          case "6":
            if (this.findIndex(6 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(6 - 1,this.GrilleJeux)][6 - 1] = this.itemP2;
            } else {
              msg.delete();
              return;
            }
            break;
          case "7":
            if (this.findIndex(7 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(7 - 1,this.GrilleJeux)][7 - 1] = this.itemP2;
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
            if (this.findIndex(1 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(1 - 1,this.GrilleJeux)][1 - 1] = this.itemP1;
            } else {
              msg.delete();
              return;
            }
            break;
          case "2":
            if (this.findIndex(2 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(2 - 1,this.GrilleJeux)][2 - 1] = this.itemP1;
            } else {
              msg.delete();
              return;
            }
            break;
          case "3":
            if (this.findIndex(3 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(3 - 1,this.GrilleJeux)][3 - 1] = this.itemP1;
            } else {
              msg.delete();
              return;
            }
            break;
          case "4":
            if (this.findIndex(4 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(4 - 1,this.GrilleJeux)][4 - 1] = this.itemP1;
            } else {
              msg.delete();
              return;
            }
            break;
          case "5":
            if (this.findIndex(5 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(5 - 1,this.GrilleJeux)][5 - 1] = this.itemP1;
            } else {
              msg.delete();
              return;
            }
            break;
          case "6":
            if (this.findIndex(6 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(6 - 1,this.GrilleJeux)][6 - 1] = this.itemP1;
            } else {
              msg.delete();
              return;
            }
            break;
          case "7":
            if (this.findIndex(7 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(7 - 1,this.GrilleJeux)][7 - 1] = this.itemP1;
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
      this.win();
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
      tour = " c'est au joueur 1 de jouer. ::small_orange_diamond: ";
    } else {
      tour = " c'est au joueur 2 de jouer. :small_blue_diamond:";
    }
    if (this.P4_inGame === true) {
      //console.log("p4_gameMessage contenue : "+P4_gameMessage);
      this.P4_gameMessage.edit("|" + this.GrilleJeux[0][0] + "|" + this.GrilleJeux[0][1] + "|" + this.GrilleJeux[0][2] + "|" + this.GrilleJeux[0][3] + "|" + this.GrilleJeux[0][4] + "|" + this.GrilleJeux[0][5] + "|" + this.GrilleJeux[0][6] + "|\n" +

        "|" + this.GrilleJeux[1][0] + "|" + this.GrilleJeux[1][1] + "|" + this.GrilleJeux[1][2] + "|" + this.GrilleJeux[1][3] + "|" + this.GrilleJeux[1][4] + "|" + this.GrilleJeux[1][5] + "|" + this.GrilleJeux[1][6] + "|\n" +

        "|" + this.GrilleJeux[2][0] + "|" + this.GrilleJeux[2][1] + "|" + this.GrilleJeux[2][2] + "|" + this.GrilleJeux[2][3] + "|" + this.GrilleJeux[2][4] + "|" + this.GrilleJeux[2][5] + "|" + this.GrilleJeux[2][6] + "|\n" +

        "|" + this.GrilleJeux[3][0] + "|" + this.GrilleJeux[3][1] + "|" + this.GrilleJeux[3][2] + "|" + this.GrilleJeux[3][3] + "|" + this.GrilleJeux[3][4] + "|" + this.GrilleJeux[3][5] + "|" + this.GrilleJeux[3][6] + "|\n" +

        "|" + this.GrilleJeux[4][0] + "|" + this.GrilleJeux[4][1] + "|" + this.GrilleJeux[4][2] + "|" + this.GrilleJeux[4][3] + "|" + this.GrilleJeux[4][4] + "|" + this.GrilleJeux[4][5] + "|" + this.GrilleJeux[4][6] + "|\n" +

        "|" + this.GrilleJeux[5][0] + "|" + this.GrilleJeux[5][1] + "|" + this.GrilleJeux[5][2] + "|" + this.GrilleJeux[5][3] + "|" + this.GrilleJeux[5][4] + "|" + this.GrilleJeux[5][5] + "|" + this.GrilleJeux[5][6] + "|\n" +
        "   1" + "      2" + "     3" + "     4" + "     5" + "    6" + "     7" + "\n" + tour);

    } else {
      console.log("si faux");
      message.channel.send("|" + this.GrilleJeux[0][0] + "|" + this.GrilleJeux[0][1] + "|" + this.GrilleJeux[0][2] + "|" + this.GrilleJeux[0][3] + "|" + this.GrilleJeux[0][4] + "|" + this.GrilleJeux[0][5] + "|" + this.GrilleJeux[0][6] + "|\n" +

        "|" + this.GrilleJeux[1][0] + "|" + this.GrilleJeux[1][1] + "|" + this.GrilleJeux[1][2] + "|" + this.GrilleJeux[1][3] + "|" + this.GrilleJeux[1][4] + "|" + this.GrilleJeux[1][5] + "|" + this.GrilleJeux[1][6] + "|\n" +

        "|" + this.GrilleJeux[2][0] + "|" + this.GrilleJeux[2][1] + "|" + this.GrilleJeux[2][2] + "|" + this.GrilleJeux[2][3] + "|" + this.GrilleJeux[2][4] + "|" + this.GrilleJeux[2][5] + "|" + this.GrilleJeux[2][6] + "|\n" +

        "|" + this.GrilleJeux[3][0] + "|" + this.GrilleJeux[3][1] + "|" + this.GrilleJeux[3][2] + "|" + this.GrilleJeux[3][3] + "|" + this.GrilleJeux[3][4] + "|" + this.GrilleJeux[3][5] + "|" + this.GrilleJeux[3][6] + "|\n" +

        "|" + this.GrilleJeux[4][0] + "|" + this.GrilleJeux[4][1] + "|" + this.GrilleJeux[4][2] + "|" + this.GrilleJeux[4][3] + "|" + this.GrilleJeux[4][4] + "|" + this.GrilleJeux[4][5] + "|" + this.GrilleJeux[4][6] + "|\n" +

        "|" + this.GrilleJeux[5][0] + "|" + this.GrilleJeux[5][1] + "|" + this.GrilleJeux[5][2] + "|" + this.GrilleJeux[5][3] + "|" + this.GrilleJeux[5][4] + "|" + this.GrilleJeux[5][5] + "|" + this.GrilleJeux[5][6] + "|\n" +
        "   1" + "      2" + "     3" + "     4" + "     5" + "    6" + "     7" + "\n" + tour);
      message.channel.fetchMessages({
        limit: 1
      }).then(msg => {
        let tab = msg.array();

        this.P4_gameMessage = tab[0];
      });
    }
  }

  findIndex(message,grid){
    let i = 5;
    let continuer = true;
    while (i >= 0 && continuer) {
      if (grid[i][message] === this.itemP2 || grid[i][message] === this.itemP1) {
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

  testDiagonalMontante(grid){
    for (let i = 3; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === this.itemP2 && grid[i - 1][j + 1] === this.itemP2 && grid[i - 2][j + 2] === this.itemP2 && grid[i - 3][j + 3] === this.itemP2) {
          grid[i][j] = ":small_red_triangle:";
          grid[i - 1][j + 1] = ":small_red_triangle:";
          grid[i - 2][j + 2] = ":small_red_triangle:";
          grid[i - 3][j + 3] = ":small_red_triangle:";

          return 1;
        } else if (grid[i][j] === this.itemP1 && grid[i - 1][j + 1] === this.itemP1 && grid[i - 2][j + 2] === this.itemP1 && grid[i - 3][j + 3] === this.itemP1) {
          grid[i][j] = ":small_red_triangle:";
          grid[i-1][j+1] =":small_red_triangle:";
          grid[i-2][j+2] = ":small_red_triangle:";
          grid[i-3][j+3] = ":small_red_triangle:";
          return 2;
        }
      }
    }
    return -1;
  }
  testDiagonalDescendante(grid) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === this.itemP2 && grid[i + 1][j + 1] === this.itemP2 && grid[i + 2][j + 2] === this.itemP2 && grid[i + 3][j + 3] === this.itemP2) {
          grid[i][j] = ":small_red_triangle:";
          grid[i + 1][j + 1] = ":small_red_triangle:";
          grid[i + 2][j + 2] = ":small_red_triangle:";
          grid[i + 3][j + 3] = ":small_red_triangle:";
          return 1;
        } else if (grid[i][j] === this.itemP1 && grid[i + 1][j + 1] === this.itemP1 && grid[i + 2][j + 2] === this.itemP1 && grid[i + 3][j + 3] === this.itemP1) {
          grid[i][j] = ":small_red_triangle:";
          grid[i + 1][j + 1] = ":small_red_triangle:";
          grid[i + 2][j + 2] = ":small_red_triangle:";
          grid[i + 3][j + 3] = ":small_red_triangle:";
          return 2;
        }
      }
    }
    return -1;
  }

  testHorizontale(grid) {
    let countJ1 = 0;
    let countJ2 = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (grid[i][j] === this.itemP2) {
          countJ1++;
          countJ2 = 0;
        } else if (grid[i][j] === this.itemP1) {
          countJ2++;
          countJ1 = 0;
        } else {
          countJ1 = 0;
          countJ2 = 0;
        }
        if (countJ1 === 4) {
          console.log("gagner : " + grid[i][j] + " " + grid[i][j - 1] + " " + grid[i][j - 2] + " " + grid[i][j - 3]);
          grid[i][j] = ":small_red_triangle:";
          grid[i][j - 1] = ":small_red_triangle:";
          grid[i][j - 2] = ":small_red_triangle:";
          grid[i][j - 3] = ":small_red_triangle:";
          return 1;
        } else if (countJ2 === 4) {
          console.log("gagner : " + grid[i][j] + " " + grid[i][j - 1] + " " + grid[i][j - 2] + " " + grid[i][j - 3]);
          grid[i][j] = ":small_red_triangle:";
          grid[i][j - 1] = ":small_red_triangle:";
          grid[i][j - 2] = ":small_red_triangle:";
          grid[i][j - 3] = ":small_red_triangle:";
          return 2;
        }
        // console.log("count : " + countJ1);
        // console.log("count : " + countJ2);
      }
      countJ1 = 0;
      countJ2 = 0;
    }
    return -1;
  }
  testVertical(grid) {
    let countJ1 = 0;
    let countJ2 = 0;
    let i = 0;
    let continuer = true;
    let j = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        if (grid[j][i] === this.itemP2) {
          countJ1++;
          countJ2 = 0;
        } else if (grid[j][i] === this.itemP1) {
          countJ2++;
          countJ1 = 0;
        } else {
          countJ1 = 0;
          countJ2 = 0;
        }
        if (countJ1 >= 4) {
          grid[j][i] = ":small_red_triangle:";
          grid[j - 1][i] = ":small_red_triangle:";
          grid[j - 2][i] = ":small_red_triangle:";
          grid[j - 3][i] = ":small_red_triangle:";
          return 1;
        } else if (countJ2 >= 4) {
          grid[j][i] = ":small_red_triangle:";
          grid[j - 1][i] = ":small_red_triangle:";
          grid[j - 2][i] = ":small_red_triangle:";
          grid[j - 3][i] = ":small_red_triangle:";
          return 2;
        }
      }
      countJ1 = 0;
      countJ2 = 0;
    }
    return -1;
  }
  Full(grid) {
    let continuer = true;
    let i = 0;
    let j = 0;
    while ((i < 6) && continuer) {
      while (j < 7 && continuer) {
        if (grid[i][j] !== this.itemP2 && grid[i][j] !== this.itemP1) {
          continuer = false;
        } else {
          j++;
        }
      }
      i++;
    }
    return continuer;
  }
  start_against_bot(){
    this.bot.on('message',(msg)=>{
      if (!this.P4_inGame) return;
      if (this.P4_gameServer !== msg.channel.name) return;
      if (msg.author.id !== this.P4_GamePlayer1) return;
      if (msg.author.equals(this.bot.user)) return;
      if (msg.content.startsWith("&")) return;
      if (msg.content === "STOP") {
        msg.channel.send("Game end ... 🖕 ");
        this.reset();
        return;
      }
      let regex = new RegExp('^[0-7]+$');
      if (!regex.test(msg.content)) {
        console.log('input not working');
        msg.delete();
        return;
      }
      if ((msg.author.id === this.P4_GamePlayer1) && this.P4_tourjoueur1) {

        switch (msg.content) {
          case "1":
            if (this.findIndex(1 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(1 - 1,this.GrilleJeux)][1 - 1] = this.itemP2;
              console.log("NIQUEL");
            } else {
              msg.delete();
              return;
            }
            break;
          case "2":
            if (this.findIndex(2 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(2 - 1,this.GrilleJeux)][2 - 1] = this.itemP2;
            } else {
              msg.delete();
              return;
            }
            break;
          case "3":
            if (this.findIndex(3 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(3 - 1,this.GrilleJeux)][3 - 1] = this.itemP2;
            } else {
              msg.delete();
              return;
            }
            break;
          case "4":
            if (this.findIndex(4 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(4 - 1,this.GrilleJeux)][4 - 1] = this.itemP2;
            } else {
              msg.delete();
              return;
            }
            break;
          case "5":
            if (this.findIndex(5 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(5 - 1,this.GrilleJeux)][5 - 1] = this.itemP2;
            } else {
              msg.delete();
              return;
            }
            break;
          case "6":
            if (this.findIndex(6 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(6 - 1,this.GrilleJeux)][6 - 1] = this.itemP2;
            } else {
              msg.delete();
              return;
            }
            break;
          case "7":
            if (this.findIndex(7 - 1,this.GrilleJeux) !== -1) {
              this.GrilleJeux[this.findIndex(7 - 1,this.GrilleJeux)][7 - 1] = this.itemP2;
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
        // console.log('DEBUG BOT - J1 END');
      }
      this.printGrid();
      this.win(msg);

      if(this.P4_tourjoueur1 === false) {
        // console.log('DEBUG BOT - BOT START');
        var score_tours =[0,0,0,0,0,0,0];

        // console.log('Nombre de tours joué : '+this.turn_played());
        for(let i = 1 ; i <= 7;i++){
          let grid_aux = this.GrilleJeux.map(arr => arr.slice());
          // this.print(grid_aux);
          // console.log('----------------')
          // this.print(this.GrilleJeux);
          if(this.findIndex(i - 1,grid_aux) === -1) {
            score_tours[i-1] -= 5000;
          } else {
            // console.log('Nombre de tours joué : '+this.turn_played()+"\n----------------------");
            // console.log("DEBUG BOT - 1");

            grid_aux[this.findIndex(i-1,grid_aux)][i-1] = this.itemP1;
            //test if bot win if he plays here
            if(this.test_win_BOT(grid_aux) === 1) score_tours[i-1]+=2000;
            //test if map if full if he plays here
            if(this.Full(grid_aux)) score_tours[i-1] += 5000;
            // console.log("DEBUG BOT - 2");
            grid_aux = this.GrilleJeux.map(arr => arr.slice());
            grid_aux[this.findIndex(i-1,grid_aux)][i-1] = this.itemP2;
            //test if user win if user play here
            if(this.test_win_USER(grid_aux) === 1) score_tours[i-1] += 1000;
            // console.log("DEBUG BOT - 3");
            grid_aux = this.GrilleJeux.map(arr => arr.slice());
            //test if there 2 or 3 case which are align if bot plays here
            let before = this.test_align_plus(grid_aux,2);
            grid_aux[this.findIndex(i-1,grid_aux)][i-1] = this.itemP1;
            let after = this.test_align_plus(grid_aux,2);
            if (after > before && after == 2) score_tours[i-1] += 200;
            if (after > before && after == 3) score_tours[i-1] += 300;
            // console.log("DEBUG BOT - 4");
            grid_aux = this.GrilleJeux.map(arr => arr.slice());
            //test if there as 2 or 3 case which are allign if user plays here
            before = this.test_align_plus(grid_aux,1);
            grid_aux[this.findIndex(i-1,grid_aux)][i-1] = this.itemP2;
            after = this.test_align_plus(grid_aux,1);
            if (after > before && after == 2) score_tours[i-1] += 100;
            if (after > before && after == 3) score_tours[i-1] += 200;
            grid_aux = this.GrilleJeux.map(arr => arr.slice());
            grid_aux[this.findIndex(i-1,grid_aux)][i-1] = this.itemP1;
            //test if there are bot case next to here
            if(this.test_align_BOT(i-1,grid_aux) == 1) score_tours[i-1] += 100;
            // console.log("DEBUG BOT - 5");
            grid_aux = this.GrilleJeux.map(arr => arr.slice());
            grid_aux[this.findIndex(i-1,grid_aux)][i-1] = this.itemP1;
            if(this.findIndex(i-1,grid_aux) != -1){
              grid_aux[this.findIndex(i-1,grid_aux)][i-1] = this.itemP2;
              if(this.test_win_USER(grid_aux) === 1) score_tours[i-1] -= 1000;
            }
            //Test if there are user case next to here
            // if (this.test_align_USER(i-1,grid_aux) == 1) score_tours[i-1] += 100;
            // console.log("DEBUG BOT - 6");

          }
        }
        let max = 0;
        let score_max = 0;
        for(let i = 0; i < 7 ;i++){
          if(score_tours[i] >= score_max){
            if (score_tours[i] > score_max){
              score_max = score_tours[i];
              max = i;
            } else {
              if(Math.floor(Math.random() * Math.floor(2))){
                score_max = score_tours[i];
                max = i;
              }
            }
          }
        }
        this.GrilleJeux[this.findIndex(max,this.GrilleJeux)][max] = this.itemP1;
        // console.log('Nombre de tours joué : '+this.turn_played());
        this.P4_tourjoueur1 = true;
        this.printGrid();
        this.win(msg);
        this.P4_tourjoueur1 = true;
        // console.log('DEBUG BOT - BOT END');
      }

      msg.delete();
      msg.content = '';
      this.P4_tourjoueur1 = true;
      return;

    });
  }
  print(grid){
    console.log("|" + grid[0][0] + "|" + grid[0][1] + "|" + grid[0][2] + "|" + grid[0][3] + "|" + grid[0][4] + "|" + grid[0][5] + "|" + grid[0][6] + "|\n" +

      "|" + grid[1][0] + "|" + grid[1][1] + "|" + grid[1][2] + "|" + grid[1][3] + "|" + grid[1][4] + "|" + grid[1][5] + "|" + grid[1][6] + "|\n" +

      "|" + grid[2][0] + "|" + grid[2][1] + "|" + grid[2][2] + "|" + grid[2][3] + "|" + grid[2][4] + "|" + grid[2][5] + "|" + grid[2][6] + "|\n" +

      "|" + grid[3][0] + "|" + grid[3][1] + "|" + grid[3][2] + "|" + grid[3][3] + "|" + grid[3][4] + "|" + grid[3][5] + "|" + grid[3][6] + "|\n" +

      "|" + grid[4][0] + "|" + grid[4][1] + "|" + grid[4][2] + "|" + grid[4][3] + "|" + grid[4][4] + "|" + grid[4][5] + "|" + grid[4][6] + "|\n" +

      "|" + grid[5][0] + "|" + grid[5][1] + "|" + grid[5][2] + "|" + grid[5][3] + "|" + grid[5][4] + "|" + grid[5][5] + "|" + grid[5][6] + "|\n" +
      "   1" + "        2" + "       3" + "       4" + "       5" + "      6" + "       7" + "\n" );
  }
  win(msg){
    let test = this.testVertical(this.GrilleJeux);
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

      emb.addField("Le BOT", "Gagne !");
      msg.channel.send(emb);
      this.P4_inGame = false;
      this.reset();
    }


    test = this.testDiagonalMontante(this.GrilleJeux);
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
      emb.addField("Le BOT", "Gagne !");
      msg.channel.send(emb);
      this.P4_inGame = false;
      this.reset();
    }

    test = this.testDiagonalDescendante(this.GrilleJeux);
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
      emb.addField("Le BOT", "Gagne !");
      msg.channel.send(emb);
      this.P4_inGame = false;
      this.reset();
    }


    test = this.testHorizontale(this.GrilleJeux);
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
      emb.addField("Le BOT", "Gagne !");
      msg.channel.send(emb);
      console.log("GAGNER HORIZON");
      this.P4_inGame = false;
      this.reset();
    }


    if (this.Full(this.GrilleJeux)) {
      this.P4_inGame = false;
      var emb = new Discord.RichEmbed();
      emb.addField("Plus de possibilité", "Le jeux est fini !");
      msg.channel.send(emb);
      this.reset();
    }
  }
  test_win_BOT(grid){
    if(this.testVertical(grid) ===2) return 1;
    if(this.testDiagonalMontante(grid) ===2) return 1;
    if(this.testDiagonalDescendante(grid) ===2) return 1;
    if(this.testHorizontale(grid) ===2) return 1;
    return 0;
  }
  test_win_USER(grid){
    if(this.testVertical(grid) ===1) return 1;
    if(this.testDiagonalMontante(grid) ===1) return 1;
    if(this.testDiagonalDescendante(grid) ===1) return 1;
    if(this.testHorizontale(grid) ===1) return 1;
    return 0;
  }
  test_align_plus(grid,player){
    let max = 0;
    let aux_max = 0;
    //horizontale
    let enemie = "";
    let ally = "";
    if(player == 1){
      enemie = this.itemP1;
      ally = this.itemP2;
    } else {
      enemie = this.itemP2;
      ally = this.itemP1;
    }
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (grid[i][j] === enemie) {
          aux_max = 0;
        } else if (grid[i][j] === ally) {
          aux_max++;
        } else {
          aux_max = 0;
        }
      }
    }
    if(aux_max > max) max = aux_max;
    aux_max = 0;
    //verticale
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        if (grid[j][i] === enemie) {
          aux_max = 0;
        } else if (grid[j][i] === ally) {
          aux_max++;
        } else {
          aux_max = 0;
        }
      }
    }
    if(aux_max > max) max = aux_max;
    aux_max = 0;
    //diag montante
    for (let i = 3; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === ally) aux_max += 1;
        if (grid[i - 1][j + 1] === ally) aux_max += 1;
        if (grid[i - 2][j + 2] === ally) aux_max += 1;
        if (grid[i - 3][j + 3] === ally) aux_max += 1;
      }
    }
    if (aux_max > max) max = aux_max;
    aux_max = 0;
    //diag descen
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === ally) aux_max += 1;
        if (grid[i + 1][j + 1] === ally) aux_max += 1;
        if (grid[i + 2][j + 2] === ally) aux_max += 1;
        if (grid[i + 3][j + 3] === ally) aux_max += 1;
      }
    }
    if (aux_max > max) max = aux_max;
    return max;
  }
  //if there is one turn played by me next to
  test_align_BOT(index,grid){
    let i = 5;
    let continuer = true;
    while ( i >= 0 && continuer){
      if (grid[i][index] === this.itemP1)
        continuer = false;
      else
        i -= 1;
    }
    if(index -1 >= 0 && i -1 >= 0 ) {
      if(grid[i-1][index-1] == this.itemP1) return 1;
    }
    if(index -1 >= 0){
      if (grid[i][index-1] == this.itemP1) return 1;
    }
    if(index -1 >= 0 && i+1 <=5){
      if (grid[i+1][index-1] == this.itemP1) return 1;
    }
    if(i+1 <= 5){
      if (grid[i+1][index] == this.itemP1) return 1;
    }
    if(i+1 <= 5 && index +1 <= 6){
      if (grid[i+1][index+1] == this.itemP1) return 1;
    }
    if(index+1 <=6){
      if (grid[i][index+1] == this.itemP1) return 1;
    }
    if(i-1 >= 0 && index+1 <= 6){
      if (grid[i-1][index+1] == this.itemP1) return 1;
    }
    return 0;
  }
  //if there is one turn played by users next to
  test_align_USER(index,grid){
    let i = 5;
    let continuer = true;
    while ( i >= 0 && continuer){
      if (grid[i][index] === this.itemP1)
        continuer = false;
      else
        i -= 1;
    }
    if(index -1 >= 0 && i -1 >= 0 ) {
      if(grid[i-1][index-1] == this.itemP2) return 1;
    }
    if(index -1 >= 0){
      if (grid[i][index-1] == this.itemP2) return 1;
    }
    if(index -1 >= 0 && i+1 <=5){
      if (grid[i+1][index-1] == this.itemP2) return 1;
    }
    if(i+1 <= 5){
      if (grid[i+1][index] == this.itemP2) return 1;
    }
    if(i+1 <= 5 && index +1 <= 6){
      if (grid[i+1][index+1] == this.itemP2) return 1;
    }
    if(index+1 <=6){
      if (grid[i][index+1] == this.itemP2) return 1;
    }
    if(i-1 >= 0 && index+1 <= 6){
      if (grid[i-1][index+1] == this.itemP2) return 1;
    }
    return 0;
  }
  turn_played(){
    let i = 0;
    let j = 0;
    let count = 0;
    while ((i < 6)) {
      while (j < 7) {
        if (this.GrilleJeux[i][j] == this.itemP2 || this.GrilleJeux[i][j] == this.itemP1) {
          count++;
        }
        j++;
      }
      i++;
    }
  return count;
  }
}

module.exports.Puissance4 = Puissance4;
