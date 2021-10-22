import { plainToClass } from 'class-transformer';
import { IsString, IsNumber, validateSync, IsEmail } from 'class-validator';

export enum Environment {
  Staging = 'staging',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsNumber()
  APP_PORT: number;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_DATABASE: string;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  ACCESS_TOKEN_EXPIRES_IN: string;

  @IsString()
  REFRESH_TOKEN_EXPIRES_IN: string;

  @IsString()
  BASE_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
