import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateSlotDto } from './slots/dtos/update-slot.dto';
import { AuthGuard } from './guards/auth.guard';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiResponse,
} from '@nestjs/swagger';
import { docs } from './docs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiExcludeEndpoint()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/slots/:id')
  @ApiResponse(docs.patchSlotResponse)
  async updateUser(@Param('id') id: string, @Body() body: UpdateSlotDto) {
    const response = await this.appService.update(Number(id), body);
    return response;
  }
}
