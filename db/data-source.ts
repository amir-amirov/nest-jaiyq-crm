import { Booking } from 'src/bookings/bookings.entity';
import { Rental } from 'src/rentals/rental.entity';
import { Slot } from 'src/slots/slot.entity';
import { User } from 'src/users/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  //   entities: [User, Slot, Booking, Rental],
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
