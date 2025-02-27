import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateSlotDto } from './slots/dtos/update-slot.dto';
import { AuthGuard } from './guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/slots/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateSlotDto) {
    const response = await this.appService.update(Number(id), body);
    return response;
  }
}
