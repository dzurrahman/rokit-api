import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { User } from '../entity/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(condition: any): Promise<any> {
    const result = await getConnection()
      .createQueryBuilder(User, 'user')
      .where('user.email = :email', { email: condition })
      .getOne();
    return result;
  }

  async findEmail(email: any): Promise<any> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(data: any): Promise<any> {
    return this.usersRepository.save(data);
  }
  async login(data: any): Promise<any> {
    const user = await this.findEmail(data.email);
    if (!user) {
      throw new BadRequestException('Users credentials not Found');
    }
    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new BadRequestException(`Password doesn't match `);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return {
      token: this.jwtService.sign(result),
      ...result,
    };
  }
}
