import { Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumbers } from 'src/validators/numbers.validator';

export class GetBooksByYearsDto {
  @ApiProperty()
  @Validate(IsNumbers)
  years: string;
}
