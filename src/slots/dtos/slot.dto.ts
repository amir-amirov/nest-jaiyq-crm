import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class SlotDto {
  @ApiProperty({
    description: 'Id of the slot',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Date and time in ISO format',
    example: '2025-03-01T09:00:00.000Z',
  })
  @Expose()
  start_datetime: string;

  @ApiProperty({
    description: 'Date and time in ISO format',
    example: '2025-03-01T09:10:00.000Z',
  })
  @Expose()
  end_datetime: string;

  @ApiProperty({
    description: 'Number of boards',
    example: 25,
  })
  @Expose()
  available_quantity: number;

  @ApiProperty({
    description: 'ID of the rental item',
    example: 2,
  })
  @Transform(({ obj }) => obj.rental.id)
  @Expose()
  rental_id: number;

  @ApiProperty({
    description: 'State of the slot: active or not',
    example: true,
  })
  @Expose()
  is_active: string;

  @ApiProperty({
    description: 'Create time',
    example: '2025-02-26T06:38:35.000Z',
  })
  @Expose()
  created_at: string;

  @ApiProperty({
    description: 'Update time',
    example: '2025-02-26T06:38:35.000Z',
  })
  @Expose()
  updated_at: string;
}
