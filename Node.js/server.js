import express from "express";
import Temperatur from './routes/Temperatur.js';
import Niederschlag from './routes/Niederschlag.js';
import Sonnenstunden from './routes/Sonnenstunden.js';
const server = express();

server.use('/Temperatur',Temperatur);
server.use('/Niederschlag',Niederschlag);
server.use('/Sonnenstunden',Sonnenstunden);

server.set('json spaces',1);

server.listen(3000,()=> console.log('Server läuft auf Port 3000!'));

server.get('/',(req,res)=>{

    console.log('App läuft.');
    res.send('kannst daten abfragen')
})