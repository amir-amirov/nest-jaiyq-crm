import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { createRentalDto } from './dtos/create-rental.dto';
import { updateRentalDto } from './dtos/update-rental.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { docs } from 'src/docs';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('rentals')
export class RentalsController {
  constructor(private rentalsService: RentalsService) {}

  @ApiBearerAuth()
  @ApiResponse(docs.rentalAll)
  @Get()
  getRentals() {
    return this.rentalsService.getAll();
  }

  @ApiBearerAuth()
  @ApiResponse(docs.rental)
  @Get('/:id')
  getRental(@Param('id') id: string) {
    return this.rentalsService.getOne(Number(id));
  }

  @ApiBearerAuth()
  @ApiCreatedResponse(docs.rental)
  @UseGuards(AuthGuard)
  @Post()
  createRental(@Body() body: createRentalDto) {
    return this.rentalsService.create(body);
  }

  @ApiBearerAuth()
  @ApiResponse(docs.rental)
  @UseGuards(AuthGuard)
  @Patch('/:id')
  updateRental(@Param('id') id: string, @Body() body: updateRentalDto) {
    return this.rentalsService.updateRental(Number(id), body);
  }

  @ApiBearerAuth()
  @ApiResponse(docs.rental)
  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteRental(@Param('id') id: string) {
    return this.rentalsService.remove(Number(id));
  }
}
