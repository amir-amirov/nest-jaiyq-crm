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
import { UpdateBookingDto } from './dtos/update-booking.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { BookingDto } from './dtos/booking.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { docs } from 'src/docs';

@Controller('/bookings')
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Serialize(BookingDto)
  @Get('/slots/:id')
  @ApiResponse(docs.getBookingsBySlotID)
  async getBookingsBySlotId(@Param('id') id: string) {
    const slots = await this.bookingsService.find(Number(id));
    return slots;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  @Serialize(BookingDto)
  @ApiResponse(docs.getBookingsResponse)
  getBookings() {
    return this.bookingsService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @Serialize(BookingDto)
  @ApiResponse(docs.getBookingsByID)
  async getBooking(@Param('id') id: string) {
    return await this.bookingsService.findOne(Number(id));
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @Serialize(BookingDto)
  @ApiResponse(docs.createBookingResponse)
  async createBooking(@Body() body: createBookingDto) {
    return this.bookingsService.create(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/:id')
  @Serialize(BookingDto)
  @ApiResponse(docs.getBookingsByID)
  async updateUser(@Param('id') id: string, @Body() body: UpdateBookingDto) {
    const response = await this.bookingsService.update(Number(id), body);
    return response;
  }
}
