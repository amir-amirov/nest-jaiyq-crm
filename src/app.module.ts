import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlotsModule } from './slots/slots.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './slots/slot.entity';
import { BookingsModule } from './bookings/bookings.module';
import { Booking } from './bookings/bookings.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Slot, Booking],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Slot, Booking]), // to be able to use Slot and Bookings repos in app
    SlotsModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
