import express from "express";
import Sonnenstunden from '../data/Sonnenstunden_file.json' assert { type: 'json' };
const router = express.Router();


router.route('/').get((req,res)=>{
    res.send(Sonnenstunden);
}).delete(errorhandler).post(errorhandler).put(errorhandler)

router.route('/download').get((req,res)=>{
    res.setHeader('Content-disposition', 'attachment; filename=Sonnenstunden_daten.json');
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(Sonnenstunden);
}).delete(errorhandler).post(errorhandler).put(errorhandler)

function errorhandler(req,res, next){
    res.status(404);
    res.send('Nur Get Requests sind erlaubt.')
    next();
}

export default router;