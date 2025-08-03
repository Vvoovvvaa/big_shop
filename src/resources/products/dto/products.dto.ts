import {IsNotEmpty,IsString,IsNumber,IsBoolean,Min,MaxLength} from 'class-validator'

export class ProductsDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string

  @IsString()
  @MaxLength(300)
  description: string

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number

  @IsNotEmpty()
  @IsString()
  category: string

  @IsBoolean()
  in_stock: boolean
}