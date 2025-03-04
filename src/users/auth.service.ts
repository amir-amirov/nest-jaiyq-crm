import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  randomBytes, // For salt
  scrypt as _scrypt, // For hashing function, scrypt is async but instead of promise gives back a callback
} from 'crypto';
import { promisify } from 'util'; // To wrap "scrypt" up so that it gives promise and not a callback
//   import { SignInForm, SignUpForm } from './types';
import { createUserDto } from './dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { loginUserDto } from './dtos/login-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: createUserDto) {
    // 1. See if email is in use:
    const users = await this.usersService.find(createUserDto.username);
    if (users.length > 0) {
      throw new BadRequestException('username in use');
    }

    // 2. Hash the user's password:
    // 2.1 Generate a salt
    const salt = randomBytes(8).toString('hex');

    // 2.2 Hash the salt and the password together
    const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer;

    // 2.3 Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // 3. Create a new user and save it
    const newUser = this.usersService.create({
      ...createUserDto,
      password: result,
    });

    // 4. Return the user
    return newUser;
  }
  async signin(loginUserDto: loginUserDto) {
    const [user] = await this.usersService.find(loginUserDto.username);
    if (!user) {
      throw new NotFoundException('no user with such an username');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(loginUserDto.password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: 't8V3$kL9!pQ2@zR5#mX7&wY4^bN6*vA1',
      expiresIn: '1d',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: 't8V3$kL9!pQ2@zR5#mX7&wY4^bN6*vA1',
      expiresIn: '7d',
    });

    const userWithToken = {
      ...user,
      accessToken: token,
      refreshToken,
    };

    return userWithToken;
  }
}
