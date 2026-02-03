import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('Clearing existing data...');
  await dataSource.query('TRUNCATE TABLE "cart_items" CASCADE');
  await dataSource.query('TRUNCATE TABLE "carts" CASCADE');
  await dataSource.query('TRUNCATE TABLE "order_items" CASCADE');
  await dataSource.query('TRUNCATE TABLE "orders" CASCADE');
  await dataSource.query('TRUNCATE TABLE "products" CASCADE');
  await dataSource.query('TRUNCATE TABLE "users" CASCADE');

  // Create test user
  console.log('Creating test user...');
  const hashedPassword = await bcrypt.hash('password123', 10);
  await dataSource.query(
    `INSERT INTO "users" ("id", "email", "password", "name", "createdAt", "updatedAt") 
     VALUES (gen_random_uuid(), 'test@example.com', $1, 'Test User', NOW(), NOW())`,
    [hashedPassword],
  );

  // Create sample products
  console.log('Creating sample products...');
  const products = [
    {
      name: 'Wireless Headphones',
      description: 'High-quality Bluetooth headphones with noise cancellation',
      price: 99.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      stock: 50,
    },
    {
      name: 'Smart Watch',
      description: 'Fitness tracker with heart rate monitor and GPS',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      stock: 30,
    },
    {
      name: 'Laptop Stand',
      description: 'Ergonomic aluminum laptop stand',
      price: 49.99,
      imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
      stock: 100,
    },
    {
      name: 'USB-C Hub',
      description: '7-in-1 USB-C hub with HDMI, USB 3.0, and card reader',
      price: 39.99,
      imageUrl: 'https://images.unsplash.com/photo-1625948515291-69613efd103f',
      stock: 75,
    },
    {
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical gaming keyboard with blue switches',
      price: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212',
      stock: 40,
    },
    {
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with adjustable DPI',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db',
      stock: 120,
    },
    {
      name: 'Phone Case',
      description: 'Durable protective phone case with card holder',
      price: 19.99,
      imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8',
      stock: 200,
    },
    {
      name: 'Portable Charger',
      description: '20000mAh power bank with fast charging',
      price: 34.99,
      imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5',
      stock: 85,
    },
    {
      name: 'Webcam',
      description: '1080p HD webcam with built-in microphone',
      price: 79.99,
      imageUrl: 'https://images.unsplash.com/photo-1593078165531-5d9e3e7de4a2',
      stock: 55,
    },
    {
      name: 'Monitor',
      description: '27-inch 4K UHD monitor with IPS panel',
      price: 349.99,
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
      stock: 25,
    },
  ];

  for (const product of products) {
    await dataSource.query(
      `INSERT INTO "products" ("id", "name", "description", "price", "imageUrl", "stock", "createdAt", "updatedAt") 
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())`,
      [product.name, product.description, product.price, product.imageUrl, product.stock],
    );
  }

  console.log('✅ Database seeding completed!');
  console.log('\n📝 Test credentials:');
  console.log('Email: test@example.com');
  console.log('Password: password123');

  await app.close();
}

seed()
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
