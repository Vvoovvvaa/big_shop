import {IsString,IsNumber,IsBoolean,Min,MaxLength, IsOptional} from 'class-validator'


export class ProductUpdateDTO {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string

  @IsOptional()
  @IsString()
  @MaxLength(300)
  description?: string

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number

  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @IsBoolean()
  in_stock?: boolean
}