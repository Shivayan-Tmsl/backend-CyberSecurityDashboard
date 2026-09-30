import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
    
    attackId: { type: mongoose.Schema.Types.ObjectId, ref: 'Attack', required: true },
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    severity: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

export default mongoose.model('Alert', alertSchema);