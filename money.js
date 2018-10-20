const pouchDB = require('pouchdb');
const discord = require('discord.js');
var database = new pouchDB('Money');
var guildid = "";
var userid = "";
var jackpot = 0;


function dateDiff(date1, date2) {
  var diff = {} // Initialisation du retour
  var tmp = date2 - date1;

  tmp = Math.floor(tmp / 1000); // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60; // Extraction du nombre de secondes

  tmp = Math.floor((tmp - diff.sec) / 60); // Nombre de minutes (partie entière)
  diff.min = tmp % 60; // Extraction du nombre de minutes

  tmp = Math.floor((tmp - diff.min) / 60); // Nombre d'heures (entières)
  diff.hour = tmp % 24; // Extraction du nombre d'heures

  tmp = Math.floor((tmp - diff.hour) / 24); // Nombre de jours restants
  diff.day = tmp;

  return diff;
}

class Casino {
  constructor(bot){
    this.clock = "";
    this.message = "";
    this.reward = 0;
    this.bot = bot;
  }

  init(){
    this.startClock();
  }

  startClock(){
    //console.log("hey");
    this.bailOut();
    this.clock = setInterval(function(){
      this.bailOut();
    },(1000*3600)*24);  // 1000 milliseconde ( 1 seconde ) * 3600 = 1 heure  * 24 pour 24heures
  }

  bailOut(){
    let collecGuild = this.bot.guilds;
    let tabGuild = collecGuild.array();
    for (let i = 0; i < tabGuild.length; i++){
      // console.log("SERVEUR : " + tabGuild[i].name);
      let collecMember = tabGuild[i].members;
      let tabMember = collecMember.array();
      for (let j = 0; j < tabMember.length; j++){
        // console.log("id pour database : "+tabMember[j].user.id + tabGuild[i].id);
        database.get(tabMember[j].user.id + tabGuild[i].id).then((res) => {
          // console.log("bailOut - On le trouve ");
          let count = 0;
          let date = new Date();
          let testdate = new Date(res.lastdate);
          while (Math.abs(dateDiff(date, testdate).day) >= 1) {
            testdate.setDate(testdate.getDate() + 1);
            count++;
            // console.log("passage boucle");
          }
          return database.put({
            _id: res._id,
            coin: res.coin+100*count,
            lastdate: date
          }).then(console.log("ajout dans on le connait ")).catch(err => {
            console.log("rater ajout dans on le connait");
            console.log(err);
          });
        }).then(() => {
          console.log("on la bien ajouté quand on le connaisait");
        }).catch(function(err) {
          console.log("bailOut - on le trouve pas");
          console.log("bailOut - ERROR : "+err);
          return database.put({
            _id: tabMember[j].user.id + tabGuild[i].id,
            lastdate: new Date(),
            coin: 100
          }).then(console.log(" bailOut - Ajout dans on le connait pas ")).catch(console.log("bailOut - rater ajout dans on le connait pas"));
        }).then(()=>{
          console.log("bailOut - on a reussis ");
        }).catch((err)=>{
          console.log("bailOut - Erreur on a pas reussi a l'ajouté");
        });
      }
      database.get(tabGuild[i].id).then(data => {
        console.log("on la trouver au debut");
        jackpot = data.valeur;
      }).catch(function(err) {
        console.log("pas de jackpot au debut");
        database.put({
          _id: tabGuild[i].id,
          valeur: 500
        }).then(jackpot => {
          jackpot = 500;
          console.log("valeur jackpot assuré");
        });
      });
    }
  }


  stopClock(){
    clearInterval(this.clock);
  }

  setMessage(msg){
    this.message = msg;
  }


  jackpotfonc(message,flag){
    database.get(message.guild.id).then((res)=>{
      if(flag === 1){
        message.reply("Jackpot : "+res.valeur);
      }
      jackpot = res.valeur;
    }).catch((err)=>{
      if(flag === 1){
        message.reply("ERROR ERROR ERROR jackpot compromised");
      }
      console.log("JACKPOT - err : "+err);
    });
  }

  coin(user,guild,message){
    database.get(user+guild).then(data=>{
      message.reply("You have "+data.coin+" coins.");
    }).catch(err=>{
      console.log("coin - ERR : "+err);
    })
  }

