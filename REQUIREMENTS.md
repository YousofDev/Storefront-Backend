### StoreFrontBackend Project Requirements

### Database Schema:

## Users Table:

CREATE TABLE users (
id SERIAL PRIMARY KEY,
first_name VARCHAR(250) NOT NULL,
last_name VARCHAR(250) NOT NULL,
email VARCHAR(250) NOT NULL,
password VARCHAR(250) NOT NULL,
role TEXT CHECK(role IN('User', 'Admin')) DEFAULT 'User',
is_active BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

## Products Table:

CREATE TABLE products (
id SERIAL PRIMARY KEY,
name VARCHAR(250) NOT NULL,
price FLOAT NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

## Orders Table:

CREATE TABLE orders (
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL REFERENCES users (id),
status TEXT CHECK(status IN('Processing', 'Shipping', 'Delivered')) DEFAULT 'Processing',
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

## Order Products Table:

CREATE TABLE order_products (
id SERIAL PRIMARY KEY,  
 order_id INTEGER NOT NULL REFERENCES orders (id),
product_id INTEGER NOT NULL REFERENCES products (id),
quantity INTEGER NOT NULL
);

### Project Endpoints:

## Users:

- Get All Users @Header Authorization<Token>:
  http://localhost:3000/api/v1/users
- Create User => @Param id / @Body user object @Header Authorization<Token>:
  http://localhost:3000/api/v1/users
- Get One User => @Param id @Header Authorization<Token>:
  http://localhost:3000/api/v1/users/:id
- Update User => @Param id / @Body user object @Header Authorization<Token>:
  http://localhost:3000/api/v1/users/:id
- Delete One User => @Param id @Header Authorization<Token>:
  http://localhost:3000/api/v1/users/:id
- Login User => @Body email, password:
  http://localhost:3000/api/v1/users/me/login
- Logout User:
  http://localhost:3000/api/v1/users/me/logout

## Products:

- Get All Products:
  http://localhost:3000/api/v1/products
- Create Product => @Body product object @Header Authorization<Token>:
  http://localhost:3000/api/v1/products
- Get One Product => @Param id:
  http://localhost:3000/api/v1/products/:id
- Update Product => @Param id @Body product object @Header Authorization<Token>:
  http://localhost:3000/api/v1/products/:id
- Delete One Product => @Param id @Header Authorization<Token>:
  http://localhost:3000/api/v1/products/:id

## Orders:

- Get All Orders => @Header Authorization<Token>:
  http://localhost:3000/api/v1/orders
- Create Order => @Body order object @Header Authorization<Token>:
  http://localhost:3000/api/v1/orders
- Get One Order => @Param id @Header Authorization<Token>:
  http://localhost:3000/api/v1/orders/:id
- Update Order => @Param id @Body order object @Header Authorization<Token>:
  http://localhost:3000/api/v1/orders/:id
- Delete One Order => @Param id @Header Authorization<Token>:
  http://localhost:3000/api/v1/orders/:id

## Order Products:

- Get All Order Products => @Header Authorization<Token>:
  http://localhost:3000/api/v1/orders/order-products
- Get Order Products => @Param orderId @Header Authorization<Token>:
  http://localhost:3000/api/v1/orders/order-products/:orderId
- Create Order Product => @Body orderProduct object @Header Authorization<Token>:
  http://localhost:3000/api/v1/orders/order-products/:orderId/:productId
- Get One Order Product => @Param orderId, productId @Header Authorization<Token>:
  http://localhost:3000/api/v1/orders/order-products/:orderId/:productId
- Update Order Product => @Param orderId, productId @Body orderProduct object @Header Authorization<Token>:
  http://localhost:3000/api/v1/orders/order-products/:orderId/:productId
- Delete One Order Product => @Param orderId, productId @Header Authorization<Token>:
  http://localhost:3000/api/v1/orders/order-products/:orderId/:productId
