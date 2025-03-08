import { Booking } from 'src/bookings/bookings.entity';
import { Rental } from 'src/rentals/rental.entity';
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
  ManyToOne,
} from 'typeorm';

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  id: number; // Auto-generated id

  @Column({ type: 'timestamp' })
  start_datetime: Date; // Time for the slot

  @Column({ type: 'timestamp' })
  end_datetime: Date; // Time for the slot

  @Column()
  available_quantity: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date; // Auto-generated creation timestamp

  @UpdateDateColumn()
  updated_at: Date; // Auto-generated update timestamp

  @OneToMany(() => Booking, (booking) => booking.slot, { cascade: true })
  bookings: Booking[];

  @ManyToOne(() => Rental, (rental) => rental.slots, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  rental: Rental;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Slot with id', this.id);
    console.log('Inserted Slot with START_TIME', this.start_datetime);
    console.log('Inserted Slot with END_TIME', this.end_datetime);
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
