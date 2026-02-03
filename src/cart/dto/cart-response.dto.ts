import { ApiProperty } from '@nestjs/swagger';

class CartItemResponseDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'uuid-string' })
  productId: string;

  @ApiProperty({
    example: {
      id: 'uuid-string',
      name: 'Wireless Headphones',
      price: 99.99,
      imageUrl: 'https://example.com/image.jpg',
      stock: 50,
    },
  })
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    stock: number;
  };

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 99.99 })
  price: number;

  @ApiProperty({ example: 199.98 })
  subtotal: number;
}

export class CartResponseDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'uuid-string' })
  userId: string;

  @ApiProperty({ type: [CartItemResponseDto] })
  items: CartItemResponseDto[];

  @ApiProperty({ example: 2 })
  totalItems: number;

  @ApiProperty({ example: 199.98 })
  totalAmount: number;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
