🏥 QuickMed – Online Medical Shop

QuickMed is a full-stack online medical store that provides on-demand, home-delivered access to a wide range of prescription medicines, OTC pharmaceutical products, and healthcare essentials.

Users can browse products, add them to cart, place orders, and manage their profile. Secure authentication ensures that users stay logged in until they choose to log out.

## 🚀 Features

🛒 Product Browsing – View a wide range of medicines and healthcare items.
🔑 Authentication – Login & Signup system (users stay logged in until Logout).
📦 Cart & Orders – Add products to cart, manage items, and place secure orders.
☁️ Database Integration – All product, user, and order data is stored in MongoDB Atlas.
⚡ Real-time Updates – Orders and product updates reflect instantly.
🔐 Protected Routes – Cart & Checkout require login.
🌐 Deployment Ready – Frontend and backend are deployed and accessible.🚀 Features
🛒 Product Browsing – View a wide range of medicines and healthcare items.
🔑 Authentication – Login & Signup system (users stay logged in until Logout).
📦 Cart & Orders – Add products to cart, manage items, and place secure orders.
☁️ Database Integration – All product, user, and order data is stored in MongoDB Atlas.
⚡ Real-time Updates – Orders and product updates reflect instantly.
🔐 Protected Routes – Cart & Checkout require login.
🌐 Deployment Ready – Frontend and backend are deployed and accessible.


## 🛠️ Tech Stack

#Frontend

 -React.js

 -React Router

 -TailwindCSS + Framer Motion (UI & Animations)

#Backend

 -Node.js

 -Express.js

 -MongoDB Atlas (Database)

 -JWT Authentication (secure login & logout)

## 📂 Project Structure

  quickmed/
│── client/          # Frontend (React)
│   ├── src/
│   └── public/
│── server/          # Backend (Node + Express)
│   ├── models/      # MongoDB Models
│   ├── routes/      # API Routes
│   ├── controllers/ # Controllers (Products, Cart, Orders, Users)
│   └── config/      # DB & Auth Config
│── README.md

## ⚙️ Installation & Setup

1️⃣ Clone the repository
   git clone https://github.com/your-username/quickmed.git
   cd quickmed

2️⃣ Setup Backend
   cd server
   npm install

Create a .env file in server/ with:
   MONGO_URI=your_mongodb_atlas_connection
  JWT_SECRET=your_jwt_secret
  PORT=5000

3️⃣ Setup Frontend
    cd ../client
    npm install
    npm start

## 🌍 Deployment

🔹 Frontend

    Deployed on Netlify → https://myquickmed.netlify.app/

🔹 Backend

    Deployed on Render → Backend API

## 🔒 Authentication Flow

   1.User signs up / logs in.
   2.JWT token is issued and stored in browser (session).
   3.User stays logged in until Logout.
   4.Cart & Checkout are protected routes (require login).    


## 📦 Order Management

   -Users can place orders from the cart.

   -Orders are stored in MongoDB Atlas.

   -Admin can track order history.

✨ With QuickMed, buying medicines online becomes simple, fast, and reliable!



