import { IsString, IsInt, Min, Max, IsEmail, IsPhoneNumber, MinLength, IsBoolean, } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDTO {
  @IsString()
  readonly first_name: string;

  @IsString()
  readonly last_name: string;

  @Type(() => Number)
  @IsInt()
  @Min(18)
  @Max(100)
  readonly age: number;

  @IsEmail()
  readonly email: string;

  @IsPhoneNumber()
  readonly phone: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsBoolean()
  readonly is_active: boolean;
}