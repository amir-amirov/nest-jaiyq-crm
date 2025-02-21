import { IsString, IsNumber, IsPhoneNumber, IsIn } from 'class-validator';

export class createBookingDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsIn(['reserved', 'paid', 'cancelled'], {
    message:
      'Status must be one of the following: reserved, paid, or cancelled',
  })
  status: 'reserved' | 'paid' | 'cancelled';

  @IsNumber()
  total_price: number;

  @IsNumber()
  slot_id: number;

  @IsNumber()
  number_of_boards: number;
}
