import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPhoneNumber, IsIn } from 'class-validator';

export class createBookingDto {
  @ApiProperty({
    example: 'John',
  })
  @IsString()
  first_name: string;

  // @IsString()
  // last_name: string;

  @ApiProperty({
    example: '+77074304349',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'paid',
  })
  @IsString()
  @IsIn(['reserved', 'paid', 'cancelled'], {
    message:
      'Status must be one of the following: reserved, paid, or cancelled',
  })
  status: 'reserved' | 'paid' | 'cancelled';

  @ApiProperty({
    example: 15000,
  })
  @IsNumber()
  total_price: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  slot_id: number;

  @ApiProperty({
    example: 3,
  })
  @IsNumber()
  quantity: number;
}
