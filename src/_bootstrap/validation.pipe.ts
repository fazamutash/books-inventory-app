import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

interface IValidationError {
  property: string;
  errors: string[];
  constraints: {
    [type: string]: string;
  };
}

/**
 * Validation Pipe.
 * Gets Validation errors and creates custom error messages
 */
@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new UnprocessableEntityException(this.formatErrors(errors));
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]): IValidationError[] {
    const result = [];
    errors.forEach((err) => {
      if (err.property && err.constraints) {
        result.push({
          property: err.property,
          errors: Object.keys(err.constraints),
          constraints: err.constraints,
        });
      }
      if (err.children?.length > 0) {
        const childError = this.formatErrors(err.children);
        result.push(...childError);
      }
    });
    return result;
  }
}
