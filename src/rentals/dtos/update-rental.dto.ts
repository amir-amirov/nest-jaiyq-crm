import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class updateRentalDto {
  @ApiProperty({
    description: 'Title of the rental',
    example: 'subboard',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'Price of the one rental item',
    example: 5000,
  })
  @IsNumber()
  @IsOptional()
  price: number;
}
