const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
const taskQueue = []; // In-memory queue
const clients = new Map(); // Map to track clients by ID

server.on('connection', (ws) => {
  const clientId = Date.now().toString(); // Generate a unique client ID
  clients.set(clientId, ws);

  console.log(`Client connected: ${clientId}`);

  ws.on('message', (message) => {
    const task = JSON.parse(message);

    if (task.type === 'submit-task') {
      console.log(`Received task from ${clientId}:`, task.payload);

      // Add task to the queue with client ID
      taskQueue.push({ clientId, taskId: task.payload.id, payload: task.payload });

      ws.send(JSON.stringify({ type: 'task-received', taskId: task.payload.id }));
    }
  });

  ws.on('close', () => {
    console.log(`Client disconnected: ${clientId}`);
    clients.delete(clientId);
  });
});

// Simulate processing tasks from the queue
setInterval(() => {
  if (taskQueue.length > 0) {
    const { clientId, taskId, payload } = taskQueue.shift(); // Dequeue a task

    // Simulate task processing
    console.log(`Processing task: ${taskId}`);
    setTimeout(() => {
      const result = { taskId, result: `Processed ${payload.data}` };

      // Send result back to the client
      const client = clients.get(clientId);
      if (client) {
        client.send(JSON.stringify({ type: 'task-complete', payload: result }));
        console.log(`task ${payload.data} completed`)
      }
    }, 2000); // Simulate processing delay
  }
}, 1000);

console.log('WebSocket server is running on ws://localhost:8080');