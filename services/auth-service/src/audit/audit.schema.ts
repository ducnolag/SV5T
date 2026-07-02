import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuditLogDocument = AuditLog & Document;

@Schema({ collection: 'audit_logs', timestamps: { createdAt: 'timestamp', updatedAt: false } })
export class AuditLog {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  entity_type: string;

  @Prop({ required: true })
  entity_id: string;

  @Prop({ type: Object })
  old_data: any;

  @Prop({ type: Object })
  new_data: any;

  @Prop()
  ip_address: string;

  @Prop()
  timestamp: Date;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
