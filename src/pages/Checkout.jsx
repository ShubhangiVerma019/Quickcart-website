import React from "react";
import { useSelector } from "react-redux";
import {Box, Typography, Grid, Card, CardContent, TextField, Button} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = React.useState("cod");
  const cartItems = useSelector((state) => state.cart.items);
  const {
    register,
    handleSubmit, formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
  const order = {
    id: Date.now(),
    items: cartItems,
    address: data,
    total: cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
  };

  console.log("Order:", order);

  //store in localStorage
  const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
  localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));

  // Clear cart
  dispatch(clearCart());

  // Show success
  alert(`Order placed successfully using ${paymentMethod.toUpperCase()} !!`);

  // Redirect
  navigate("/");

};
  return (
    <Box sx={{ p: 3, maxWidth: 1100, mx: "auto" }}>
      <Typography variant="h5" mb={2}>
        Checkout
      </Typography>

      <Grid container spacing={2}>
        
        {/* Left Side - Address Form (we'll build next) */}
        <Grid item xs={12} md={7}>
  <Card>
    <CardContent>
      <Typography variant="h6" mb={2}>
        Shipping Address
      </Typography>

      <Box
  component="form"
  onSubmit= {handleSubmit(onSubmit)}
>
  <Grid container spacing={2}>
    
    {/* Full Name */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Full Name"
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
    </Grid>

    {/* Address */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Address"
        {...register("address", { required: "Address is required" })}
        error={!!errors.address}
        helperText={errors.address?.message}
      />
    </Grid>

    {/* City */}
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="City"
        {...register("city", { required: "City is required" })}
        error={!!errors.city}
        helperText={errors.city?.message}
      />
    </Grid>

    {/* Pincode */}
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Pincode"
        {...register("pincode", {
          required: "Pincode is required",
          pattern: {
            value: /^[0-9]{6}$/,
            message: "Enter valid 6-digit pincode",
          },
        })}
        error={!!errors.pincode}
        helperText={errors.pincode?.message}
      />
    </Grid>

    {/* Phone */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Phone"
        {...register("phone", {
          required: "Phone is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Enter valid 10-digit number",
          },
        })}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
    </Grid>

  </Grid>

  <Typography variant="subtitle1" mt={2}>
  Payment Method
</Typography>

<Box mt={1}>
  <Button
    variant={paymentMethod === "cod" ? "contained" : "outlined"}
    onClick={() => setPaymentMethod("cod")}
    sx={{ mr: 1 }}
  >
    Cash on Delivery
  </Button>

  <Button
    variant={paymentMethod === "card" ? "contained" : "outlined"}
    onClick={() => setPaymentMethod("card")}
  >
    Card (Mock)
  </Button>
</Box>

  {/* Button */}
  <Button
    type="submit"
    variant="contained"
    fullWidth
    sx={{
      mt: 2,
      backgroundColor: "#8b6b3f",
      "&:hover": { backgroundColor: "#6f532f" },
    }}
  >
    Place Order
  </Button>
</Box>
    </CardContent>
  </Card>
</Grid>

        {/* Right Side - Order Summary */}
        <Grid item xs={12} md={5}>
  <Card>
    <CardContent>
      <Typography variant="h6" mb={2}>
        Order Summary
      </Typography>

      {cartItems.map((item) => (
        <Box
          key={item.id}
          display="flex"
          justifyContent="space-between"
          mb={1}
        >
          <Typography variant="body2">
            {item.title} x {item.quantity}
          </Typography>
          <Typography variant="body2">
            ₹ {(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Box>
      ))}

      <Box
        mt={2}
        pt={2}
        borderTop="1px solid #ddd"
        display="flex"
        justifyContent="space-between"
      >
        <Typography fontWeight={500}>Total</Typography>
        <Typography fontWeight={500}>
          ₹{" "}
          {cartItems
            .reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )
            .toFixed(2)}
        </Typography>
      </Box>
    </CardContent>
  </Card>
</Grid>

      </Grid>
    </Box>
  );
}

export default Checkout;