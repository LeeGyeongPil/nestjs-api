import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getAPI(): Promise<string> {
    return 'GET API'
  }

  async postAPI(): Promise<string> {
    return 'POST API'
  }

  async curlAPI(id: string): Promise<string> {
    const result = this.httpService.get('http://127.0.0.1:3001', { headers: { 'apikey' : 'a498gun93w4v04308jvg03a0348jtw4g' } }).pipe()
    const response = await lastValueFrom(result)
    return 'CURL API : ' + id + ' > ' + response.data
  }

  async fileAPI(file:any): Promise<string> {
    return 'FILE API : ' + file.originalname
  }
}
