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
          datetime: '2025-03-01T09:00:00.000Z',
          available_boards: 13,
          is_active: true,
          created_at: '2025-02-26T06:38:35.000Z',
          updated_at: '2025-02-26T06:45:58.000Z',
        },
        {
          id: 2,
          datetime: '2025-03-01T10:00:00.000Z',
          available_boards: 25,
          is_active: true,
          created_at: '2025-02-26T06:38:35.000Z',
          updated_at: '2025-02-26T06:38:35.000Z',
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
          datetime: '2025-05-01T06:00:00.000Z',
          available_boards: 25,
        },
        {
          datetime: '2025-05-01T07:00:00.000Z',
          available_boards: 25,
        },
        {
          datetime: '2025-05-01T08:00:00.000Z',
          available_boards: 25,
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
      id: 601,
      datetime: '2025-05-01T21:00:00.000Z',
      available_boards: 25,
      is_active: false,
      created_at: '2025-02-28T12:39:13.000Z',
      updated_at: '2025-02-28T12:48:11.000Z',
    },
  },
  enableSlotResponse: {
    description: 'is_active should be true if enabled',
    example: {
      id: 601,
      datetime: '2025-05-01T21:00:00.000Z',
      available_boards: 25,
      is_active: true,
      created_at: '2025-02-28T12:39:13.000Z',
      updated_at: '2025-02-28T12:48:11.000Z',
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
        total_price: 15000,
        number_of_boards: 3,
        created_at: '2025-02-26T06:45:58.000Z',
        updated_at: '2025-02-26T06:45:58.000Z',
        slot: {
          id: 1,
          datetime: '2025-03-01T09:00:00.000Z',
          available_boards: 13,
          is_active: true,
          created_at: '2025-02-26T06:38:35.000Z',
          updated_at: '2025-02-26T06:45:58.000Z',
        },
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
        total_price: 15000,
        number_of_boards: 3,
        created_at: '2025-02-26T06:45:58.000Z',
        updated_at: '2025-02-26T06:45:58.000Z',
        slotId: 1,
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
      total_price: 15000,
      number_of_boards: 3,
      created_at: '2025-02-26T06:45:58.000Z',
      updated_at: '2025-02-26T06:45:58.000Z',
      slotId: 1,
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
      total_price: 15000,
      number_of_boards: 3,
      created_at: '2025-02-26T06:45:58.000Z',
      updated_at: '2025-02-26T06:45:58.000Z',
      slotId: 1,
    },
  },
};
