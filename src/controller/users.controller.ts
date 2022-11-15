import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
} from '@nestjs/common';
import { responseError, responseSuccess } from '../utils/response.helper';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  @HttpCode(200)
  async login(@Body() req: { email: string; password: string }) {
    try {
      const result = await this.usersService.login(req);
      return responseSuccess('You are successfully logged in', result);
    } catch (error) {
      return responseError(error.message);
    }
  }

  @Post('register')
  async register(@Body() req: any): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(req.password, 12);
      const user = await this.usersService.findEmail(req.email);
      if (user) {
        throw new BadRequestException('Credentials Exist');
      }
      const result = await this.usersService.create({
        username: req.username,
        password: hashedPassword,
        email: req.email,
        noHp: req.noHp,
        role: req.role,
        status: req.status,
      });
      return responseSuccess('Create Account Success', result);
    } catch (error) {
      Logger.error(error);
      return responseError(error.message);
    }
  }
}
