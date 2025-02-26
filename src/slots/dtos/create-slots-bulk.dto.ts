import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { createSlotDto } from './create-slot.dto';

export class createSlotsBulkDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => createSlotDto)
  slots: createSlotDto[];
}
