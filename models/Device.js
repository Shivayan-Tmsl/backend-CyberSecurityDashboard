import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    hostname: { type: String, required: true },
    ipAddress: { type: String, required: true },
    operatingSystem: { type: String, required: true },
    status: { type: String, required: true },
    lastSeen: { type: Date, required: true },
}, {
    timestamps: true,
});

export default mongoose.model('Device', deviceSchema);