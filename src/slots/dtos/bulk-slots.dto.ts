import { Expose, Type } from 'class-transformer';
import { SlotDto } from './slot.dto';

export class BulkSlotsDto {
  @Expose()
  status: string;

  @Expose()
  @Type(() => SlotDto)
  created_slots: SlotDto[];
}
