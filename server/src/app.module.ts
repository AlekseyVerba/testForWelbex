import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from "./user/user.module"
import { AuthModule } from "./auth/auth.model"
import { GetUser } from "./middlewares/getUser.middleware"
import { JwtModule } from "./jwt/jwt.module"
import { ormConfiguration } from "./database"
import { EntryModule } from "./entry/entry.module"
import { FileModule } from "./file/file.module"
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from "path"

@Module({
  imports: [
    ormConfiguration,
    UserModule,
    AuthModule,
    JwtModule,
    EntryModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'staticFiles'),
    }),
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetUser).forRoutes("*")
  }
}