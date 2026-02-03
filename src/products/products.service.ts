import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    const savedProduct = await this.productRepository.save(product);
    this.logger.log(`Product created: ${savedProduct.name} (${savedProduct.id})`);
    return savedProduct;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{
    data: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Page and limit must be positive numbers');
    }

    const skip = (page - 1) * limit;

    const [data, total] = await this.productRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    Object.assign(product, updateProductDto);

    const updatedProduct = await this.productRepository.save(product);
    this.logger.log(`Product updated: ${updatedProduct.name} (${updatedProduct.id})`);

    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    this.logger.log(`Product deleted: ${product.name} (${id})`);
  }

  async checkStock(productId: string, quantity: number): Promise<boolean> {
    const product = await this.findOne(productId);
    return product.stock >= quantity;
  }

  async decreaseStock(productId: string, quantity: number): Promise<void> {
    const product = await this.findOne(productId);

    if (product.stock < quantity) {
      throw new BadRequestException(`Insufficient stock for product: ${product.name}`);
    }

    product.stock -= quantity;
    await this.productRepository.save(product);
  }
}
