import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { createBookingDto } from './dtos/create-booking.dto';
import { SlotsService } from 'src/slots/slots.service';

@Controller('bookings')
export class BookingsController {
  constructor(
    private bookingsService: BookingsService,
    private slotsService: SlotsService,
  ) {}

  @Post()
  async createBooking(@Body() body: createBookingDto) {
    const slot = await this.slotsService.getSlotById(body.slot_id);

    if (slot.length > 0) {
      return this.bookingsService.create(body, slot[0]);
    } else {
      throw new NotFoundException(`Slot id of ${body.slot_id} does not exist`);
    }
  }
}
