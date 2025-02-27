import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SlotsService } from './slots.service';
import { createSlotDto } from './dtos/create-slot.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { createSlotsBulkDto } from './dtos/create-slots-bulk.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('slots')
export class SlotsController {
  constructor(private slotsService: SlotsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  createSlot(@Body() body: createSlotDto) {
    return this.slotsService.create(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/bulk')
  async createBulkSlots(@Body() createSlotsBulkDto: createSlotsBulkDto) {
    const { slots } = createSlotsBulkDto;

    const created_slots = await this.slotsService.createMultiple(slots);
    return {
      status: 'success',
      created_slots: slots,
    };
  }

  @Get()
  getSlots(@Query('start_date') start_date: string) {
    if (start_date) {
      return this.slotsService.getByStartDate(start_date);
    } else {
      return this.slotsService.getAll();
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteSlot(@Param('id') id: string) {
    return this.slotsService.remove(Number(id));
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/disable-slot/:id')
  disableSlot(@Param('id') id: string) {
    return this.slotsService.disable(Number(id));
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/enable-slot/:id')
  enableSlot(@Param('id') id: string) {
    return this.slotsService.enable(Number(id));
  }
}
