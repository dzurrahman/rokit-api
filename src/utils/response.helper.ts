import { HttpException } from '@nestjs/common';

export class Response<T> {
  message: string;
  data: T | T[];

  constructor(message: string, data: T) {
    this.message = message;
    this.data = data ?? [];
  }
}

export const responseSuccess = <T>(message: string, data?: T) =>
  new Response<T>(message, data);

export const responseError = (message: string, code = 400) => {
  return Promise.reject(new HttpException({ message, code }, code));
};
