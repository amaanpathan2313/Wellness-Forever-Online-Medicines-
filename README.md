# 🏥 Wellness Forever – Online Medicines

A full-stack web application for browsing, searching, and purchasing medicines online. Built with **React**, **Node.js**, **Express.js**, and **MongoDB**, it provides a smooth and secure user experience for online medicine shopping.

---

Live Project : https://wellnessroute01.netlify.app/


## 🚀 Features

### **🔹 User Features**

* User registration & login with JWT authentication
* Browse and search medicines
* View detailed medicine information
* Add to cart & manage cart items
* Place an order
* View order history
* Add product reviews
* Maintain wishlist

### **🔹 Admin Features** 

* Add, update & delete medicines

### **🔹 Tech Features**

* RESTful API using Express.js
* Secure password hashing (bcrypt)
* MongoDB for database
* MVC folder structure
* Error handling middleware
* Fully structured backend with controllers, models & routes
* React frontend for UI & UX

---

## 🛠️ Tech Stack

### **Frontend**

* React.js
* React Router
* Axios
* Tailwind CSS / Custom CSS

### **Backend**

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT Authentication
* bcrypt

---

## 📁 Folder Structure

```
Wellness-Forever-Online-Medicines/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── frontend/
    ├── src/
    ├── components/
    ├── pages/
    ├── utils/
    └── App.js
```

---

## ⚙️ Installation & Setup

### **1️⃣ Clone the repository**

```bash
git clone https://github.com/amaanpathan2313/Wellness-Forever-Online-Medicines-.git
cd Wellness-Forever-Online-Medicines-
```

### **2️⃣ Setup Backend**

```bash
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend:

```bash
npm start
```

### **3️⃣ Setup Frontend**

```bash
cd ../frontend
npm install
npm start
```

---

## 🌐 API Endpoints (Backend)

### **Auth**

* POST `/auth/register`
* POST `/auth/login`

### **Products**

* GET `/products`
* GET `/products/:id`
* POST `/products` *(admin)*
* PUT `/products/:id`
* DELETE `/products/:id`

### **Cart**

* GET `/cart`
* POST `/cart/add`
* DELETE `/cart/remove/:id`

### **Orders**

* POST `/order/create`
* GET `/orders`

### **Reviews**

* POST `/review/:productId`

---

## 📦 Deployment

Supports deployment on platforms like:

* Render
* Vercel
* Netlify
* Railway
* Heroku

---

## 👨‍💻 Author

**Amaan Pathan**
Computer Engineering | Full-Stack Developer
GitHub: [amaanpathan2313](https://github.com/amaanpathan2313)

---

## ⭐ Show your support

If you like this project, consider giving it a ⭐ on GitHub!

---

