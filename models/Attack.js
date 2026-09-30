import mongoose from "mongoose";

const attackSchema = new mongoose.Schema({
     
    websiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Website', required: true },
    ip: { type: String, required: true },
    type: { type: String, required: true },
    severity: { type: String, required: true },
    country: { type: String, required: false },
    description: { type: String, required: false },
    timestamp: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

export default mongoose.model('Attack', attackSchema);