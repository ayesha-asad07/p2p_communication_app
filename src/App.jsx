import { useEffect, useState } from 'react';
import axios from 'axios';
import PeerList from './components/PeerList';
import ChatBox from './components/ChatBox';
import FileUpload from './components/FileUpload';
import FileSync from './components/FileSync';
import Navbar from './components/Navbar';
import socket from './utils/socket';
import { useNavigate } from 'react-router-dom';

function App() {
  const [peers, setPeers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('General');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  ///const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios
        .get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem('jwtToken');
        });
    }
  }, []);

  useEffect(() => {
    socket.on('receive-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('peer-list', (peerList) => {
      setPeers(peerList);
    });

    return () => {
      socket.off('receive-message');
      socket.off('peer-list');
    };
  }, []);

  const joinRoom = (room) => {
    socket.emit('join-room', room);
    setCurrentRoom(room);
  };

  const sendMessage = (message) => {
    socket.emit('chat-message', { room: currentRoom, message });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setUser(response.data.user);
      useNavigate('/files');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        email,
        password,
      });
      alert('User registered successfully');
      useNavigate('/');
    } catch (err) {
      setError('Registration failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
    useNavigate('/');
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 p-6 border rounded shadow-md">
          <h2 className="text-xl text-center mb-4">Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block">Email</label>
              <input
                type="email"
                className="w-full p-2 mt-1 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block">Password</label>
              <input
                type="password"
                className="w-full p-2 mt-1 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Login
            </button>
            <div className="mt-4 text-center">
              <span>Don't have an account? </span>
              <button onClick={() => setUser(null)} className="text-blue-500">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="flex-grow flex">
        <PeerList peers={peers} onJoinRoom={joinRoom} />
        <div className="flex-grow">
          <ChatBox messages={messages} sendMessage={sendMessage} />
          <FileUpload />
          <FileSync />
        </div>
      </div>
    </div>
  );
}

export default App;
