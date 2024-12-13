import { Middleware } from '@reduxjs/toolkit';

let socket: WebSocket | null = null;
let isConnected = false; // Tracks if a connection is already active

const websocketMiddleware: Middleware = (store) => (next) => (action: any) => {
  if (action.type === 'websocket/connect') {
    if (!socket || socket.readyState === WebSocket.CLOSED) {
      if (isConnected) {
        console.log('WebSocket connection already established (dev mode safeguard).');
        return;
      }

      socket = new WebSocket(action.payload.url);
      isConnected = true; // Set the flag

      socket.onopen = () => {
        console.log('WebSocket connected');
        store.dispatch({ type: 'websocket/connected' });
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type === 'task-complete') {
          store.dispatch({
            type: 'tasksSlice/taskCompleted',
            payload: message.payload,
          });
        }
      };

      socket.onclose = () => {
        console.log('WebSocket disconnected');
        isConnected = false; // Reset the flag
        store.dispatch({ type: 'websocket/disconnected' });
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        store.dispatch({ type: 'websocket/error', payload: error });
      };
    } else {
      console.log('WebSocket already connected');
    }
  }

  if (action.type === 'websocket/send' && socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(action.payload));
  }

  if (action.type === 'websocket/disconnect') {
    if (socket) {
      socket.close();
      socket = null;
      isConnected = false; // Reset the flag
    }
  }

  next(action);
};

export default websocketMiddleware;