# 🛒 QuickCart – E-commerce Web App

QuickCart is a lightweight e-commerce web application built using React. It simulates a real-world online shopping experience with product browsing, cart management, authentication, and checkout flow.

---

## 🚀 Features

- 🛍️ Browse products
- 📄 View product details
- 🛒 Add/remove items from cart
- 🔢 Manage product quantities
- 🔐 User authentication (Login/Logout)
- 🔒 Protected routes (e.g., Checkout)
- 💳 Checkout simulation
- 📦 Order summary
- 🔍 Search & filtering
- 📄 Pagination
- ⚡ Optimized performance
- 📱 Fully responsive UI

---

## 🧠 Tech Stack

### Frontend

- React 18
- React Router v6
- Redux Toolkit
- Redux Thunk
- Material UI
- Axios
- React Hook Form
- Yup Validation

### Advanced Concepts Used

- Context API
- Custom Hooks (`useAuth`, `useCart`, `useProducts`)
- Lazy Loading & Code Splitting
- Error Boundaries
- Memoization (`React.memo`, `useMemo`, `useCallback`)
- Performance Optimization

---

## 🌐 APIs Used

- Fake Store API
  https://fakestoreapi.com/

- DummyJSON API (for search & pagination)
  https://dummyjson.com/

- Random User API (for mock authentication)
  https://randomuser.me/

---

## 📂 Project Structure

```
src/
│── api/               # API calls
│── components/        # Reusable components
│── pages/             # Page components
│── store/             # Redux store & slices
│── context/           # Context API
│── hooks/             # Custom hooks
│── routes/            # Protected routes
│── utils/             # Helpers
```

---

## 🔑 Key Functionalities

### 🛍️ Product Module

- Product listing with category filter
- Search functionality with debouncing
- Pagination implementation

### 🛒 Cart System

- Add/remove items
- Quantity control
- Total price calculation

### 🔐 Authentication

- Login using API
- Token handling
- Protected routes

### 💳 Checkout

- Order summary
- Address form
- Mock payment flow

---

## ⚙️ Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/your-username/quickcart.git
```

2. Navigate to project

```bash
cd quickcart
```

3. Install dependencies

```bash
npm install
```

4. Start development server

```bash
npm run dev
```

---

## 📈 Performance Optimizations

- Lazy loading using `React.lazy` & `Suspense`
- Memoization using `useMemo`, `useCallback`, `React.memo`
- Efficient state management with Redux Toolkit
- API abstraction layer

---

## 🎯 Learning Outcomes

- Built scalable React architecture
- Implemented real-world e-commerce features
- Hands-on experience with Redux Toolkit
- Improved performance optimization techniques
- Worked with API integration & authentication flows

---

## 📌 Future Improvements

- Add unit testing
- Improve UI/UX
- Add real payment gateway
- Backend integration
- Logs for tracking (sentry)

---

## 👩‍💻 Author

**Shubhangi Verma**

---
