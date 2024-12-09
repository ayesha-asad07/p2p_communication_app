import { io } from 'socket.io-client';
const socket = io('http://localhost:5000'); // Adjust based on backend URL
export default socket;
