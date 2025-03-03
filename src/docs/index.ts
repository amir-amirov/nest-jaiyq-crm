import { SlotDto } from 'src/slots/dtos/slot.dto';
import { createUserDto } from 'src/users/dtos/create-user.dto';
import { UserDto } from 'src/users/dtos/user.dto';

export const docs = {
  getSlotsRequest: {
    name: 'start_date',
    type: String,
    description: 'The start date should be in ISO string format',
    required: true,
    example: '2025-02-27T09:00:00.000Z',
  },
  getSlotsResponse: {
    status: 200,
    description: 'Fetched slots',
    schema: {
      example: [
        {
          id: 1,
          start_datetime: '2025-03-05T06:00:00Z',
          end_datetime: '2025-03-05T06:20:00Z',
          available_quantity: 20,
          rental_id: 1,
          is_active: true,
          created_at: '2025-03-03T21:15:23.000Z',
          updated_at: '2025-03-03T21:15:23.000Z',
        },
        {
          id: 2,
          start_datetime: '2025-03-05T06:20:00Z',
          end_datetime: '2025-03-05T06:30:00Z',
          available_quantity: 20,
          rental_id: 1,
          is_active: true,
          created_at: '2025-03-03T21:15:23.000Z',
          updated_at: '2025-03-03T21:15:23.000Z',
        },
      ],
    },
  },
  createSlotsBulkResponse: {
    description: 'Created slots successfully',
    example: {
      status: 'success',
      created_slots: [
        {
          start_datetime: '2025-03-14T09:00:00Z',
          end_datetime: '2025-03-14T09:20:00Z',
          available_quantity: 20,
          rental_id: 2,
        },
        {
          start_datetime: '2025-03-14T09:20:00Z',
          end_datetime: '2025-03-14T09:30:00Z',
          available_quantity: 20,
          rental_id: 1,
        },
      ],
    },
  },
  createSlotResponse: {
    description: 'Created slot successfully',
    type: SlotDto,
  },
  disableSlotResponse: {
    description: 'is_active should be false if disabled',
    example: {
      id: 555,
      start_datetime: '2025-03-17T10:30:00Z',
      end_datetime: '2025-03-17T11:00:00Z',
      available_quantity: 20,
      is_active: false,
      created_at: '2025-03-03T21:17:18.000Z',
      updated_at: '2025-03-03T21:34:01.000Z',
      rental_id: 2,
    },
  },
  enableSlotResponse: {
    description: 'is_active should be true if enabled',
    example: {
      id: 555,
      start_datetime: '2025-03-17T10:30:00Z',
      end_datetime: '2025-03-17T11:00:00Z',
      available_quantity: 20,
      is_active: true,
      created_at: '2025-03-03T21:17:18.000Z',
      updated_at: '2025-03-03T21:34:01.000Z',
      rental_id: 2,
    },
  },
  deleteSlotResponse: {
    status: 200,
    description: 'Deleted slot',
    type: SlotDto,
  },
  getPriceResponse: {
    status: 200,
    description: 'Calculate price based on provided number of boards',
    example: 5000,
  },
  paymentResponse: {
    description: 'Successfully',
    example: 'Successfully',
  },
  patchSlotResponse: {
    status: 200,
    description:
      'Patched slot: you dont have to write everything datetime + available_boards + is_active, just write those properties you want to update',
    type: SlotDto,
  },
  createUserResponse: {
    description: 'Created an user',
    example: {
      id: 1,
      username: 'john_doe',
    },
  },
  loginUserResponse: {
    description: 'Logged in an user',
    type: UserDto,
  },
  userByIdResponse: {
    status: 200,
    description: 'Success',
    example: {
      id: 1,
      username: 'john_doe',
    },
  },
  getUserByUsernameRequest: {
    name: 'username',
    type: String,
    required: true,
    example: 'test',
  },
  getBookingsBySlotID: {
    status: 200,
    description: 'Success',
    example: [
      {
        id: 1,
        first_name: 'John',
        phone: '+77074304349',
        status: 'paid',
        total_price: 5833,
        quantity: 5,
        created_at: '2025-03-03T21:28:33.000Z',
        updated_at: '2025-03-03T21:28:33.000Z',
        slot_id: 5,
      },
    ],
  },
  getBookingsResponse: {
    status: 200,
    description: 'Success',
    example: [
      {
        id: 1,
        first_name: 'John',
        phone: '+77074304349',
        status: 'paid',
        total_price: 5833,
        quantity: 5,
        created_at: '2025-03-03T21:28:33.000Z',
        updated_at: '2025-03-03T21:28:33.000Z',
        slot_id: 5,
      },
    ],
  },
  createBookingResponse: {
    description: 'Success',
    example: {
      id: 1,
      first_name: 'John',
      phone: '+77074304349',
      status: 'paid',
      total_price: 5833,
      quantity: 5,
      created_at: '2025-03-03T21:28:33.000Z',
      updated_at: '2025-03-03T21:28:33.000Z',
      slot_id: 5,
    },
  },
  getBookingsByID: {
    status: 200,
    description: 'Success',
    example: {
      id: 1,
      first_name: 'John',
      phone: '+77074304349',
      status: 'paid',
      total_price: 5833,
      quantity: 5,
      created_at: '2025-03-03T21:28:33.000Z',
      updated_at: '2025-03-03T21:28:33.000Z',
      slot_id: 5,
    },
  },
  rentalAll: {
    status: 200,
    description: 'Success',
    example: [
      {
        id: 1,
        title: 'boat',
        price: 7000,
        created_at: '2025-03-03T21:07:28.000Z',
        updated_at: '2025-03-03T21:07:28.000Z',
      },
      {
        id: 2,
        title: 'subboard',
        price: 4000,
        created_at: '2025-03-03T21:07:41.000Z',
        updated_at: '2025-03-03T21:07:41.000Z',
      },
    ],
  },
  rental: {
    status: 200,
    description: 'Success',
    example: {
      id: 1,
      title: 'subboard',
      price: 5000,
      created_at: '2025-03-03T21:07:28.000Z',
      updated_at: '2025-03-03T21:07:28.000Z',
    },
  },
};
