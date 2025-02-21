// import { Injectable } from '@nestjs/common';
// import { createSlotDto } from './dto/create-slot.dto';

// @Injectable()
// export class SlotsService {
//   create(body: createSlotDto) {
//     return 'Create';
//   }

//   getByStartDate(date: string) {
//     return 'Get';
//   }
// }

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slot } from './slot.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { createSlotDto } from './dtos/create-slot.dto';

@Injectable()
export class SlotsService {
  constructor(@InjectRepository(Slot) private repo: Repository<Slot>) {}

  async create(slotDto: createSlotDto) {
    const slot = await this.repo.findOne({
      where: { datetime: slotDto.datetime },
    });
    if (slot) {
      throw new BadRequestException(
        `Slot for ${slotDto.datetime} already exist.`,
      );
    }
    const newSlot = this.repo.create(slotDto);
    return this.repo.save(newSlot);
  }

  async decreaseAvailableBoard(slotId: number, numberOfBoards: number) {
    const slot = await this.repo.findOne({ where: { id: slotId } });
    if (!slot) {
      throw new NotFoundException(`Slot with id of ${slotId} does not exist`);
    }
    if (slot.available_boards < numberOfBoards) {
      throw new BadRequestException('Not enough boards available');
    }

    slot.available_boards -= numberOfBoards;
    return await this.repo.save(slot);
  }

  async getByStartDate(date: string) {
    const slots = await this.repo.find({
      where: {
        datetime: MoreThanOrEqual(date),
      },
    });

    return slots;
  }

  async getSlotById(slot_id: number) {
    const slot = await this.repo.find({
      where: {
        id: slot_id,
      },
    });
    return slot;
  }
}
