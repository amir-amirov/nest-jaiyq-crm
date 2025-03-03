import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { createSlotDto } from './create-slot.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UniqueSlots } from 'src/decorators/unique-slots.dto';

export class createSlotsBulkDto {
  @ApiProperty({
    description: 'Array of slots to create',
    example: [
      {
        start_datetime: '2025-03-01T09:00:00.000Z',
        end_datetime: '2025-03-01T09:30:00.000Z',
        available_quantity: 25,
        rental_id: 1,
      },
      {
        start_datetime: '2025-03-01T09:00:00.000Z',
        end_datetime: '2025-03-01T09:30:00.000Z',
        available_quantity: 25,
        rental_id: 2,
      },
      {
        start_datetime: '2025-03-01T10:00:00.000Z',
        end_datetime: '2025-03-01T11:00:00.000Z',
        available_quantity: 25,
        rental_id: 3,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => createSlotDto)
  @UniqueSlots({ message: 'Duplicate slots detected in the request.' })
  slots: createSlotDto[];
}
