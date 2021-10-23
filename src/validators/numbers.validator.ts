import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'numbers', async: true })
@Injectable()
export class IsNumbers implements ValidatorConstraintInterface {
  async validate(numbers: string) {
    const re = new RegExp(/^[0-9]+(,[0-9]+)*$/);
    if (re.test(numbers)) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be numbers with comma delimiter`;
  }
}
