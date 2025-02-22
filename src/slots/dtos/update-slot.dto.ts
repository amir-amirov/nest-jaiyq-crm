import { IsNumber, IsISO8601, IsOptional, IsBoolean } from 'class-validator';

export class UpdateSlotDto {
  @IsISO8601()
  @IsOptional()
  datetime: string;

  @IsNumber()
  @IsOptional()
  available_boards: number;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}
