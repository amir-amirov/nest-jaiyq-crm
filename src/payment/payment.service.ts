import { Injectable } from '@nestjs/common';
import { paymentDto } from './dtos/payment.dto';
import { BookingsService } from 'src/bookings/bookings.service';
import { SlotsService } from 'src/slots/slots.service';

@Injectable()
export class PaymentService {
  constructor(
    private bookingsService: BookingsService,
    private slotsService: SlotsService,
  ) {}
  async calculatePrice(slot_id: number, quantity: number) {
    const slot = await this.slotsService.findOne(slot_id);
    const pricePerHour = await this.slotsService.getPriceOfRental(slot_id);

    const startDate = new Date(slot.start_datetime);
    const endDate = new Date(slot.end_datetime);
    const timeDifferenceMs = endDate.getTime() - startDate.getTime();
    const timeDifferenceHours = timeDifferenceMs / (1000 * 60 * 60);
    const totalPrice = timeDifferenceHours * pricePerHour * quantity;

    return Math.floor(totalPrice);
  }

  async makePayment(body: paymentDto) {
    const total_price = await this.calculatePrice(body.slot_id, body.quantity);
    const booking = await this.bookingsService.create({
      first_name: body.first_name,
      phone: body.phone,
      quantity: body.quantity,
      slot_id: body.slot_id,
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
