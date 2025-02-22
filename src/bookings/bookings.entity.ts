import { Slot } from 'src/slots/slot.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number; // Auto-generated id

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @Column()
  status: 'reserved' | 'paid' | 'cancelled';

  @Column()
  total_price: number;

  @Column()
  number_of_boards: number;

  @CreateDateColumn()
  created_at: Date; // Auto-generated creation timestamp

  @UpdateDateColumn()
  updated_at: Date; // Auto-generated update timestamp

  @ManyToOne(() => Slot, (slot) => slot.bookings, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  slot: Slot;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Booking with id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed Booking with id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated Booking with id', this.id);
  }
}
