import { IsISO8601, IsNumber } from 'class-validator';

export class createSlotDto {
  @IsISO8601()
  datetime: string;

  @IsNumber()
  available_boards: number;
}
