import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// axios
import { HttpModule } from '@nestjs/axios';

// 미들웨어
import { Authenticate  } from './middleware/Authenticate';

// mongodb
import { MongooseModule } from '@nestjs/mongoose';

import { MemberModule } from './models/member/member.module';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      HttpModule,
      MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`, { useNewUrlParser: true, useUnifiedTopology: true, dbName: `${process.env.DB_NAME}` }),
      MemberModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
      consumer.apply(Authenticate).forRoutes('')
      // exclude() : 제외할 라우트
      // forRoutes : 적용할 라우트
  }
}
