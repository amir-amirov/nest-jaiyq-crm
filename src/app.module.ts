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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Slot, Booking],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Slot, Booking]), // to be able to use User, Slot and Bookings repos in app
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
