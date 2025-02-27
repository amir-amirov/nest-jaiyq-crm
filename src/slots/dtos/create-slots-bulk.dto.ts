import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { createSlotDto } from './create-slot.dto';
import { ApiProperty } from '@nestjs/swagger';

export class createSlotsBulkDto {
  @ApiProperty({
    description: 'Array of slots to create',
    example: [
      { datetime: '2025-03-01T09:00:00.000Z', available_boards: 25 },
      { datetime: '2025-03-01T10:00:00.000Z', available_boards: 25 },
      { datetime: '2025-03-01T11:00:00.000Z', available_boards: 25 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => createSlotDto)
  slots: createSlotDto[];
}
