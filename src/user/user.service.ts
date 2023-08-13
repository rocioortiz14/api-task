import { HttpException, Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { IUser } from './user.interface';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  user: IUser[] = [];
  create(userDto: UserDTO): IUser {
    const user: IUser = {
      id: uuidv4(),
      ...userDto,
    };
    this.user.push({
      password: bcrypt.hashSync(userDto.password, 10),
      ...user,
    });
    return user;
  }

  findAll(): IUser[] {
    return this.user;
  }

  findOne(id: string): IUser {
    const user = this.user.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  update(id: string, userDto: UserDTO): IUser {
    const user = this.user.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const newUser = {
      id,
      password: bcrypt.hashSync(userDto.password, 10),
      ...userDto,
    };
    this.user = this.user.map((user) => (user.id === id ? newUser : user));
    return newUser;
  }

  delete(id: string): string {
    this.user = this.user.filter((user) => user.id !== id);
    return 'User deleted successfully';
  }
}
