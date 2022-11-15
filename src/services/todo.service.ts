import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../entity/todo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entity/users.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todosRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  async create(data: Todo, req: User): Promise<any> {
    const payload = {
      title: data.title,
      desc: data.desc,
      status: data.status,
      createdBy: req.email,
      lastChangedBy: req.email,
    };
    return this.todosRepository.save(payload);
  }

  async updateTodo(id: number, data: Todo, req: User) {
    const payload = {
      title: data.title,
      desc: data.desc,
      status: data.status,
      lastChangedBy: req.email,
    };
    await this.todosRepository.update(id, payload);
    const updatedTodo = await this.todosRepository.findOne({
      where: { id: id.toString() },
    });
    return updatedTodo;
  }

  async deleteTodo(id: number) {
    const deletedTodo = await this.todosRepository.delete(id);
    return deletedTodo;
  }
}
