import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'john_doe',
  })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({
    description: 'Password of the user',
    example: '123456',
  })
  @IsString()
  @IsOptional()
  password: string;
}
