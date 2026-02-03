import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../entities/order.entity';

class OrderItemResponseDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'uuid-string' })
  productId: string;

  @ApiProperty({
    example: {
      id: 'uuid-string',
      name: 'Wireless Headphones',
      imageUrl: 'https://example.com/image.jpg',
    },
  })
  product: {
    id: string;
    name: string;
    imageUrl?: string;
  };

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 99.99 })
  price: number;

  @ApiProperty({ example: 199.98 })
  subtotal: number;
}

export class OrderResponseDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'uuid-string' })
  userId: string;

  @ApiProperty({ type: [OrderItemResponseDto] })
  items: OrderItemResponseDto[];

  @ApiProperty({ example: 299.97 })
  totalAmount: number;

  @ApiProperty({ example: 'pending', enum: OrderStatus })
  status: OrderStatus;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;
}
