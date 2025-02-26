import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { createBookingDto } from './dtos/create-booking.dto';
import { SlotsService } from 'src/slots/slots.service';
import { UpdateBookingDto } from './dtos/update-booking.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { BookingDto } from './dtos/booking.dto';
import { AuthGuard } from 'src/guards/auth.guard';

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
  @Serialize(BookingDto)
  getBookings() {
    return this.bookingsService.findAll();
  }

  @Get('/:id')
  @Serialize(BookingDto)
  async getBooking(@Param('id') id: string) {
    return await this.bookingsService.findOne(Number(id));
  }

  @Post()
  @Serialize(BookingDto)
  async createBooking(@Body() body: createBookingDto) {
    return this.bookingsService.create(body);
  }

  @Patch('/:id')
  @Serialize(BookingDto)
  async updateUser(@Param('id') id: string, @Body() body: UpdateBookingDto) {
    const response = await this.bookingsService.update(Number(id), body);
    return response;
  }
}
