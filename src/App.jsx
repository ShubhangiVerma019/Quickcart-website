import React, { Suspense, lazy } from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const Home = lazy(() => import ("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import ("./pages/Login"));
const Checkout = lazy(() => import ("./pages/Checkout"));

function App() {
  return (
    <BrowserRouter>

      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetails/>}/>
          <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
        </Routes>
        </Suspense>
      </Layout>

    </BrowserRouter>
  );
}

export default App;