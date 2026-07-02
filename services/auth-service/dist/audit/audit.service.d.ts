import { Model } from 'mongoose';
import { AuditLog, AuditLogDocument } from './audit.schema';
export declare class AuditService {
    private auditLogModel;
    constructor(auditLogModel: Model<AuditLogDocument>);
    logAction(userId: string, action: string, entityType: string, entityId: string, oldData?: any, newData?: any, ipAddress?: string): Promise<AuditLog>;
}
