import {
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class paymentDto {
  @IsString()
  first_name: string;

  @IsPhoneNumber()
  phone: string;

  @IsNumber()
  @IsPositive()
  number_of_boards: number;

  @IsNumber()
  slotId: number;

  @IsNotEmpty()
  @IsString()
  @Length(16, 16)
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 5)
  expiryDate: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  cvv: string;

  @IsString()
  cardHolderName: string;
}
