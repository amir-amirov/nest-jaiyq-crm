import { IsISO8601, IsNumber, IsPositive } from 'class-validator';

export class createSlotDto {
  @IsISO8601()
  datetime: string;

  @IsNumber()
  @IsPositive()
  available_boards: number;
}
