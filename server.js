const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join', (sessionId) => {
        socket.join(sessionId);
        console.log(`User ${socket.id} joined session: ${sessionId}`);
    });

    socket.on('offer', ({ offer, sessionId }) => {
        console.log(`Received offer for session: ${sessionId}`);
        socket.to(sessionId).emit('offer', offer);
    });

    socket.on('answer', ({ answer, sessionId }) => {
        console.log(`Received answer for session: ${sessionId}`);
        socket.to(sessionId).emit('answer', answer);
    });

    socket.on('candidate', ({ candidate, sessionId }) => {
        console.log(`Received ICE candidate for session: ${sessionId}`);
        socket.to(sessionId).emit('candidate', candidate);
    });

    socket.on('chat message', ({ message, sessionId }) => {
        console.log(`Received chat message for session: ${sessionId}`);
        socket.to(sessionId).emit('chat message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
