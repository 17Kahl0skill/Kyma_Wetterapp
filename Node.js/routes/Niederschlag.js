import express from "express";
import Niederschlag from '../data/Niederschlag_file.json' assert { type: 'json' };
const router = express.Router();


router.route('/').get((req,res)=>{
    res.send(Niederschlag);
}).delete(errorhandler).post(errorhandler).put(errorhandler)

router.route('/download').get((req,res)=>{
    res.setHeader('Content-disposition', 'attachment; filename=Niederschlag_daten.json');
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(Niederschlag);
}).delete(errorhandler).post(errorhandler).put(errorhandler)

function errorhandler(req,res, next){
    res.status(404);
    res.send('Nur Get Requests sind erlaubt.')
    next();
}

export default router;