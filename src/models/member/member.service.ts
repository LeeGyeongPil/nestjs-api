import { Model } from 'mongoose'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Member, MemberDocument } from './schemas/member.schema'

@Injectable()
export class MemberService {
    constructor(@InjectModel(Member.name) private memberModel: Model<MemberDocument>) {}

    async create(member: Member): Promise<Member> {
        const mem = new this.memberModel(member)
        return await mem.save()
    }

    async findAll(): Promise<Member[]> {
        return await this.memberModel.find({}, {"MemberId":1, "MemberName":1}).exec()
    }

    async find(id: string): Promise<Member> {
        const member: Member = await this.memberModel.findOne({ MemberId: id })

        if (!member) {
            throw new NotFoundException('Member not found.')
        }

        return member
    }

    async update(id: string, param): Promise<boolean> {
        const member: Member = await this.memberModel.findOne({ MemberId: id })

        if (!member) {
            throw new NotFoundException('Member not found.')
        }

        let result = await this.memberModel.updateOne({ MemberId: id }, { $set: param })
        return true
    }

    async delete(id: string): Promise<boolean> {
        const member: Member = await this.memberModel.findOne({ MemberId: id })

        if (!member) {
            throw new NotFoundException('Member not found.')
        }

        let result = await this.memberModel.deleteOne({ MemberId: id })
        if (result.deletedCount > 0) {
            return true
        } else {
            return false
        }
    }
}