# E-Commerce API Test Collection

This file contains example API requests for testing the E-Commerce Backend API.

## Base URL
```
http://localhost:3000/api
```

## 1. Authentication

### Register New User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Save the `accessToken` from the response for authenticated requests!**

---

## 2. Products

### Get All Products (with pagination)
```bash
curl -X GET "http://localhost:3000/api/products?page=1&limit=10"
```

### Get Single Product
```bash
curl -X GET http://localhost:3000/api/products/{PRODUCT_ID}
```

### Create Product (Protected - requires token)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "Wireless Keyboard",
    "description": "Compact wireless keyboard with long battery life",
    "price": 59.99,
    "imageUrl": "https://example.com/keyboard.jpg",
    "stock": 45
  }'
```

### Update Product (Protected - requires token)
```bash
curl -X PATCH http://localhost:3000/api/products/{PRODUCT_ID} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "price": 49.99,
    "stock": 50
  }'
```

### Delete Product (Protected - requires token)
```bash
curl -X DELETE http://localhost:3000/api/products/{PRODUCT_ID} \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 3. Cart (All endpoints require authentication)

### Get User Cart
```bash
curl -X GET http://localhost:3000/api/cart \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Add Product to Cart
```bash
curl -X POST http://localhost:3000/api/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "productId": "PRODUCT_UUID",
    "quantity": 2
  }'
```

### Update Cart Item Quantity
```bash
curl -X PATCH http://localhost:3000/api/cart/items/{PRODUCT_ID} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "quantity": 3
  }'
```

### Remove Product from Cart
```bash
curl -X DELETE http://localhost:3000/api/cart/items/{PRODUCT_ID} \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 4. Orders (All endpoints require authentication)

### Create Order from Cart
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Get All User Orders
```bash
curl -X GET http://localhost:3000/api/orders \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Get Single Order
```bash
curl -X GET http://localhost:3000/api/orders/{ORDER_ID} \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Testing Workflow

1. **Start the application**: `npm run start:dev`
2. **Seed the database**: `npm run seed`
3. **Login** with test credentials:
   - Email: `test@example.com`
   - Password: `password123`
4. **Copy the access token** from the login response
5. **Get products** to find product IDs
6. **Add products to cart** using the product IDs
7. **View cart** to verify items
8. **Create order** to complete the purchase
9. **View orders** to see order history

---

## Swagger Documentation

For interactive API testing, visit:
```
http://localhost:3000/api/docs
```

The Swagger UI provides a complete interactive interface for testing all endpoints with built-in authentication support.
