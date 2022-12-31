import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ParseOptionalIntPipe implements PipeTransform {
  transform(value: any) {
    if (value === undefined) {
      return value;
    }

    const intValue = parseInt(value);

    if (Number.isInteger(intValue)) {
      return intValue;
    }

    throw new HttpException(
      'Validation failed (optional numeric string is expected)',
      HttpStatus.BAD_REQUEST,
    );
  }
}
