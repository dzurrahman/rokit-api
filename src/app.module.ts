import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.services';
import { UsersController } from './controller/users.controller';
import { TodoController } from './controller/todo.controller';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { UsersService } from './services/users.service';
import { TodoService } from './services/todo.service';
import { User } from './entity/users.entity';
import { Todo } from './entity/todo.entity';
import { jwtConstants } from './config/jwt.providers';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Todo]),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AppController, UsersController, TodoController],
  providers: [
    AppService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UsersService,
    TodoService,
  ],
})
export class AppModule {}
