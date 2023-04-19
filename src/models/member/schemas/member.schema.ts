import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

export type MemberDocument = HydratedDocument<Member>

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Member {
    @Prop({ require: true, unique:true, type: mongoose.Schema.Types.String }) MemberId: string
    @Prop({ require: true, type: mongoose.Schema.Types.String }) MemberName: string
    @Prop({ default: new Date(), type: mongoose.Schema.Types.Date }) createdAt: Date
    @Prop({ default: new Date(), type: mongoose.Schema.Types.Date }) updatedAt: Date
}

export const MemberSchema = SchemaFactory.createForClass(Member)