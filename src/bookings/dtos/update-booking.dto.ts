import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsIn,
  IsNumber,
} from 'class-validator';

export class UpdateBookingDto {
  @ApiProperty({
    example: 'John',
  })
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiProperty({
    example: '+77074304349',
  })
  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @ApiProperty({
    example: 'cancelled',
  })
  @IsIn(['reserved', 'paid', 'cancelled'], {
    message:
      'Status must be one of the following: reserved, paid, or cancelled',
  })
  @IsOptional()
  status: 'reserved' | 'paid' | 'cancelled';

  @ApiProperty({
    example: 10000,
  })
  @IsNumber()
  @IsOptional()
  total_price: number;

  @ApiProperty({
    example: 15,
  })
  @IsNumber()
  @IsOptional()
  quantity: number;
}
