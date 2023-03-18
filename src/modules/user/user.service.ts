import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from "typeorm";
import { UserI } from './interfaces/user.interface';

@Injectable()
export class UserService {
  // Constructor based dependency injection used to inject instances (often service providers) into classes.
  constructor(
    @InjectRepository(Users)
    private userRepoitory: Repository<Users>,
  ) {}
  private logger = new Logger('AuthService');
  
  async signUp(userName: UserI): Promise<void> {
    await this.userRepoitory.save(userName)
    this.logger.log(`User with username: "${userName.name}" is added!`);
  }
  
  async getUsers(): Promise<UserI[]> {
    return this.userRepoitory.find();
  }
}
