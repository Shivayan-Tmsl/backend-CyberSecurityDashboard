import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import attackRoutes from "./routes/attackRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import websiteRoutes from "./routes/websiteRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import connectDB from "./config/db.js";
import {initialize} from "./socket/socket.js";
import http from "http";

dotenv.config();
const app = express();
const server = http.createServer(app);
initialize(server);

app.use(cors());
app.use(express.json());
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", attackRoutes);
app.use("/api", alertRoutes);
app.use("/api", websiteRoutes);
app.use("/api", eventRoutes);

connectDB();


const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});