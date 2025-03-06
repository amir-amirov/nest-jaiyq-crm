import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlotsModule } from './slots/slots.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './slots/slot.entity';
import { BookingsModule } from './bookings/bookings.module';
import { Booking } from './bookings/bookings.entity';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './users/auth.constants';
import { User } from './users/user.entity';
import { PaymentModule } from './payment/payment.module';
import { RentalsModule } from './rentals/rentals.module';
import { Rental } from './rentals/rental.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes config available everywhere
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.DB_HOST,
      // port: Number(process.env.DB_PORT),
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DATABASE,
      url: process.env.DATABASE_URL,
      entities: [User, Slot, Booking, Rental],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, // Needed for Railway and some cloud providers
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Slot, Booking, Rental],
    //   synchronize: true,
    // }),
    TypeOrmModule.forFeature([User, Slot, Booking, Rental]), // to be able to use User, Slot and Bookings repos in app
    UsersModule,
    SlotsModule,
    BookingsModule,
    UsersModule,
    PaymentModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '365d' },
    }),
    RentalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
