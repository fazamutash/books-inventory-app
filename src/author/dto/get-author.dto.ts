import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAuthorDto {
  @ApiProperty()
  @IsNumberString()
  id: string;
}
