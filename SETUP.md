# Quick Setup Guide

## Prerequisites

Before starting, ensure you have:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v13 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** (comes with Node.js)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=ecommerce
JWT_SECRET=your-secret-key
```

### 3. Create Database

Open PostgreSQL and create the database:

**Option A: Using psql command line**
```bash
psql -U postgres
CREATE DATABASE ecommerce;
\q
```

**Option B: Using pgAdmin**
- Open pgAdmin
- Right-click on "Databases"
- Select "Create" > "Database"
- Enter name: `ecommerce`
- Click "Save"

### 4. Start the Application

```bash
npm run start:dev
```

The application will:
- Start on `http://localhost:3000`
- Automatically create database tables
- Be available at `http://localhost:3000/api`

### 5. Seed Test Data (Optional)

To populate the database with sample products and a test user:

```bash
npm run seed
```

This creates:
- **Test User**
  - Email: `test@example.com`
  - Password: `password123`
- **10 Sample Products** (headphones, watches, keyboards, etc.)

### 6. Test the API

#### Option A: Swagger UI (Recommended)
Open your browser and go to:
```
http://localhost:3000/api/docs
```

#### Option B: Using curl
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Get products
curl http://localhost:3000/api/products
```

See [API_TESTS.md](API_TESTS.md) for more examples.

---

## Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: Ensure PostgreSQL is running:
```bash
# Windows
# Check Services > PostgreSQL

# Linux/Mac
sudo systemctl status postgresql
sudo systemctl start postgresql
```

### Database Does Not Exist
```
Error: database "ecommerce" does not exist
```
**Solution**: Create the database manually (see Step 3)

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**: Change the port in `.env`:
```env
PORT=3001
```

### PowerShell Script Execution Error (Windows)
```
cannot be loaded because running scripts is disabled
```
**Solution**: Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run start` | Start the application |
| `npm run start:dev` | Start in development mode (auto-reload) |
| `npm run start:debug` | Start in debug mode |
| `npm run build` | Build for production |
| `npm run start:prod` | Start production build |
| `npm run seed` | Seed database with test data |
| `npm run lint` | Run linter |
| `npm run format` | Format code with Prettier |

---

## Next Steps

1. ✅ Explore the API using Swagger UI
2. ✅ Test authentication and JWT tokens
3. ✅ Create products, add to cart, and place orders
4. ✅ Review the code structure in the `src/` folder
5. ✅ Modify or extend the API as needed

---

## Project Structure Quick Reference

```
src/
├── auth/          # JWT authentication, user management
├── products/      # Product CRUD operations
├── cart/          # Shopping cart functionality
├── orders/        # Order creation and management
├── common/        # Shared filters, interceptors
├── main.ts        # Application entry point
└── app.module.ts  # Root module
```

---

## Support

- 📖 Full documentation: [README.md](README.md)
- 🔍 API examples: [API_TESTS.md](API_TESTS.md)
- 🌐 Swagger UI: `http://localhost:3000/api/docs`

For issues or questions, refer to the main documentation or check the Swagger documentation.
