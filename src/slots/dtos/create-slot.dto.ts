import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber, IsPositive } from 'class-validator';
import { IsAfter } from 'src/decorators/is-after.decorator';

export class createSlotDto {
  @ApiProperty({
    description: 'Date and time of the slot in ISO format',
    example: '2025-03-01T09:00:00.000Z',
  })
  @IsISO8601()
  start_datetime: string;

  @ApiProperty({
    description: 'Date and time of the slot in ISO format',
    example: '2025-03-01T09:30:00.000Z',
  })
  @IsISO8601()
  @IsAfter('start_datetime', {
    message: 'end_datetime must be after start_datetime',
  })
  end_datetime: string;

  @ApiProperty({
    description: 'Number of available boards for the slot',
    example: 25,
  })
  @IsNumber()
  @IsPositive()
  available_quantity: number;

  @ApiProperty({
    description: 'ID of the rental item',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  rental_id: number;
}
