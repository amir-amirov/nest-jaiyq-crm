import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rental } from './rental.entity';
import { Repository } from 'typeorm';
import { createRentalDto } from './dtos/create-rental.dto';
import { updateRentalDto } from './dtos/update-rental.dto';

@Injectable()
export class RentalsService {
  constructor(@InjectRepository(Rental) private repo: Repository<Rental>) {}

  // POST
  async create(rentalDto: createRentalDto) {
    const rental = await this.repo.findOne({
      where: { title: rentalDto.title },
    });
    if (rental) {
      throw new BadRequestException(
        `Rental for ${rentalDto.title} already exist.`,
      );
    }
    const newRental = this.repo.create(rentalDto);
    return this.repo.save(newRental);
  }

  // Helper function
  async findOneRental(id: number) {
    const rental = await this.repo.findOneBy({ id });
    if (!rental) {
      throw new NotFoundException(`Rental with id ${id} not found`);
    }
    return rental;
  }

  //DELETE
  async remove(id: number) {
    const slot = await this.findOneRental(id);

    return this.repo.remove(slot);
  }

  //GET(s)

  getAll() {
    return this.repo.find();
  }

  async getOne(rental_id: number) {
    return this.repo.find({
      where: {
        id: rental_id,
      },
    });
  }

  //PATCH
  async updateRental(rental_id: number, attrs: updateRentalDto) {
    const rental = await this.findOneRental(rental_id);

    const newRental = this.repo.create({ ...rental, ...attrs });
    return this.repo.save(newRental);
  }
}
