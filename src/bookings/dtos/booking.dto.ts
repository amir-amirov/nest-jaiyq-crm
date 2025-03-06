import { Expose, Transform } from 'class-transformer';

export class BookingDto {
  @Expose()
  id: number;

  @Expose()
  first_name: string;

  @Expose()
  phone: string;

  @Expose()
  status: 'reserved' | 'paid' | 'cancelled';
  @Expose()
  total_price: number;
  @Expose()
  quantity: number;
  @Expose()
  created_at: Date;
  @Expose()
  updated_at: Date;
  @Transform(({ obj }) => obj.slot.id)
  @Expose()
  slot_id: number;
}
