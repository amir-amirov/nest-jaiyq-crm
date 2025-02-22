import {
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsIn,
  IsNumber,
} from 'class-validator';

export class UpdateBookingDto {
  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @IsIn(['reserved', 'paid', 'cancelled'], {
    message:
      'Status must be one of the following: reserved, paid, or cancelled',
  })
  @IsOptional()
  status: 'reserved' | 'paid' | 'cancelled';

  @IsNumber()
  @IsOptional()
  total_price: number;

  @IsNumber()
  @IsOptional()
  number_of_boards: number;
}
