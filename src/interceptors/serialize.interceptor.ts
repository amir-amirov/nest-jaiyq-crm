import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled
    // by the request handler
    // console.log('I am running before the handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        // console.log('I am running before the response is sent out', data);

        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
