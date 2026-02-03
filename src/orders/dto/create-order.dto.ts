import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: 'Please deliver between 9 AM - 5 PM',
    description: 'Additional notes for the order',
    required: false,
  })
  notes?: string;
}
