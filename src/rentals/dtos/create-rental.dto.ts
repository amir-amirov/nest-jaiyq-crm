import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class createRentalDto {
  @ApiProperty({
    description: 'Title of the rental',
    example: 'subboard',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Price of the one rental item',
    example: 5000,
  })
  @IsNumber()
  price: number;
}
