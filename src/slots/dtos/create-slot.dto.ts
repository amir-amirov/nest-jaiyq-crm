import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber, IsPositive } from 'class-validator';

export class createSlotDto {
  @ApiProperty({
    description: 'Date and time of the slot in ISO format',
    example: '2025-03-01T09:00:00.000Z',
  })
  @IsISO8601()
  datetime: string;

  @ApiProperty({
    description: 'Number of available boards for the slot',
    example: 25,
  })
  @IsNumber()
  @IsPositive()
  available_boards: number;
}
