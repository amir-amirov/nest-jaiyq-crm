import { IsISO8601, IsOptional } from 'class-validator';

export class getSlotsDto {
  @IsISO8601()
  @IsOptional()
  start_date?: string;
}
