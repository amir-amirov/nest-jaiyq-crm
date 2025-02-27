import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class paymentDto {
  @ApiProperty({
    description: 'First name of the customer',
    example: 'John',
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    description: 'Phone number of the customer',
    example: '+77074304349',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    description: 'Number of boards to pay for',
    example: 5,
  })
  @IsNumber()
  @IsPositive()
  number_of_boards: number;

  @ApiProperty({
    description: 'Slot ID to pay for',
    example: 2,
  })
  @IsNumber()
  slotId: number;

  @ApiProperty({
    description: 'Card number',
    example: '5123456789012345',
  })
  @IsNotEmpty()
  @IsString()
  @Length(16, 16)
  cardNumber: string;

  @ApiProperty({
    description: 'Expiry date of the card in MM-YY format',
    example: '2025-03',
  })
  @IsNotEmpty()
  @IsString()
  @Length(5, 5)
  expiryDate: string;

  @ApiProperty({
    description: 'CVV',
    example: '633',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  cvv: string;

  @ApiProperty({
    description: 'Card holder name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  cardHolderName: string;
}
