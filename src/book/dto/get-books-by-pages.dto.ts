import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class GetBooksByPagesDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  min: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  max: string;
}
