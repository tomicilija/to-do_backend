import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { UserI } from './interfaces/user.interface';

@Injectable()
export class UserService {
  // Constructor based dependency injection used to inject instances (often service providers) into classes.
  constructor(
    @InjectRepository(Users)
    private userRepoitory: Repository<Users>,
  ) {}
  private logger = new Logger('UserService');

  async signUp(userName: UserI): Promise<void> {
    await this.userRepoitory.save(userName);
    this.logger.log(`User with username: "${userName.name}" is added!`);
  }

  async getUsers(): Promise<UserI[]> {
    return this.userRepoitory.find();
  }

  async getUserById(userId: string): Promise<UserI> {
    if (userId) {
      const found = await this.userRepoitory.findOne({
        where: {
          id: userId,
        },
      });
      if (!found) {
        this.logger.error(`User wth ID: "${userId}"" not found!`);
        throw new NotFoundException(`User wth ID: "${userId}" not found`);
      }
      return found;
    }
  }

  async deleteUser(id: string): Promise<UserI> {
    const user = await this.userRepoitory.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      this.logger.error(`User with ID: "${id}" not found!`);
      throw new NotFoundException(`User with ID: "${id}" not found!`);
    }
    await this.userRepoitory.remove(user);
    this.logger.warn(
      `User with id: "${user.id}" has bee successfully deleted!`,
    );
    return user;
  }
}
