import axios from "axios";

export const getAllProducts = async () => {
    const res = await axios.get(`https://dummyjson.com/products?limit=0`);
    return res.data;
};

export const getProducts = async (page =1, limit = 10) => {
    const skip = (page - 1) * limit;
    const res = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    return res.data;
};
export const getProductById = async (id) => {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    return res.data;
};

export const searchProducts = async (query) => {
  const res = await axios.get(
    `https://dummyjson.com/products/search?q=${query}`
  );
  return res.data.products;
};