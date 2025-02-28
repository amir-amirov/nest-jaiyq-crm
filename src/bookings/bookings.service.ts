import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './bookings.entity';
import { Repository } from 'typeorm';
import { createBookingDto } from './dtos/create-booking.dto';
import { SlotsService } from 'src/slots/slots.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private repo: Repository<Booking>,
    private slotsService: SlotsService,
  ) {}

  async create(bookingDto: createBookingDto) {
    const [slot] = await this.slotsService.getSlotById(bookingDto.slotId);

    if (!slot) {
      throw new NotFoundException(
        `Slot id of ${bookingDto.slotId} does not exist`,
      );
    }

    await this.slotsService.decreaseAvailableBoard(
      slot.id,
      bookingDto.number_of_boards,
    );
    const booking = this.repo.create(bookingDto);
    booking.slot = slot;
    return this.repo.save(booking);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id, slot: { is_active: true } });
  }

  find(id: number) {
    // const slot = await this.slotsService.findOne(id);

    return this.repo.find({ where: { slot: { id, is_active: true } } });
  }

  findAll() {
    return this.repo.find({ where: { slot: { is_active: true } } });
  }

  async update(id: number, attrs: Partial<Booking>) {
    const booking = await this.findOne(id);

    if (!booking) {
      throw new NotFoundException('booking not found');
    } else {
      const newBooking = this.repo.create({ ...booking, ...attrs });
      return this.repo.save(newBooking);
    }
  }

  async cancelBooking(id: number) {
    const booking = await this.findOne(id);

    if (!booking) {
      throw new NotFoundException('booking not found');
    } else {
      const slot = await this.slotsService.findOne(booking.slot.id);
      await this.slotsService.increaseAvailableBoard(
        slot.id,
        booking.number_of_boards,
      );

      booking.status = 'cancelled';
      return this.repo.save(booking);
    }
  }
}
