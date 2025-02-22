import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { SlotsService } from './slots.service';
import { createSlotDto } from './dtos/create-slot.dto';

@Controller('slots')
export class SlotsController {
  constructor(private slotsService: SlotsService) {}

  @Post()
  createSlot(@Body() body: createSlotDto) {
    return this.slotsService.create(body);
  }

  @Get()
  getSlots(@Query('start_date') start_date: string) {
    if (start_date) {
      return this.slotsService.getByStartDate(start_date);
    } else {
      return this.slotsService.getAll();
    }
  }

  @Delete('/:id')
  deleteSlot(@Param('id') id: string) {
    return this.slotsService.remove(Number(id));
  }

  @Post('/disable-slot/:id')
  disableSlot(@Param('id') id: string) {
    return this.slotsService.disable(Number(id));
  }

  @Post('/enable-slot/:id')
  enableSlot(@Param('id') id: string) {
    return this.slotsService.enable(Number(id));
  }
}
