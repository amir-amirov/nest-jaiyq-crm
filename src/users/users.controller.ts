import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { loginUserDto } from './dtos/login-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('/auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  //   @UseGuards(AuthGuard)
  @Post('/signup')
  async createUser(@Body() body: createUserDto) {
    const result = await this.authService.signup(body);
    return result;
  }

  @Post('/signin')
  async signInUser(@Body() body: loginUserDto) {
    const result = await this.authService.signin(body);
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('users/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(Number(id));
    if (!user) {
      throw new NotFoundException(`User with id ${id} is not found.`);
    } else {
      return user;
    }
  }

  @UseGuards(AuthGuard)
  @Get('users/')
  findAllUsers(@Query('username') username: string) {
    return this.usersService.find(username);
  }

  @UseGuards(AuthGuard)
  @Patch('users/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const response = await this.usersService.update(Number(id), body);
    return response;
  }

  @UseGuards(AuthGuard)
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    const response = await this.usersService.remove(Number(id));
    return response;
  }
}
