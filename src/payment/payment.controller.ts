import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { paymentDto } from './dtos/payment.dto';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { docs } from 'src/docs';

@Controller()
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get('/get-price')
  @ApiResponse(docs.getPriceResponse)
  getPrice(@Query('number_of_boards') number_of_boards: string) {
    return this.paymentService.calculatePrice(Number(number_of_boards));
  }

  @Post('/payment')
  @ApiCreatedResponse(docs.paymentResponse)
  payment(@Body() body: paymentDto) {
    return this.paymentService.makePayment(body);
  }
}
