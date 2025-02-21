import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './bookings.entity';
import { Repository } from 'typeorm';
import { createBookingDto } from './dtos/create-booking.dto';
import { Slot } from 'src/slots/slot.entity';
import { SlotsService } from 'src/slots/slots.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private repo: Repository<Booking>,
    private slotsService: SlotsService,
  ) {}

  async create(bookingDto: createBookingDto, slot: Slot) {
    try {
      const booking = this.repo.create(bookingDto);
      booking.slot = slot;
      const savedBooking = await this.repo.save(booking);
      if (savedBooking) {
        await this.slotsService.decreaseAvailableBoard(
          slot.id,
          bookingDto.number_of_boards,
        );
      }
      return savedBooking;
    } catch (error) {
      throw new BadRequestException('Unknown error');
    }
  }
}
