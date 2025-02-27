import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class loginUserDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'john_doe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Username of the user',
    example: '123456',
  })
  @IsString()
  password: string;
}
