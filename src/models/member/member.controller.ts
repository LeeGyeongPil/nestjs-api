import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseFilters } from '@nestjs/common'
import { MemberService } from './member.service'
import { Member } from './schemas/member.schema'
import { CustomException } from '../CustomException'
import { Response } from 'express'

@Controller('member')
@UseFilters(new CustomException())
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    /**
     * Get Member All List
     * @param res 
     * @returns 
     */
    @Get()
    async findAll(@Res() res: Response): Promise<Response> {
        let data = await this.memberService.findAll()

        return res.status(HttpStatus.OK).json({
            code: '0000',
            message: 'success',
            data: data
        })
    }

    /**
     * Get Member Data
     * @param id 
     * @param res 
     * @returns 
     */
    @Get('/:id')
    async find(@Param('id') id: string, @Res() res: Response): Promise<Response> {
        let data = await this.memberService.find(id)

        return res.status(HttpStatus.OK).json({
            code: '0000',
            message: 'success',
            data: data
        })
    }

    /**
     * Set Member Data
     * @param member 
     * @param res 
     * @returns 
     */
    @Post()
    async create(@Body() member: Member, @Res() res: Response): Promise<Response> {
        let data = await this.memberService.create(member)

        return res.status(HttpStatus.OK).json({
            code: '0000',
            message: 'success',
            data: data
        })
    }

    /**
     * Update Member Data
     * @param id 
     * @param member 
     * @param res 
     * @returns 
     */
    @Put('/:id')
    async update(@Param('id') id: string, @Body() member: Member, @Res() res: Response): Promise<Response> {
        await this.memberService.update(id, member)

        return res.status(HttpStatus.OK).json({
            code: '0000',
            message: 'success'
        })
    }

    /**
     * Delete Member Data
     * @param id 
     * @param res 
     * @returns 
     */
    @Delete('/:id')
    async delete(@Param('id') id: string, @Res() res: Response): Promise<Response> {
        await this.memberService.delete(id)

        return res.status(HttpStatus.OK).json({
            code: '0000',
            message: 'success'
        })
    }
}