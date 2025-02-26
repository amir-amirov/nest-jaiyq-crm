import {
  BadRequestException,
  ForbiddenException,
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

  async decreaseAvailableBoard(slotId: number, numberOfBoards: number) {
    const slot = await this.repo.findOne({ where: { id: slotId } });
    if (!slot) {
      throw new NotFoundException(`Slot with id of ${slotId} does not exist`);
    }
    if (slot.is_active == false) {
      throw new ForbiddenException('This slot is not active');
    }
    if (slot.available_boards < numberOfBoards) {
      throw new ForbiddenException('Not enough boards available');
    }

    slot.available_boards -= numberOfBoards;
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
        datetime: MoreThanOrEqual(date),
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

  createMultiple(slots: createSlotDto[]) {
    const newSlots = slots.map((slot) => this.repo.create(slot));
    return this.repo.save(newSlots);
  }
}
