import { forwardRef, Module } from '@nestjs/common';
import { SlotsController } from './slots.controller';
import { SlotsService } from './slots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './slot.entity';
import { BookingsModule } from 'src/bookings/bookings.module';
import { RentalsModule } from 'src/rentals/rentals.module';

@Module({
  imports: [TypeOrmModule.forFeature([Slot]), RentalsModule],
  controllers: [SlotsController],
  providers: [SlotsService],
  exports: [SlotsService],
})
export class SlotsModule {}
