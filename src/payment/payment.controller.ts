import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { paymentDto } from './dtos/payment.dto';

@Controller()
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get('/get-price')
  getPrice(@Query('number_of_boards') number_of_boards: string) {
    return this.paymentService.calculatePrice(Number(number_of_boards));
  }

  @Post('/payment')
  payment(@Body() body: paymentDto) {
    return this.paymentService.makePayment(body);
  }
}
