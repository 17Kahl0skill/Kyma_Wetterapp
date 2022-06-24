import { WebScraper } from "./Scraper/webScraper.js";
import { toJSON } from "./data/flatfileData.js";

//diese Datei wird über 'npm start' ebenfalls neben dem Servergestartet.
//muss daher aus der pacckage.json entfernt werden sobald eine Datenbankschnittstelle implementiert ist.



const web = new WebScraper() ;
const url1 = 'https://opendata.dwd.de/climate_environment/CDC/regional_averages_DE/monthly/air_temperature_mean/'
const url2 = 'https://opendata.dwd.de/climate_environment/CDC/regional_averages_DE/monthly/sunshine_duration/'
const url3 = 'https://opendata.dwd.de/climate_environment/CDC/regional_averages_DE/monthly/precipitation/'

//web.multipleDatasites(url1);
//web.multipleDatasitesAsync(url1);
//web.multipleDatasitesAsync(url2);
//web.multipleDatasitesAsync(url3);

    web.multipleDatasitesAsync(url1).then((result) => {
        toJSON(result,'Temperature');
    }).catch((err) => {
        console.log(err);
    });
    web.multipleDatasitesAsync(url2).then((result) => {
        toJSON(result,'Sonnenstunden');
    }).catch((err) => {
        console.log(err);
    });
    web.multipleDatasitesAsync(url3).then((result) => {
        toJSON(result,'Niederschlag');
    }).catch((err) => {
        console.log(err);
    });
