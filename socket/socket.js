import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io;

export const initialize = (server) => {

    io = new Server(server, {
        cors: {
            origin: "https://frontend-cyber-security-dashboard-eight.vercel.app/",
        }
    });

    io.on("connection", (socket) => {

        try {

            // Get JWT sent by frontend
            const token = socket.handshake.auth.token;

            if (!token) {
                console.log("Socket connection rejected: No token");
                socket.disconnect();
                return;
            }

            // Verify JWT
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // IMPORTANT:
            // Change decoded.id to decoded.userId if
            // your JWT stores the user ID as userId
            const userId = decoded.id;

            if (!userId) {
                console.log("Socket connection rejected: No user ID");
                socket.disconnect();
                return;
            }

            // Store user ID on socket
            socket.userId = userId;

            // Put this socket in user's private room
            socket.join(`user_${userId}`);

            console.log(`Client connected: User ${userId}`);
            console.log(`Joined room: user_${userId}`);

            socket.on("disconnect", () => {
                console.log(`Client disconnected: User ${userId}`);
            });

        } catch (error) {

            console.log("Socket authentication failed:", error.message);

            socket.disconnect();
        }
    });
};

export const getIO = () => {
    return io;
};