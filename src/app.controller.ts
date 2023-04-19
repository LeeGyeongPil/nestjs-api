import { Controller, Get, Post, Body, Param, UseInterceptors, Bind, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAPI(): Promise<string> {
    return await this.appService.getAPI();
  }

  @Post()
  async postAPI(@Body() param: any): Promise<string> {
    return await this.appService.postAPI()
  }

  @Post("/file")
  @UseInterceptors(FileInterceptor("file"))
  async fileAPI(@UploadedFile() file: File[], @Body() param:any): Promise<string> {
    return await this.appService.fileAPI(file)
  }

  @Get("/app/:id")
  async curlAPI(@Param("id") id:string): Promise<string> {
    return await this.appService.curlAPI(id)
  }
}