import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { createSlotDto } from './dtos/create-slot.dto';
import { getSlotsDto } from './dtos/get-slots.dto';

@Controller('slots')
export class SlotsController {
  constructor(private slotsService: SlotsService) {}

  @Post()
  createSlot(@Body() body: createSlotDto) {
    return this.slotsService.create(body);
  }

  @Get()
  getSlots(@Query('start_date') start_date: string) {
    // const { start_date } = query;
    if (start_date) {
      return this.slotsService.getByStartDate(start_date);
    }
  }
}
