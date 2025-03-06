import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function UniqueSlots(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UniqueSlots',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(slots: any[], args: ValidationArguments) {
          if (!Array.isArray(slots)) return false;

          const uniqueSet = new Set();
          for (const slot of slots) {
            const key = `${slot.start_datetime}-${slot.end_datetime}-${slot.rental_id}`;
            if (uniqueSet.has(key)) {
              return false; // Duplicate found
            }
            uniqueSet.add(key);
          }
          return true; // No duplicates
        },
        defaultMessage(args: ValidationArguments) {
          return 'Duplicate slots found in the request.';
        },
      },
    });
  };
}
