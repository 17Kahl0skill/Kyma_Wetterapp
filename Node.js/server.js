import express from "express";
import Temperatur from './routes/Temperatur.js';
import Niederschlag from './routes/Niederschlag.js';
import Sonnenstunden from './routes/Sonnenstunden.js';
const server = express();

server.use('/Temperatur',Temperatur);
server.use('/Niederschlag',Niederschlag);
server.use('/Sonnenstunden',Sonnenstunden);

server.set('json spaces',1);

server.listen(8080,()=> console.log('Server läuft auf Port 8080!'));

server.get('/',(req,res)=>{

    console.log('App läuft.');
    res.send('Du kannst daten abfragen über /Niederschlag , /Sonnenstunden und /Temperatur')
})