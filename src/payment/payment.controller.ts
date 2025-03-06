import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { paymentDto } from './dtos/payment.dto';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { docs } from 'src/docs';
import { getPriceDto } from './dtos/get-price.dto';

@Controller()
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('/get-price')
  @ApiResponse(docs.getPriceResponse)
  getPrice(@Body() body: getPriceDto) {
    return this.paymentService.calculatePrice(body.slot_ids, body.quantity);
  }

  @Post('/payment')
  @ApiCreatedResponse(docs.paymentResponse)
  payment(@Body() body: paymentDto) {
    return this.paymentService.makePayment(body);
  }
}
