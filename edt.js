const Discord = require('discord.js');
const request = require('request');
let Master1FI = 1;
let Master2FI = 2;
let Master1FA = 3;
let Master2FA = 4;

class EDT {
  constructor(classe){
    if(classe === Master1FI){
      this.username = process.env.ISTVUM1;
      this.password = process.env.ISTVPM1;
    } else if(classe == Master2FI){
      this.username = process.env.ISTVUSER;
      this.password = process.env.ISTVPASS;
    } else if(classe == Master1FA){

    } else if(classe == Master2FA){

    }
  }

  connection(){
    return new Promise(function(resolve,reject){
      request({
        uri: "https://cas.uphf.fr/cas/login?service=https%3A%2F%2Fvtmob.uphf.fr%2Fesup-vtclient-up4%2Fstylesheets%2Fdesktop%2Fwelcome.xhtml",
        followAllRedirects: true
      },function(error,response,body){
          if(error) reject("error");
          resolve(response);
      });
    });
  }
  edt_requests(Username,Password){
    var obj = this;
    return new Promise(function(resolve,reject){
      obj.connection().then(function(response){
        var body = response['body'];
        var classe = 2;
        var next = -1;
        var _lt = body.match(/LT-[0-9]+-[a-zA-Z0-9]+-cas\.uphf\.fr/g)[0];
        var _exec =body.match(/execution" value="[a-zA-Z0-9]+/g)[0].split("=")[1].replace("\"","");
        var _evt = "submit";
        var _ipadress = body.match(/ipAddress" value="[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/g)[0].split("=")[1].replace("\"","");
        var _useragent = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) \\ Gecko/20100101 Firefox/40.1"
        var _submit ="Connexion";
        var sessionid = body.match(/jsessionid=[a-zA-Z0-9]+/g)[0].split("=")[1];
        
        var form_data = {
          'username': Username,
          'password': Password,
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



        request(option,function(err,resp,body){
          if(err){
            console.log("err : "+err);
            reject("fail1");
          }
          console.log("status : "+resp.statusCode);

          resolve(body);



        });

      }).catch(function(err){
        console.log('Error in connection : '+err);
      });
    });
  }
  parsing(html){
     var oclock = null;
     var jour = null;
     var classe = 2;
     console.log('-------------------\n\n\n\n');
     var test = html.match(/<td class="blank_column"><b>(.|\n|\r)*<tr class="even_row"><td class="blank_column" colspan="58">/gi);
     if(test === null){
       console.log("fail no body");
       return "Error to load schedule !";
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
     // console.log("oclock : "+oclock);
     // console.log("jour : "+jour);
     // console.log("emb : "+embedt);
     if(oclock === null){

       if(jour != null){
           // if(embedt.fields.length > 0)
             return(embedt);
       } else {
            console.log('sending embedded !');
           // if(embedt.fields.length > 0)
             return(embedt);
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
  exec(){
    var obj = this;
    return new Promise(function(resolve,reject){
      obj.edt_requests(obj.username,obj.password).then(function(val){
        console.log('requests done ! ');
        console.log('trying parsing');
        var emb = obj.parsing(val);
        console.log("parsing done !");
        resolve(emb);
      }).catch(function(err){
        console.log('Error in edt_requests : '+err);
        reject(null);
      });
    });
  }
}
module.exports.EDT = EDT;
