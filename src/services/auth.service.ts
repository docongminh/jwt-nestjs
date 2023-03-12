import { Injectable, NotAcceptableException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "@jwt/models";
import { Model } from "mongoose";
import { compareSync } from "bcryptjs";


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  @InjectModel("USER")
  private readonly userModel: Model<UserDocument>;

  async createUser(
    name: string,
    username: string,
    password: string
  ): Promise<User> {
    return this.userModel.create({
      name,
      username,
      password,
    });
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.getUser({ username });
    if (!user) return null;
    const passwordValid = compareSync(password, user.password);
    if (!user) {
      throw new NotAcceptableException("could not find the user");
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
