import mongoose from "mongoose";

const websiteSchema = new mongoose.Schema({
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    url: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    apiKey: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
}, {
    timestamps: true,
});

export default mongoose.model('Website', websiteSchema);