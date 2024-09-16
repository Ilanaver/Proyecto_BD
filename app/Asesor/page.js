/*'use client';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Titulo from '../components/Titulo/Titulo';

//const socket = io.connect('http://localhost:3001');

const asesor = ({ userId, asesorId }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      const data = {
        senderId: userId,
        receiverId: asesorId,
        message: message,
        senderType: 'user', 
      };
      socket.emit('sendMessage', data);
      setChat((prev) => [...prev, data]);
      setMessage('');
    }
  };

  return (
    <div className="chat-app">
      <header>
        <Titulo texto={"Agregar Contenido"}/>
      </header>
      <div className="chat-container">
        <div className="messages">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.senderType === 'user' ? 'sent' : 'received' 
              }`}
            >
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mensaje..."
          />
          <button className="send-btn" onClick={sendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default asesor;*/