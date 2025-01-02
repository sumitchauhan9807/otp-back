const axios = require("axios");
const fs = require("fs");

const countries = ['Albania', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Australia', 'Austria', 'Bahamas', 'Barbados', 'Belgium', 'Bolivia', 'Bosnia And Herzegovina', 'Brazil', 'British Virgin Islands', 'Bulgaria', 'Canada', 'Cayman Islands', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Dominica', 'Dominican Republic', 'Ecuador', 'El Salvador', 'Estonia', 'Finland', 'France', 'French Guiana', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guadeloupe', 'Guatemala', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Kenya', 'Latvia', 'Lithuania', 'Luxembourg', 'Macao', 'Malaysia', 'Malta', 'Martinique', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Netherlands', 'New Zealand', 'Nicaragua', 'North Macedonia', 'Norway', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Reunion', 'Romania', 'Saint Martin', 'Saint Pierre And Miquelon', 'Saudi Arabia', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Trinidad and Tobago', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Venezuela', 'Vietnam']
console.log(countries.length);
//https://www.didww.com/_next/data/BCc9OgRXEbF5LDB_YG2gE/phone-numbers/all-phone-numbers/Australia/Local.json
// You can add parameters directly to the URL
let not_found = []
countries.forEach((country)=>{
  country = country.replaceAll(" ","_")
  axios
  .get(
    `https://www.didww.com/_next/data/BCc9OgRXEbF5LDB_YG2gE/phone-numbers/all-phone-numbers/${country}/Local.json`
  )
  .then((response) => {
    // console.log(response.data);
    saveFile(country, response.data);
  })
  .catch((error) => {
    saveFile2(country, {});
    console.log("there was an err");
    // console.error(error);
  });
})


const saveFile = (name, data) => {
  fs.writeFile(`./countries/${name}.json`, JSON.stringify(data), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
};
const saveFile2 = (name, data) => {
  fs.writeFile(`./notfound/${name}.json`, JSON.stringify(data), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
};

// let countries = []
// let all = document.getElementsByClassName('styles_name__FeTpC')
// for(i=0;i<all.length;i++){ 
//   console.log(all[i].innerHTML)
//   countries.push(all[i].innerHTML)
// }
// console.log(countries)

// console.log(JSON.parse(countries))

// ['Albania', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Australia', 'Austria', 'Bahamas', 'Barbados', 'Belgium', 'Bolivia', 'Bosnia And Herzegovina', 'Brazil', 'British Virgin Islands', 'Bulgaria', 'Canada', 'Cayman Islands', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Dominica', 'Dominican Republic', 'Ecuador', 'El Salvador', 'Estonia', 'Finland', 'France', 'French Guiana', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guadeloupe', 'Guatemala', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Kenya', 'Latvia', 'Lithuania', 'Luxembourg', 'Macao', 'Malaysia', 'Malta', 'Martinique', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Netherlands', 'New Zealand', 'Nicaragua', 'North Macedonia', 'Norway', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Reunion', 'Romania', 'Saint Martin', 'Saint Pierre And Miquelon', 'Saudi Arabia', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Trinidad and Tobago', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Venezuela', 'Vietnam']