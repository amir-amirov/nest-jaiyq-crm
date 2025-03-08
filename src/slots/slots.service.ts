import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slot } from './slot.entity';
import { LessThan, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { createSlotDto } from './dtos/create-slot.dto';
import { RentalsService } from 'src/rentals/rentals.service';

@Injectable()
export class SlotsService {
  constructor(
    @InjectRepository(Slot) private repo: Repository<Slot>,
    private rentalsService: RentalsService,
  ) {}

  async create(slotDto: createSlotDto) {
    await this.isSlotValid(
      new Date(slotDto.start_datetime),
      new Date(slotDto.end_datetime),
      slotDto.rental_id,
    );
    await this.DoesSlotExist(
      new Date(slotDto.start_datetime),
      slotDto.rental_id,
    );
    const rental = await this.rentalsService.findOneRental(slotDto.rental_id);
    const newSlot = this.repo.create(slotDto);
    newSlot.rental = rental;
    return this.repo.save(newSlot);
  }

  // Helper function
  async findOneSlot(start_datetime: string, rental_id: number) {
    const slot = await this.repo.findOne({
      where: {
        start_datetime: new Date(start_datetime),
        rental: { id: rental_id },
      },
    });

    if (!slot) {
      throw new BadRequestException(
        `Slot for ${start_datetime} and ${rental_id} is not found`,
      );
    }
  }

  async DoesSlotExist(start_datetime: Date, rental_id: number) {
    const slot = await this.repo.findOne({
      where: {
        start_datetime: new Date(start_datetime),
        rental: { id: rental_id },
      },
    });

    if (slot) {
      throw new BadRequestException(
        `Slot for ${start_datetime} and ${rental_id} is already exist`,
      );
    }
  }

  // async create(bookingDto: createBookingDto) {
  //   const [slot] = await this.slotsService.getSlotById(bookingDto.slotId);

  //   if (!slot) {
  //     throw new NotFoundException(
  //       `Slot id of ${bookingDto.slotId} does not exist`,
  //     );
  //   }

  //   await this.slotsService.decreaseAvailableBoard(
  //     slot.id,
  //     bookingDto.number_of_boards,
  //   );
  //   const booking = this.repo.create(bookingDto);
  //   booking.slot = slot;
  //   return this.repo.save(booking);
  // }

  async findOne(id: number) {
    const slot = await this.repo.findOneBy({ id, is_active: true });
    if (!slot) {
      throw new NotFoundException(`slot with id ${id} not found`);
    }
    return slot;
  }

  async remove(id: number) {
    const slot = await this.findOne(id);

    return this.repo.remove(slot);
  }

  async decreaseAvailableQuantity(slotId: number, quantity: number) {
    const slot = await this.repo.findOne({ where: { id: slotId } });
    if (!slot) {
      throw new NotFoundException(`Slot with id of ${slotId} does not exist`);
    }
    if (slot.is_active == false) {
      throw new ForbiddenException('This slot is not active');
    }
    if (slot.available_quantity < quantity) {
      throw new ForbiddenException('Not enough boards available');
    }

    slot.available_quantity -= quantity;
    return this.repo.save(slot);
  }

  async increaseAvailableBoard(slotId: number, quantity: number) {
    const slot = await this.repo.findOne({ where: { id: slotId } });
    if (!slot) {
      throw new NotFoundException(`Slot with id of ${slotId} does not exist`);
    }
    if (slot.is_active == false) {
      throw new ForbiddenException('This slot is not active');
    }

    slot.available_quantity += quantity;
    return this.repo.save(slot);
  }

  async getAll() {
    return this.repo.find({
      where: {
        is_active: true,
      },
    });
  }

  async getByStartDate(date: string) {
    return this.repo.find({
      where: {
        start_datetime: MoreThanOrEqual(new Date(date)),
        is_active: true,
      },
    });
  }

  async getSlotById(slot_id: number) {
    return this.repo.find({
      where: {
        id: slot_id,
        is_active: true,
      },
    });
  }

  async disable(slot_id: number) {
    const slot = await this.getSlotById(slot_id);
    if (!slot[0]) {
      throw new NotFoundException(`No slot with id ${slot_id} found`);
    }
    const newSlot = this.repo.create({ ...slot[0], is_active: false });
    return this.repo.save(newSlot);
  }

  async enable(slot_id: number) {
    const slot = await this.repo.find({
      where: {
        id: slot_id,
      },
    });

    if (!slot[0]) {
      throw new NotFoundException(`No slot with id ${slot_id} found`);
    }
    const newSlot = this.repo.create({ ...slot[0], is_active: true });
    return this.repo.save(newSlot);
  }

  //TODO: Add Checking
  async createMultiple(slots: createSlotDto[]) {
    //TODO: Check here slots first then proceed to creating

    await Promise.all(
      slots.map((slot) =>
        this.isSlotValid(
          new Date(slot.start_datetime),
          new Date(slot.end_datetime),
          slot.rental_id,
        ),
      ),
    );

    // MAP IS NOT WAITING SO USELESS TO USE ASYNC/AWAIT
    // slots.map(async (slot) => {
    //   await this.isSlotValid(
    //     slot.start_datetime,
    //     slot.end_datetime,
    //     slot.rental_id,
    //   );
    // });

    const createdSlots: Slot[] = [];

    // const newSlots = slots.map(async (slot) => {
    //   const createdOneSlot = await this.create(slot);
    //   createdSlots.push(createdOneSlot);
    // });

    for (const slot of slots) {
      const createdOneSlot = await this.create(slot);
      createdSlots.push(createdOneSlot);
    }
    return createdSlots;
  }

  async getPriceOfRental(slot_id: number) {
    const slot = await this.findOne(slot_id);
    const rental = await this.rentalsService.findOneRental(slot.rental.id);

    return rental.price;
  }

  async isSlotValid(
    start_datetime: Date,
    end_datetime: Date,
    rental_id: number,
  ) {
    const overlappingSlot = await this.repo.findOne({
      where: [
        {
          rental: { id: rental_id },
          start_datetime: LessThan(new Date(end_datetime)),
          end_datetime: MoreThan(new Date(start_datetime)),
        },
      ],
    });

    if (overlappingSlot) {
      throw new BadRequestException(
        'This time slot overlaps with an existing slot.',
      );
    }
  }
}