  nextCoin(id,msg){
    database.get(id).then(data=>{

      let now = new Date();
      let old = new Date(data.lastdate);
      old.setDate(old.getDate()+1);
      let time = dateDiff(now,old);
      console.log("nextcoin - time : "+time);
      msg.channel.send("You get next 100 coin in "+(24-Math.abs(time.hour))+"hours "+(60-Math.abs(time.min))+" minutes "+(60-Math.abs(time.sec))+" seconds.");
    }).catch(err=>{
      console.log("nextCoin - ERR : "+err);
      msg.channel.send("You are not on database yet, wait 1 days");
    });
  }

  Roulette(iddb){
    // jackpot(this.message,0);
    let actualch1 = 0;
    let actualch2 = 1;
    let actualch3 = 2;
    let actualch4 = 3;
    var timerTime;
    guildid = this.message.guild.id;
    //console.log("guildid : "+guildid);
    userid = this.message.author.id;
    //console.log("userid : "+userid);
    database.get(iddb).then((data) => {
      if (data.coin >= 20) {
        data.coin -= 20;
      } else {
        this.message.channel.send("You need more coin, come back tomorow ! ");
        return;
      }
      let ch1 = [":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"];
      let ch2 = [":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"];
      let ch3 = [":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"];
      let ch4 = [":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"];
      let cas;
      this.message.channel.send(ch1[0] + ch2[0] + ch3[0] + ch4[0]).then(()=>{
        this.message.channel.fetchMessages({
          limit: 1
        }).then(msg => {
          let tab = msg.array();
          cas = tab[0];
          for(let i = 0 ; i < 5 ; i++){
            setTimeout(function(){
              actualch1 = Math.round(Math.random() * (9 - 0) + 0);
              actualch2 = Math.round(Math.random() * (9 - 0) + 0);
              actualch3 = Math.round(Math.random() * (9 - 0) + 0);
              actualch4 = Math.round(Math.random() * (9 - 0) + 0);
              if (actualch1 > 8) {
                actualch1 = 1;
              }
              if (actualch2 > 8) {
                actualch2 = 1;
              }
              if (actualch3 > 8) {
                actualch3 = 1;
              }
              if(actualch4 > 8) {
                actualch4 = 1;
              }
              cas.edit(ch1[actualch1] + ch2[actualch2] + ch3[actualch3] + ch4[actualch4]);
              if(i == 4){
                if(ch1[actualch1] == ch2[actualch2] && ch1[actualch1] == ch3[actualch3] && ch1[actualch1] == ch4[actualch4]){
                  if(ch1[actualch1] == ":seven:"){
                    setTimeout(function(){
                      cat.channel.send("OMG MOM GET THE CAMERA, You win the SUPER JACKPOT ! ");
                      this.reward = jackpot;
                    },3000);
                  } else {
                    setTimeout(function(){
                      cas.channel.send("Oh you win !!!!");
                      this.reward = jackpot * 3;
                    },3000)
                  }
                  database.get(guildid).then(guilddb=>{
                    database.put({
                      _id : data._id,
                      coin : (data.coin + this.reward)
                    }).then(()=>{
                      //console.log("ROULETTE - ajout a la base de donnée");
                      database.put({
                        _id: guildid,
                        valeur: 500
                      }).then(()=>{
                        //console.log("ROULETTE - jackpot remis a zero");
                      });
                    });
                  }).catch(err=>{
                    console.log("roulette ERR 2 : "+err);
                  });
                } else {
                  setTimeout(function(){
                    cas.channel.send("Men you fail !");
                    this.reward = null;

                  },3000);
                  jackpot +=20;
                  //console.log("guildid 2 : "+guildid);
                  //console.log("AJOUT");
                  //console.log("--data_id : "+data._id);
                  //console.log("--data.coin : "+data.coin);
                  //console.log("--------------------------")
                  database.put({
                    _id: data._id,
                    _rev: data._rev,
                    coin: data.coin
                  }).then(/*console.log("ajout validé")*/).catch("FAIL");

                  database.get(guildid).then(jackpotdb=>{
                    database.put({
                      _id: jackpotdb._id,
                      _rev: jackpotdb._rev,
                      valeur: jackpotdb.valeur+=20
                    }).then(()=>{
                      jackpot += 20;
                    }).catch(err=>{
                      console.log("roulette - ERR : "+err);
                    });
                  });
                }
              }
            },200+i*30);
          }
        });

      });
}).catch((err)=>{
  this.message.channel.send("Oups, you are not on database, you can't play actually, wait 1 Day");
  console.log("Roulette - ERR : "+err);
});

}
}

module.exports.Casino = Casino;
