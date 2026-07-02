import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization?.split(' ')[1] || client.handshake.auth.token;
    
    if (!token) {
      client.disconnect();
      return;
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'sv5t-super-secret-key');
      // Join user to a specific room based on their ID
      client.join(`user_${decoded.sub}`);
      console.log(`Client connected: ${client.id} - User ID: ${decoded.sub}`);
    } catch (err) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendNotificationToUser(userId: string, message: any) {
    this.server.to(`user_${userId}`).emit('notification', message);
  }

  broadcast(message: any) {
    this.server.emit('broadcast', message);
  }
}
