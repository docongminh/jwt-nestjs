import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from '../services/app.service';
import { RegisterUserDto, LoginDto } from 'src/dtos';

@ApiTags('jwt')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  async createUser(@Body() register: RegisterUserDto): Promise<any> {
    return "create user with user password"
  }

  @Post('login')
  async login(@Body() login: LoginDto): Promise<any> {
    return "log in to get access token"
  }

  @Put('update')
  async updateInfo(): Promise<any> {
    return "example use access token to update profile"
  }
}
