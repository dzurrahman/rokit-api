import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new BadRequestException('Users credentials not Found');
    }

    if (!(await bcrypt.compare(pass, user.password))) {
      throw new BadRequestException(`Password doesn't match`);
    }

    const { password, ...result } = user;
    return result;
  }
}
