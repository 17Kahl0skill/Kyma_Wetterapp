const axios = require('axios');
const cheerio = require('cheerio');



const url1 = 'https://opendata.dwd.de/climate_environment/CDC/regional_averages_DE/monthly/air_temperature_mean/'
const url2 ='https://opendata.dwd.de/climate_environment/CDC/regional_averages_DE/monthly/air_temperature_mean/regional_averages_tm_01.txt'
async function makeRequest(url) {

    axios.get(url)
        .then((response) => {
            let $ = cheerio.load(response.data);
            var array=$('body').html().split('\n');

            array.shift();
            var headerColumn = array.shift().split(';');
            const jahr = 0;
            const monat = 1;
            var datasheet=[];
            
            array.forEach(element => {
                var data=element.split(';');
                for (let index = 2; index < headerColumn.length-1; index++){
                    var datastring=[data[jahr],data[monat],headerColumn[index],data[index]?.trim()];
                    datastring.join();
                    datasheet.push(datastring);
            }
                datastring = null;    
            });
            console.log(datasheet);
        })
        .catch((error) => {
            console.log(error);
        });
}

makeRequest(url2);
