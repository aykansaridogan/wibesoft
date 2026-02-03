import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsUrl,
  Min,
  MinLength,
  MaxLength,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Wireless Headphones',
    description: 'Product name',
  })
  @IsString()
  @MinLength(3, { message: 'Product name must be at least 3 characters long' })
  @MaxLength(200, { message: 'Product name must not exceed 200 characters' })
  name: string;

  @ApiProperty({
    example: 'High-quality wireless headphones with noise cancellation',
    description: 'Product description',
  })
  @IsString()
  @MinLength(10, {
    message: 'Product description must be at least 10 characters long',
  })
  description: string;

  @ApiProperty({
    example: 99.99,
    description: 'Product price',
    minimum: 0,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a valid number with up to 2 decimal places' },
  )
  @Min(0, { message: 'Price must be a positive number' })
  price: number;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Product image URL',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'Image URL must be a valid URL' })
  imageUrl?: string;

  @ApiProperty({
    example: 50,
    description: 'Available stock quantity',
    minimum: 0,
    default: 0,
  })
  @IsInt({ message: 'Stock must be an integer' })
  @Min(0, { message: 'Stock must be a non-negative number' })
  stock: number;
}
