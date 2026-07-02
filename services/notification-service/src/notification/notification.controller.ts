import { Controller, Post, Body } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Controller('internal')
export class NotificationController {
  constructor(private readonly gateway: NotificationGateway) {}

  @Post('notify')
  notifyUser(@Body() body: { userId: string, message: any }) {
    this.gateway.sendNotificationToUser(body.userId, body.message);
    return { success: true };
  }

  @Post('broadcast')
  broadcastMessage(@Body() body: { message: any }) {
    this.gateway.broadcast(body.message);
    return { success: true };
  }
}
