# E-Commerce Backend API

A comprehensive NestJS-based E-Commerce Backend API with TypeScript, PostgreSQL, JWT authentication, and complete CRUD operations for products, cart, and orders.

## 🚀 Features

- **Authentication & Authorization**
  - User registration and login
  - JWT-based authentication
  - Password hashing with bcrypt
  - Protected routes with guards

- **Product Management**
  - Create, read, update, and delete products
  - Pagination support
  - Stock management
  - Image URL support

- **Shopping Cart**
  - Add/remove products
  - Update product quantities
  - Real-time stock validation
  - User-specific cart management

- **Order Management**
  - Convert cart to order
  - Automatic stock reduction
  - Order history tracking
  - Order status management

- **Technical Features**
  - OpenAPI (Swagger) documentation
  - Global exception handling
  - Request/response logging
  - DTO validation with class-validator
  - Modular architecture
  - TypeORM for database operations

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wibesoft
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=ecommerce
JWT_SECRET=your-secret-key
```

5. Create the PostgreSQL database:
```sql
CREATE DATABASE ecommerce;
```

## 🚀 Running the Application

### Development mode
```bash
npm run start:dev
```

### Production mode
```bash
npm run build
npm run start:prod
```

The application will be available at:
- API: `http://localhost:3000/api`
- Swagger Documentation: `http://localhost:3000/api/docs`

## 📚 API Documentation

Once the application is running, visit `http://localhost:3000/api/docs` to access the interactive Swagger documentation.

### Authentication Endpoints

#### Register a new user
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Product Endpoints

#### Get all products (with pagination)
```http
GET /api/products?page=1&limit=10
```

#### Get single product
```http
GET /api/products/:id
```

#### Create product (Protected)
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones",
  "price": 99.99,
  "imageUrl": "https://example.com/image.jpg",
  "stock": 50
}
```

#### Update product (Protected)
```http
PATCH /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "price": 89.99,
  "stock": 45
}
```

#### Delete product (Protected)
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

### Cart Endpoints (All Protected)

#### Get user cart
```http
GET /api/cart
Authorization: Bearer <token>
```

#### Add product to cart
```http
POST /api/cart/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "uuid-string",
  "quantity": 2
}
```

#### Update cart item quantity
```http
PATCH /api/cart/items/:productId
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove product from cart
```http
DELETE /api/cart/items/:productId
Authorization: Bearer <token>
```

### Order Endpoints (All Protected)

#### Create order from cart
```http
POST /api/orders
Authorization: Bearer <token>
```

#### Get all user orders
```http
GET /api/orders
Authorization: Bearer <token>
```

#### Get single order
```http
GET /api/orders/:id
Authorization: Bearer <token>
```

## 🏗️ Project Structure

```
src/
├── auth/                      # Authentication module
│   ├── dto/                   # Data Transfer Objects
│   ├── entities/              # User entity
│   ├── guards/                # JWT auth guard
│   ├── strategies/            # JWT strategy
│   ├── auth.controller.ts     # Auth endpoints
│   ├── auth.service.ts        # Auth business logic
│   └── auth.module.ts         # Auth module configuration
├── products/                  # Products module
│   ├── dto/                   # Product DTOs
│   ├── entities/              # Product entity
│   ├── products.controller.ts # Product endpoints
│   ├── products.service.ts    # Product business logic
│   └── products.module.ts     # Products module configuration
├── cart/                      # Cart module
│   ├── dto/                   # Cart DTOs
│   ├── entities/              # Cart & CartItem entities
│   ├── cart.controller.ts     # Cart endpoints
│   ├── cart.service.ts        # Cart business logic
│   └── cart.module.ts         # Cart module configuration
├── orders/                    # Orders module
│   ├── dto/                   # Order DTOs
│   ├── entities/              # Order & OrderItem entities
│   ├── orders.controller.ts   # Order endpoints
│   ├── orders.service.ts      # Order business logic
│   └── orders.module.ts       # Orders module configuration
├── common/                    # Shared resources
│   ├── filters/               # Global exception filter
│   └── interceptors/          # Logging interceptor
├── app.module.ts              # Root module
└── main.ts                    # Application entry point
```

## 🗄️ Database Schema

### Users
- id (UUID, PK)
- email (unique)
- password (hashed)
- name
- createdAt
- updatedAt

### Products
- id (UUID, PK)
- name
- description
- price
- imageUrl
- stock
- createdAt
- updatedAt

### Carts
- id (UUID, PK)
- userId (FK -> Users)
- createdAt
- updatedAt

### CartItems
- id (UUID, PK)
- cartId (FK -> Carts)
- productId (FK -> Products)
- quantity
- price

### Orders
- id (UUID, PK)
- userId (FK -> Users)
- totalAmount
- status (enum)
- createdAt

### OrderItems
- id (UUID, PK)
- orderId (FK -> Orders)
- productId (FK -> Products)
- quantity
- price

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with guards
- Input validation with class-validator
- SQL injection prevention with TypeORM
- CORS enabled

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| DB_USERNAME | Database username | postgres |
| DB_PASSWORD | Database password | postgres |
| DB_NAME | Database name | ecommerce |
| JWT_SECRET | JWT secret key | your-secret-key |
| JWT_EXPIRATION | JWT expiration time | 7d |
| PORT | Application port | 3000 |
| NODE_ENV | Environment mode | development |

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Build

```bash
npm run build
```

## 🐳 Docker Support (Optional)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ecommerce
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Run with:
```bash
docker-compose up -d
```

## 📄 License

This project is MIT licensed.

## 👨‍💻 Development

### Code Style
- ESLint for linting
- Prettier for formatting

### Best Practices Implemented
- Modular architecture (separation of concerns)
- Service layer for business logic
- Repository pattern with TypeORM
- DTO validation
- Global exception handling
- Consistent error messages
- HTTP status codes according to standards
- Logging for debugging and monitoring
- OpenAPI documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For questions or issues, please open an issue in the repository.
#   w i b e s o f t  
 