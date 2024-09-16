/*'use client';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
<<<<<<< HEAD:app/Asesor/page.js
import Titulo from '../components/Titulo/Titulo';
=======
import styles from './asesor.module.css';
>>>>>>> 6b0b41aaf02eb93f734123b7c9c4ca92ed51a292:app/Asesor/Asesor.js

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
    <div className={styles.chatapp}>
      <header>
        <Titulo texto={"Agregar Contenido"}/>
      </header>
      <div className={styleschat-container}>
        <div className={stylesmessages}>
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`styles.message ${
                msg.senderType === 'user' ? 'sent' : 'received' 
              }`}
            >
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
        <div className={styles.input-area}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mensaje..."
          />
          <button className={styles.send-btn} onClick={sendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default asesor;*/