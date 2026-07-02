import { NotificationGateway } from './notification.gateway';
export declare class NotificationController {
    private readonly gateway;
    constructor(gateway: NotificationGateway);
    notifyUser(body: {
        userId: string;
        message: any;
    }): {
        success: boolean;
    };
    broadcastMessage(body: {
        message: any;
    }): {
        success: boolean;
    };
}
