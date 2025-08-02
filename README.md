This is a full-stack app built using Next.js, TypeScript, TailwindCSS, and MongoDB.
It allows users to register/login, then create, read, update, and delete products.

Features
User Login & Registration
Protected Layout for authenticated users
Product CRUD (Add / Edit / Delete / View)
Filter products by Category & Price
Token-based Auth using JWT
State managed using React hooks (Redux optional)

Authentication Flow
User can register or login.
After successful login:
A JWT token is returned by the API.
Token is stored in localStorage.
When the user logs out:
Token is removed from localStorage.
Protected routes/layouts check if a valid token is present
set up the global http service thats always sent the  bearer token in the request - request interceptor


Folder Structure 
/app
  /products         ← Product listing UI + dialog form
  /auth             ← Login/Register pages
  /coming-soon      ← Placeholder for future features
/models
  /Product.ts       ← Mongoose model for product
  /User.ts          ← Mongoose model for user
/lib
  /db.ts            ← MongoDB connection helper
  /httpService.ts   ← Axios instance with token injection


Product API Endpoints
GET /api/products
Returns a list of products.
Supports filters:?category=electronics?price=1000-5000

POST /api/products
Add a new product.

Body example: {
  "name": "iPhone 15",
  "price": 120000,
  "category": "mobile",
  "inStock": true
}

PUT /api/products/:id
Update an existing product.

DELETE /api/products/:id
Delete a product by its ID.


 Product Page Functionality
All products are shown in card format.
You can filter them using dropdowns for category and price.

Add
Click “Add Product” to open a dialog.
Fill out the form and submit.
New product will appear instantly.

Edit
Click "Edit" on a product card.
The same form opens with pre-filled values.
Update the values and hit “Update”.

Delete
Click "Delete" on any product to remove it.

Setup Instructions
git clone https://github.com/AnmolRuhella/E-commerce.git
Install dependencies: npm install
Add your .env file: to the root of the project 
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret


 