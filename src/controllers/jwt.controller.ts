import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "@jwt/services";
import { RegisterUserDto, LoginDto } from "@jwt/dtos";
import { AuthGuard } from "@nestjs/passport";
import { genSaltSync, hashSync } from "bcryptjs";
import { JwtAuthGuard, LocalGuard } from "@jwt/auth";

@ApiTags("jwt")
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async createUser(@Body() register: RegisterUserDto): Promise<any> {
    const { name, username, password } = register;
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    return await this.authService.createUser(name, username, hashedPassword);
  }

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Body() data: LoginDto): Promise<any> {
    return await this.authService.login(data);
  }

  @ApiBearerAuth()
  @UseGuards(LocalGuard)
  @Get("check-token")
  async updateInfo(): Promise<any> {
    return "Passed access Token !";
  }
}
