import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class getPriceDto {
  @ApiProperty({
    description: 'Array of slot IDs to pay for',
    example: [2, 3, 5],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  slot_ids: number[];

  @ApiProperty({
    description: 'Number of boards to pay for',
    example: 5,
  })
  @IsNumber()
  @IsPositive()
  quantity: number;
}
