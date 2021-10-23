import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBookDto {
  @ApiProperty()
  @IsNumberString()
  id: string;
}
