import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../store/cartSlice";
import { useCallback } from "react";

export const useCart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCart = useCallback((item) => {
    dispatch(addItem(item));
  }, [dispatch]);

  const removeFromCart = useCallback((id) => {
    dispatch(removeItem(id));
  }, [dispatch]);

  const increaseQuantityHandler = useCallback((id) => {
    dispatch(increaseQuantity(id));
  }, [dispatch]);

  const decreaseQuantityHandler = useCallback((id) => {
    dispatch(decreaseQuantity(id));
  }, [dispatch]);

  const clearCartHandler = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity:increaseQuantityHandler,
    decreaseQuantity:decreaseQuantityHandler,
    clearCart: clearCartHandler,
  };
};