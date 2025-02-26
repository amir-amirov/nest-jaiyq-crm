import { Injectable } from '@nestjs/common';
import { paymentDto } from './dtos/payment.dto';
import { BookingsService } from 'src/bookings/bookings.service';

@Injectable()
export class PaymentService {
  constructor(private bookingsService: BookingsService) {}
  calculatePrice(number_of_boards: number) {
    return number_of_boards * 5000;
  }

  async makePayment(body: paymentDto) {
    const total_price = this.calculatePrice(body.number_of_boards);
    const booking = await this.bookingsService.create({
      first_name: body.first_name,
      phone: body.phone,
      number_of_boards: body.number_of_boards,
      slotId: body.slotId,
      total_price,
      status: 'reserved',
    });

    // try to make payment here
    const paymentStatus = this.processPayment({
      cardNumber: body.cardNumber,
      cvv: body.cvv,
      expiryDate: body.expiryDate,
      total_price,
    });

    if (paymentStatus == 'Success') {
      booking.status = 'paid';
      await this.bookingsService.update(booking.id, booking);
      return 'Payment successful';
    } else {
      booking.status = 'cancelled';
      await this.bookingsService.update(booking.id, booking);
      return 'Payment failed';
    }
  }

  processPayment(cardDetails: any) {
    const success = true;

    if (success) {
      return 'Success';
    } else {
      return 'Failed';
    }
  }
}
