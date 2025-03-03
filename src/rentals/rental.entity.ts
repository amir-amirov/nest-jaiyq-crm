import { Booking } from 'src/bookings/bookings.entity';
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
  OneToMany,
} from 'typeorm';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number; // Auto-generated id

  @Column()
  title: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date; // Auto-generated creation timestamp

  @UpdateDateColumn()
  updated_at: Date; // Auto-generated update timestamp

  @OneToMany(() => Slot, (slot) => slot.rental, { cascade: true })
  slots: Slot[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted Rental with id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed Rental with id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated Rental with id', this.id);
  }
}
