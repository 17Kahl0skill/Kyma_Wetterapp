import assert from 'assert';
import { stringify } from 'querystring';
import {WebScraper} from '../Scraper/webScraper.js'

describe('Webscraper testing', ()=>{
    describe('_transFormData testing', ()=>{
        let web
        before(()=>{        
            web = new WebScraper();
        })
        it('transform rawdata to cleandata',()=>{
            let rawdata =['Zeitreihen fuer Gebietsmittel fuer Bundeslaender und Kombinationen von Bundeslaender, erstellt am: 20220602',
            'Jahr;Monat;Brandenburg/Berlin;Brandenburg;Baden-Wuerttemberg;Bayern;Hessen;Mecklenburg-Vorpommern;Niedersachsen;Niedersachsen/Hamburg/Bremen;Nordrhein-Westfalen;Rheinland-Pfalz;Schleswig-Holstein;Saarland;Sachsen;Sachsen-Anhalt;Thueringen/Sachsen-Anhalt;Thueringen;Deutschland;',
            '1881;01;    -5.54;    -5.56;    -4.89;    -6.51;    -5.68;    -5.07;    -4.55;    -4.55;    -4.21;    -4.49;    -4.06;    -4.15;    -6.22;    -5.89;    -6.28;    -6.76;    -5.36;',
            '1882;01;     1.43;     1.42;    -0.65;    -1.33;    -0.30;     1.59;     1.73;     1.73;     1.26;    -0.17;     2.11;    -0.04;     0.63;     1.18;     0.60;    -0.12;     0.41;']
            
            //representing one clean datarow
            let cleandata = ['1881','01','Brandenburg/Berlin','-5.54'];

            let result = web._transFormData(rawdata);
            
            assert.deepStrictEqual(result[0],cleandata);
        })
        it('should have deleted the first two datarows',()=>{
            let rawdata =['should be deleted',
            'Jahr;Monat;Brandenburg/Berlin;Brandenburg;Baden-Wuerttemberg;Bayern;Hessen;Mecklenburg-Vorpommern;Niedersachsen;Niedersachsen/Hamburg/Bremen;Nordrhein-Westfalen;Rheinland-Pfalz;Schleswig-Holstein;Saarland;Sachsen;Sachsen-Anhalt;Thueringen/Sachsen-Anhalt;Thueringen;Deutschland;',
            '1881;01;    -5.54;    -5.56;    -4.89;    -6.51;    -5.68;    -5.07;    -4.55;    -4.55;    -4.21;    -4.49;    -4.06;    -4.15;    -6.22;    -5.89;    -6.28;    -6.76;    -5.36;',
            '1882;01;     1.43;     1.42;    -0.65;    -1.33;    -0.30;     1.59;     1.73;     1.73;     1.26;    -0.17;     2.11;    -0.04;     0.63;     1.18;     0.60;    -0.12;     0.41;']

            //should have been deleted
            let cleandata = ['should be deleted'];

            let result = web._transFormData(rawdata);
            
            assert.notDeepEqual(result[0],cleandata);
        })
        it('should be using the second datarow as a new column',()=>{
            let rawdata =['should be deleted',
            'Jahr;Monat;Brandenburg/Berlin;Brandenburg;Baden-Wuerttemberg;Bayern;Hessen;Mecklenburg-Vorpommern;Niedersachsen;Niedersachsen/Hamburg/Bremen;Nordrhein-Westfalen;Rheinland-Pfalz;Schleswig-Holstein;Saarland;Sachsen;Sachsen-Anhalt;Thueringen/Sachsen-Anhalt;Thueringen;Deutschland;',
            '1881;01;    -5.54;    -5.56;    -4.89;    -6.51;    -5.68;    -5.07;    -4.55;    -4.55;    -4.21;    -4.49;    -4.06;    -4.15;    -6.22;    -5.89;    -6.28;    -6.76;    -5.36;']
            
            //should have been deleted
            let cleandata = ['Brandenburg/Berlin','Brandenburg','Baden-Wuerttemberg','Bayern','Hessen','Mecklenburg-Vorpommern','Niedersachsen','Niedersachsen/Hamburg/Bremen','Nordrhein-Westfalen','Rheinland-Pfalz','Schleswig-Holstein','Saarland','Sachsen','Sachsen-Anhalt','Thueringen/Sachsen-Anhalt','Thueringen','Deutschland'];
            let result = web._transFormData(rawdata);
            
            let index=0;
            for (let element of result)
            {            
                assert.equal(element[2],cleandata[index++]);
            }
        })
        it('should return null wenn die daten leer sind',()=>{
            let rawdata =[]            

            let result = web._transFormData(rawdata);
                
            assert.equal(result,null);
        })
    })
})