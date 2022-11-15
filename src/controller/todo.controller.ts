import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Todo } from '../entity/todo.entity';
import { TodoService } from '../services/todo.service';
import { responseError, responseSuccess } from '../utils/response.helper';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get('getAll')
  async getAll() {
    try {
      const result = await this.todoService.findAll();
      return responseSuccess('Get Todo', result);
    } catch (e) {
      return responseError(e.message, 400);
    }
  }

  @Post('addTodo')
  async register(@Body() body: Todo, @Request() req: any): Promise<any> {
    try {
      const result = await this.todoService.create(body, req.user);
      return responseSuccess('Add Todo', result);
    } catch (error) {
      return responseError(error.message);
    }
  }

  @Put('updateTodo')
  async updatePost(
    @Query('id') id: number,
    @Body() todo: Todo,
    @Request() req: any,
  ) {
    try {
      const result = await this.todoService.updateTodo(id, todo, req.user);
      return responseSuccess('Update Todo', result);
    } catch (error) {
      return responseError(error.message);
    }
  }

  @Delete('deleteTodo')
  async deleteTodo(@Query('id') id: number) {
    try {
      console.log(id);
      const result = await this.todoService.deleteTodo(id);
      return responseSuccess('Delete Todo', result);
    } catch (error) {
      return responseError(error.message);
    }
  }
}
