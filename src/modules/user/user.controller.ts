import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserI } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller()
export class UserController {
  // Controller declares a dependency on the UserService token with constructor
  constructor(private userService: UserService) {}

  // Creates user
  @Post('/signup')
  signUp(@Body() userName: UserI): Promise<void> {
    return this.userService.signUp(userName);
  }
  
  // Gets all users
  @Get('/users')
  getUsers(): Promise<UserI[]> {
    return this.userService.getUsers();
  }
  
  // Gets user with id
  @Get('/user/:id')
  getUserWithId(@Param('id') userId: string): Promise<UserI> {
    return this.userService.getUserWithId(userId);
  }
}
