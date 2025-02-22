import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { createBookingDto } from './dtos/create-booking.dto';
import { SlotsService } from 'src/slots/slots.service';
import { UpdateBookingDto } from './dtos/update-booking.dto';

@Controller('/bookings')
export class BookingsController {
  constructor(
    private bookingsService: BookingsService,
    private slotsService: SlotsService,
  ) {}

  @Get('/slots/:id')
  async getBookingsBySlotId(@Param('id') id: string) {
    const slots = await this.bookingsService.find(Number(id));
    return slots;
  }

  @Get()
  async getBookings() {
    return await this.bookingsService.findAll();
  }

  @Get('/:id')
  async getBooking(@Param('id') id: string) {
    return await this.bookingsService.findOne(Number(id));
  }

  @Post()
  async createBooking(@Body() body: createBookingDto) {
    const slot = await this.slotsService.getSlotById(body.slot_id);

    if (slot.length > 0) {
      return this.bookingsService.create(body, slot[0]);
    } else {
      throw new NotFoundException(`Slot id of ${body.slot_id} does not exist`);
    }
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateBookingDto) {
    const response = await this.bookingsService.update(Number(id), body);
    return response;
  }
}
