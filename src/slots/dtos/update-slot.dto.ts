import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsISO8601, IsOptional, IsBoolean } from 'class-validator';

export class UpdateSlotDto {
  @ApiProperty({
    description: 'Date and time of the slot in ISO format',
    example: '2025-03-01T09:00:00.000Z',
  })
  @IsISO8601()
  @IsOptional()
  datetime: string;

  @ApiProperty({
    description: 'Number of available boards for the slot',
    example: 25,
  })
  @IsNumber()
  @IsOptional()
  available_boards: number;

  @ApiProperty({
    description: 'Boolean to indicate if the slot is active',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}
