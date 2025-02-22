import { Expose, Transform } from 'class-transformer';
import { Booking } from '../bookings.entity';

export class BookingDto {
  @Expose()
  id: number;
  @Expose()
  first_name: string;
  @Expose()
  last_name: string;
  @Expose()
  phone: string;
  @Expose()
  status: 'reserved' | 'paid' | 'cancelled';
  @Expose()
  total_price: number;
  @Expose()
  number_of_boards: number;
  @Expose()
  created_at: Date;
  @Expose()
  updated_at: Date;
  @Transform(({ obj }) => obj.slot.id)
  @Expose()
  slotId: number;
}
