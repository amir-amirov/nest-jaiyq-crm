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

@Controller('slots')
export class SlotsController {
  constructor(private slotsService: SlotsService) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteSlot(@Param('id') id: string) {
    return this.slotsService.remove(Number(id));
  }

  @UseGuards(AuthGuard)
  @Post('/disable-slot/:id')
  disableSlot(@Param('id') id: string) {
    return this.slotsService.disable(Number(id));
  }

  @UseGuards(AuthGuard)
  @Post('/enable-slot/:id')
  enableSlot(@Param('id') id: string) {
    return this.slotsService.enable(Number(id));
  }
}
