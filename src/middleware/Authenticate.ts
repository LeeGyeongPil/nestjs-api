import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class Authenticate implements NestMiddleware {
    use(req: any, rest:any, next: () => void): any {
        if (!req.headers['apikey']) {
            throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
        }

        next()
    }
}