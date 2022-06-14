import fs from 'fs'
import path from 'path';
export function toJSON(data,name) {
        /**
        * dursucht die URl auf Links. ruft diese auf und fasst die Daten in einem Array zusammen.
        * 
        * @param url die url mit der Linksammlung.
        * @returns den return wert von UrlIntoArrayAsync. Ein Array mit den Daten aus der HTML(Reihenweise und Formatiert).
         */
        //row.join(';');
        data=data.map(row=>{
          return {
            Jahr:Number(row[0]),
            Monat:Number(row[1]),
            Bundesland:row[2],
            Temperatur:Number(row[3])
          };
        });
        data.sort();
        fs.writeFileSync(path.join(`./data/${name}_file.json`),JSON.stringify(data,null,5,5));
    

}