// import io from 'socket.io-client'; // Import the socket.io-client library
// import { getUserID } from "../services/user.service";
// const userId = getUserID();
// // Ensure process.env.REACT_APP_SOCKET_URL is correctly set in your .env file
// const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:9000'; // Default to localhost if not defined
// // Create the socket instance
// export const socket = io(SOCKET_URL, {
//   transports: ['websocket'], // Use WebSocket transport
//  });

// // Event listeners for socket connection status
// // On successful connection
// socket.on('connect', () => {
// socket.emit("joinRoom", userId);
// });

// // On connection error
// socket.on('connect_error', (error) => {
//   console.error("Connection error:", error);
// });

// // On general error
// socket.on('error', (error) => {
//   console.error("Socket Error:", error);
// });

// // On disconnection
// socket.on('disconnect', (reason) => {
//   console.log("Disconnected from socket:", reason); // Log disconnection reason
// });


