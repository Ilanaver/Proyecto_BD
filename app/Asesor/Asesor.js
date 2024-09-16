import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from './asesor.module.css';

const socket = io.connect('http://localhost:3001');

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
        <img src="./flechaatras.png" alt=""/>
        <h1>Tu asesor</h1>
        <img src="./signoperfil.png" alt=""/>
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

export default asesor;