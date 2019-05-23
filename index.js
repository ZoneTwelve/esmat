const request = require('sync-request'),
      cheerio = require('cheerio'),
      fs = require('fs');

const INTRODUCTIONS = fs.readFileSync(".introduction", "UTF8");
const SOURCE = require('./SOURCE');
const word = process.argv[2]||undefined;
function main(){
  console.log("WORD: ", word);
  
  console.log("MEANING: ");
  console.log(synonyms(word));
}

function synonyms(word){
  //Synonyms for ${word}
  //console.log(SOURCE);
  var result = [];
  let options = {
    url:SOURCE.similar.replace(/\%s/, word),
    header:{
      'User-Agent':"english self leaning"
    }
  }

  let res = request("GET", options.url);
  let $ = cheerio.load(res.body.toString());
  let wordlist = $('[class="css-0 e1991neq0"]:first-child>[class="css-1lc0dpe et6tpn80"]>li>span>a');
  for(var i=0;i<wordlist.length;i++){
    result.push(" - "+wordlist.eq(i).text());
    //console.log(wordlist.eq(i).text());
  }
  /*translate(result.join("\r\n"), {to:"zh-tw"}).then(res => {
    console.log(res.from.text.value);
    //=> I [speak] Dutch
  }).catch(err => {
    console.error(err);
  });
  */
  return result.join("\r\n");
}


process.argv[2]!==undefined?main():console.log(INTRODUCTIONS);


