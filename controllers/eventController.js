import express from 'express';
import Event from '../models/Event.js';
import {detectEvent} from '../services/detectionEngine.js';

export const collectEvent = async (req, res) => {
    try {
        console.log("EVENT RECEIVED:", req.body);
        const event = new Event({
            websiteId: req.website._id,
            ip: req.body.ip,
            method: req.body.method,
            endpoint: req.body.endpoint,
            statusCode: req.body.statusCode,
            password: req.body.password,
            username: req.body.username,
            headers: req.body.headers,
            body: req.body.body,
            query: req.body.query,
            params: req.body.params,
        });
        await event.save();
        await detectEvent(event);
        res.status(201).json({success: true, message: 'Event collected successfully'});
    } catch (error) {
        console.error('Error collecting event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}