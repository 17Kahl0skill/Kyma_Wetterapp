import axios from 'axios';
import cheerio from 'cheerio';


export class WebScraper {
    /**
     * Erlaubt das downloaden und reiningen von Wetterdaten.
     * Klassenfunktionen sollen genutzt werden.
     * Es gibt keine Inititalen Übergabe werte für den Konstruktor.
     */
    constructor() {

    }
    async multipleDatasitesAsync(url) {
        /**
        * dursucht die URl auf Links. ruft diese auf und fasst die Daten in einem Array zusammen.
        * 
        * @param url die url mit der Linksammlung.
        * @returns den return wert von UrlIntoArrayAsync. Ein Array mit den Daten aus der HTML(Reihenweise und Formatiert).
        */ 


        const response = await axios.get(url);
        let $ = cheerio.load(response.data);


        const linkObjects = $('a');
        // this is a mass object, not an array

        // Collect the "href" and "title" of each link and add them to an array
        const links = [];
        for(let element of linkObjects) {
            links.push({
                text: $(element).text(), // get the text
                href: $(element).attr('href'), // get the href attribute
            });
        };
        let test = [];
        links.shift();
        for(let element of links){
            const result = await this.UrlIntoArrayAsync(url + element.href)
            test.push(...result);
        }

        return test;

        //debug
        //console.log(datasheet);
    }

    async UrlIntoArrayAsync(url) {
        /**
         * ruft die URL auf und gibt die HTML weiter.
         * 
         * @param url die url von den Daten, die man herunterladen möchte.
         * @returns den returnwert von #transFormData. Ein Array mit den Daten aus der HTML(Reihenweise und Formatiert).
         */

        let htmlWithData = [];
        const response = await axios.get(url);
        let $ = cheerio.load(response.data);
        htmlWithData = $('body').html().split('\n');


        let array = this._transFormData(htmlWithData);
        //debug
        //console.log(array);
        return array;
    }

    _transFormData(data_row) {
        /**
         * Transformiert die HTML zu einem Array. Array stellt die fertige Tabelle dar.
         * 
         * Die HTML wird in ein String Array gespalten und verarbeitet. Daten werden Reihenweise in einem Array gespeichert.
         * 
         * @access private
         * 
         * @param data ist das HTML Element mit den Daten
         * @returns datasheet ist ein Array, der alle Daten der HTML beinhaltet (Reihenweise gespeichert).
         */
         
        //spaltet HTMl in Array und löscht einen unnötigen Satz
        let array = data_row;
        array.shift();

        //extrahieren der Header
        let headerColumn = array.shift().split(';');
        const jahr = 0;
        const monat = 1;
        let datasheet = [];

        //Formatieren der Daten in ein Array und dem richtigen Format.
        for(let element of array) {
            let data_row = element.split(';');
            for (let index = 2; index < headerColumn.length - 1; index++) {
                var datastring = [data_row[jahr], data_row[monat], headerColumn[index], data_row[index]?.trim()];
                datastring.join();
                datasheet.push(datastring);
            }
            datastring = '';
        };
        //debug
        //console.log(datasheet);
        return datasheet;
    }
    
}