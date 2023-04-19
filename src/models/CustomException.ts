import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from 'express';

@Catch()
export class CustomException implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let statusCode = 500
        let msg = 'server error.'
        let code = '9999'
        if (!exception.code) {
            statusCode = exception.response.statusCode
            msg = exception.response.message
        } else {
            switch('' + exception.code) {
                case '11000':
                    code = '1000'
                    msg = `${Object.keys(exception.keyValue)[0]} already exists.`
                    break
            }
        }
        response.status(statusCode).json({
            code: code,
            message: msg
        });
    }
}