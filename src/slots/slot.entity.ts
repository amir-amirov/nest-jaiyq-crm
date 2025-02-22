import { Booking } from 'src/bookings/bookings.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  id: number; // Auto-generated id

  @Column('date')
  datetime: string; // Time for the slot

  @Column()
  available_boards: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date; // Auto-generated creation timestamp

  @UpdateDateColumn()
  updated_at: Date; // Auto-generated update timestamp

  @OneToMany(() => Booking, (booking) => booking.slot, { cascade: true })
  bookings: Booking[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted Slot with id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed Slot with id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated Slot with id', this.id);
  }
}
