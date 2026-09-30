import express from 'express';
import Website from '../models/Website.js';

const authWebsiteMiddleware = async(req,res,next) =>{
    const apiKey = req.headers['x-api-key'];
    if(!apiKey){
        return res.status(401).json({message: 'No API key provided'});
    }

    const website = await Website.findOne({apiKey});
    if(!website){
        return res.status(401).json({message: 'Invalid API key'});
    }
    req.website = website;
    next();
}

export default authWebsiteMiddleware;