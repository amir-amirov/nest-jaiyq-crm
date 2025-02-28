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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { getSlotsDto } from './dtos/get-slots.dto';
import { SlotDto } from './dtos/slot.dto';
import { docs } from 'src/docs';

@Controller('slots')
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class SlotsController {
  constructor(private slotsService: SlotsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse(docs.createSlotResponse)
  createSlot(@Body() body: createSlotDto) {
    return this.slotsService.create(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/bulk')
  @ApiCreatedResponse(docs.createSlotsBulkResponse)
  async createBulkSlots(@Body() createSlotsBulkDto: createSlotsBulkDto) {
    const { slots } = createSlotsBulkDto;

    const created_slots = await this.slotsService.createMultiple(slots);
    return {
      status: 'success',
      created_slots: slots,
    };
  }

  @Get()
  @ApiQuery(docs.getSlotsRequest)
  @ApiResponse(docs.getSlotsResponse)
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
  @ApiResponse(docs.deleteSlotResponse)
  deleteSlot(@Param('id') id: string) {
    return this.slotsService.remove(Number(id));
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/disable-slot/:id')
  @ApiCreatedResponse(docs.disableSlotResponse)
  disableSlot(@Param('id') id: string) {
    return this.slotsService.disable(Number(id));
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/enable-slot/:id')
  @ApiCreatedResponse(docs.enableSlotResponse)
  enableSlot(@Param('id') id: string) {
    return this.slotsService.enable(Number(id));
  }
}
