import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { BookingsModule } from 'src/bookings/bookings.module';
import { SlotsModule } from 'src/slots/slots.module';

@Module({
  imports: [BookingsModule, SlotsModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
