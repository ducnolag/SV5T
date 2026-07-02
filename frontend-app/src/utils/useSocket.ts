import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export function useSocket() {
  const [notification, setNotification] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const socket = io('/api/notifications', { // Proxy via nginx to 3007
      auth: { token },
      path: '/socket.io'
    });

    // Fallback to direct port if nginx proxy for socket is not setup
    const socketUrl = 'http://localhost:3007';
    const directSocket = io(socketUrl, { auth: { token } });

    directSocket.on('notification', (msg) => {
      if (msg === 'REFRESH_APPLICATIONS' || msg === 'REFRESH_ACTIVITIES') {
        setRefreshTrigger(prev => prev + 1);
      } else {
        setNotification(msg);
      }
    });

    directSocket.on('broadcast', (msg) => {
      if (msg === 'REFRESH_APPLICATIONS' || msg === 'REFRESH_ACTIVITIES') {
        setRefreshTrigger(prev => prev + 1);
      } else {
        setNotification(msg);
      }
    });

    return () => { 
      socket.disconnect(); 
      directSocket.disconnect();
    };
  }, []);

  const clearNotification = () => setNotification(null);
  return { notification, clearNotification, refreshTrigger };
}
