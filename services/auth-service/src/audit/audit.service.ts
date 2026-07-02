import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog, AuditLogDocument } from './audit.schema';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(AuditLog.name) private auditLogModel: Model<AuditLogDocument>,
  ) {}

  async logAction(
    userId: string,
    action: string,
    entityType: string,
    entityId: string,
    oldData?: any,
    newData?: any,
    ipAddress?: string,
  ): Promise<AuditLog> {
    const newLog = new this.auditLogModel({
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      old_data: oldData,
      new_data: newData,
      ip_address: ipAddress,
      timestamp: new Date(),
    });
    return newLog.save();
  }
}
