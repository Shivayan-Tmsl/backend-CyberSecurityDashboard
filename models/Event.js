import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    websiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Website', required: true },
    ip: { type: String, required: true },
    method: { type: String, required: true },
    endpoint: { type: String, required: true },
    statusCode: { type: Number, required: true },
    password: { type: String},
    username: { type: String},
    headers: { type: Object },
    body: {type: Object},
    query: {type: Object},
    params: {type: Object},
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Event', eventSchema);