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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { docs } from 'src/docs';

@Controller('/auth')
@Serialize(UserDto)
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  @Post('/signup')
  @ApiCreatedResponse(docs.createUserResponse)
  async createUser(@Body() body: createUserDto) {
    const result = await this.authService.signup(body);
    return result;
  }

  @Post('/signin')
  @ApiCreatedResponse(docs.loginUserResponse)
  async signInUser(@Body() body: loginUserDto) {
    const result = await this.authService.signin(body);
    return result;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('users/:id')
  @ApiResponse(docs.userByIdResponse)
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(Number(id));
    if (!user) {
      throw new NotFoundException(`User with id ${id} is not found.`);
    } else {
      return user;
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('users/')
  @ApiQuery(docs.getUserByUsernameRequest)
  @ApiResponse(docs.userByIdResponse)
  findAllUsers(@Query('username') username: string) {
    return this.usersService.find(username);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('users/:id')
  @ApiResponse(docs.userByIdResponse)
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const response = await this.usersService.update(Number(id), body);
    return response;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete('users/:id')
  @ApiResponse(docs.userByIdResponse)
  async deleteUser(@Param('id') id: string) {
    const response = await this.usersService.remove(Number(id));
    return response;
  }
}
