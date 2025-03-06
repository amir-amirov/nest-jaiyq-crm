import { BadRequestException, Injectable } from '@nestjs/common';
import { paymentDto } from './dtos/payment.dto';
import { BookingsService } from 'src/bookings/bookings.service';
import { SlotsService } from 'src/slots/slots.service';
import { Booking } from 'src/bookings/bookings.entity';

@Injectable()
export class PaymentService {
  constructor(
    private bookingsService: BookingsService,
    private slotsService: SlotsService,
  ) {}

  async calculatePrice(slot_ids: number[], quantity: number) {
    let totalPrice = 0;

    for (const slot_id of slot_ids) {
      const slot = await this.slotsService.findOne(slot_id);
      const pricePerHour = await this.slotsService.getPriceOfRental(slot_id);

      const startDate = new Date(slot.start_datetime);
      const endDate = new Date(slot.end_datetime);
      const timeDifferenceMs = endDate.getTime() - startDate.getTime();
      const timeDifferenceHours = timeDifferenceMs / (1000 * 60 * 60);

      totalPrice += timeDifferenceHours * pricePerHour * quantity;
    }

    return Math.floor(totalPrice);
  }

  async makePayment(body: paymentDto) {
    const total_price = await this.calculatePrice(body.slot_ids, body.quantity);
    const bookings: Booking[] = [];

    try {
      // Attempt to create bookings
      for (const slot_id of body.slot_ids) {
        const booking = await this.bookingsService.create({
          first_name: body.first_name,
          phone: body.phone,
          quantity: body.quantity,
          slot_id,
          total_price,
          status: 'reserved',
        });

        bookings.push(booking);
      }

      // Try to make payment
      const paymentStatus = this.processPayment({
        cardNumber: body.cardNumber,
        cvv: body.cvv,
        expiryDate: body.expiryDate,
        total_price,
      });

      if (paymentStatus === 'Success') {
        for (const booking of bookings) {
          booking.status = 'paid';
          await this.bookingsService.update(booking.id, booking);
        }
        return 'Payment successful';
      } else {
        throw new BadRequestException('Payment failed');
      }
    } catch (error) {
      // Rollback: Delete previously created bookings
      for (const booking of bookings) {
        await this.bookingsService.deleteBooking(booking.id);
      }
      throw error; // Rethrow the original error
    }
  }

  processPayment(cardDetails: any) {
    const success = true;
    return success ? 'Success' : 'Failed';
  }
}
