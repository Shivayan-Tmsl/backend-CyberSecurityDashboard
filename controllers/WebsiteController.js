import express from 'express';
import Website from '../models/Website.js';
import User from '../models/User.js';
import { generateApiKey } from '../utils/generateApiKey.js';

export const registerWebsite = async (req, res) => {
    console.log("🔥 registerWebsite called");

    try {
        console.log("BODY:", req.body);
        console.log("USER:", req.user);

        const user = await User.findById(req.user.id);

        console.log("FOUND USER:", user);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const { name, url } = req.body;

        const newWebsite = new Website({
            userId: req.user.id,
            name,
            url,
            apiKey: generateApiKey(),
        });

        console.log("WEBSITE BEFORE SAVE:", newWebsite);

        await newWebsite.save();

        console.log("✅ WEBSITE SAVED:", newWebsite);

        return res.status(201).json({
            success: true,
            website: newWebsite
        });

    } catch (error) {
        console.error("❌ Error registering website:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getWebsites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const websites = await Website.find({ userId: req.user.id }).sort({ timestamp: -1 });
        res.json(websites);
    } catch (error) {
        console.error('Error fetching websites:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};