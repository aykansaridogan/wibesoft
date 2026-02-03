import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { OrderResponseDto } from './dto/order-response.dto';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private cartService: CartService,
    private productsService: ProductsService,
  ) {}

  async createOrder(userId: string): Promise<OrderResponseDto> {
    // Get user's cart
    const cart = await this.cartService.getCart(userId);

    if (!cart.items || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Verify stock availability for all items
    for (const item of cart.items) {
      const hasStock = await this.productsService.checkStock(
        item.productId,
        item.quantity,
      );

      if (!hasStock) {
        throw new BadRequestException(
          `Insufficient stock for product: ${item.product.name}`,
        );
      }
    }

    // Create order
    const order = this.orderRepository.create({
      userId,
      totalAmount: cart.totalAmount,
      status: OrderStatus.PENDING,
    });

    const savedOrder = await this.orderRepository.save(order);

    // Create order items and decrease stock
    const orderItems = [];

    for (const cartItem of cart.items) {
      const orderItem = this.orderItemRepository.create({
        orderId: savedOrder.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        price: cartItem.price,
      });

      orderItems.push(orderItem);

      // Decrease product stock
      await this.productsService.decreaseStock(
        cartItem.productId,
        cartItem.quantity,
      );
    }

    await this.orderItemRepository.save(orderItems);

    // Clear cart
    await this.cartService.clearCart(userId);

    this.logger.log(`Order created: ${savedOrder.id} for user: ${userId}`);

    // Return order with items
    return this.findOne(userId, savedOrder.id);
  }

  async findAll(userId: string): Promise<OrderResponseDto[]> {
    const orders = await this.orderRepository.find({
      where: { userId },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });

    return orders.map((order) => this.mapOrderToDto(order));
  }

  async findOne(userId: string, orderId: string): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId, userId },
      relations: ['items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return this.mapOrderToDto(order);
  }

  private mapOrderToDto(order: Order): OrderResponseDto {
    const items = order.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      product: {
        id: item.product.id,
        name: item.product.name,
        imageUrl: item.product.imageUrl,
      },
      quantity: item.quantity,
      price: Number(item.price),
      subtotal: Number(item.price) * item.quantity,
    }));

    return {
      id: order.id,
      userId: order.userId,
      items,
      totalAmount: Number(order.totalAmount),
      status: order.status,
      createdAt: order.createdAt,
    };
  }
}
