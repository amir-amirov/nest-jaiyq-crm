import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slot } from './slots/slot.entity';
import { Repository } from 'typeorm';
import { BookingsService } from './bookings/bookings.service';
import { SlotsService } from './slots/slots.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Slot) private repo: Repository<Slot>,
    private bookingsService: BookingsService,
    private slotsService: SlotsService,
  ) {}
  getHello(): string {
    return 'Hello World!!';
  }

  // I couldn't place this function in SlotService because of circular dependency issue.
  async update(id: number, attrs: Partial<Slot>) {
    const slot = await this.slotsService.findOne(id);
    if (!slot) {
      throw new NotFoundException('slot not found');
    }
    const bookedUsers = await this.bookingsService.find(id);

    console.log('Booked users: ', bookedUsers);

    // IMPORTANT RECHECK THIS!
    if (bookedUsers.length > 0 && attrs.start_datetime) {
      throw new ForbiddenException(
        "There are users who already booked the slot. Can not update datetime, use '/slots/disable-slot/:id' instead...",
      );
    } else {
      const newSlot = this.repo.create({ ...slot, ...attrs });
      return this.repo.save(newSlot);
    }
  }
}
