import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "@jwt/controllers";
import { AuthService } from "@jwt/services";
import { UserSchema } from "@jwt/models";
import { LocalGuard } from "@jwt/auth";
import { config } from "@jwt/configs";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get("mongo"),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: "USER", schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'EXAMPLE JWT SECRET KEY',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController],
  providers: [AuthService, LocalGuard],
})
export class AppModule {}
