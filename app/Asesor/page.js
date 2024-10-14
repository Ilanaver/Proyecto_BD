'use client';
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Titulo from '../components/Titulo/Titulo';
import styles from './asesor.module.css';

const asesor = ({ userId, asesorId }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.current.on('connect', () => {
      console.log('Conectado al servidor de socket');
    });

    socket.current.on('receiveMessage', (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      if (socket.current) {
        socket.current.off('receiveMessage');
        socket.current.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (message && socket.current) {
      const data = {
        senderId: userId,
        receiverId: asesorId,
        message: message,
        senderType: 'user',
      };
      socket.current.emit('sendMessage', data);
      setChat((prev) => [...prev, data]);
      setMessage('');
    }
  };

  return (
    <div className={styles.chatapp}>
      <div className={styles.contenedorTitulo}>
        <Titulo texto={"Tu Asesor"}/>
      </div>
      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {chat.map((msg, index) => (
            <div key={index} className={styles.message }>
              <p className={styles.mensaje}>{msg.message}</p>
            </div>
          ))}
        </div>
        <div className={styles.inputArea}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mensaje..."
          />
          <button className={styles.sendBtn} onClick={sendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default asesor;