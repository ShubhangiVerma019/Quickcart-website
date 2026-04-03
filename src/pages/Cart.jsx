import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../store/cartSlice";
import { useCart } from "../hooks/useCart";
import { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const QtyControls = ({ item }) => (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        width: "fit-content",
      }}
    >
      <IconButton
        size="small"
        sx={{ borderRadius: 0, px: 1 }}
        //onClick={() => dispatch(decreaseQuantity(item.id))}
        onClick={() => decreaseQuantity(item.id)}
        disabled={(item.quantity || 1) === 1}
      >
        −
      </IconButton>
      <Typography
        variant="body2"
        fontWeight={500}
        sx={{ px: 1.5, userSelect: "none" }}
      >
        {item.quantity || 1}
      </Typography>
      <IconButton
        size="small"
        sx={{ borderRadius: 0, px: 1 }}
        //onClick={() => dispatch(increaseQuantity(item.id))}
        onClick={() => increaseQuantity(item.id)}
      >
        +
      </IconButton>
    </Box>
  );


function Cart() {
  //const cartItems = useSelector((state) => state.cart.items);
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
          const cartItems = cart.items || [];


  const total = useMemo(() => {
    return cart.items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return sum + price * quantity;
   }, 0);
  }, [cart.items]);

  const QtyControls = React.memo(({ item, onIncrease, onDecrease }) => {
  //console.log("Rendering QtyControls:", item.id);
  
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        width: "fit-content",
      }}
    >
      <IconButton
        size="small"
        sx={{ borderRadius: 0, px: 1 }}
        onClick={() => onDecrease(item.id)}
        disabled={(item.quantity || 1) === 1}
      >
        −
      </IconButton>

      <Typography
        variant="body2"
        fontWeight={500}
        sx={{ px: 1.5, userSelect: "none" }}
      >
        {item.quantity || 1}
      </Typography>

      <IconButton
        size="small"
        sx={{ borderRadius: 0, px: 1 }}
        onClick={() => onIncrease(item.id)}
      >
        +
      </IconButton>
    </Box>
  );
});
  
  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: { md: 900, lg: 1100 }, mx: "auto" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={500}>
          Your Cart
        </Typography>
        {cartItems.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => {
              if (window.confirm("Clear entire cart?")) {
                //dispatch(clearCart());
                clearCart();
              }
            }}
          >
            Clear Cart
          </Button>
        )}
      </Box>

      {/* Empty state */}
      {cartItems.length === 0 ? (
        <Typography color="text.secondary">Cart is empty</Typography>
      ) : (
        <>
          {/* ── DESKTOP: full-width table ── */}
          {isDesktop ? (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "grey.50" }}>
                    <TableCell sx={{ fontWeight: 600, width: 80 }}>Image</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: 110 }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: 160 }}>Quantity</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: 110 }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: 100 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.items.map((item) => (
                    <TableRow key={item.id} sx={{ "&:last-child td": { border: 0 } }}>
                      <TableCell>
                        <Box
                          component="img"
                          src={item.thumbnail}
                          alt={item.title}
                          sx={{
                            width: 64,
                            height: 64,
                            objectFit: "contain",
                            borderRadius: 1,
                            bgcolor: "grey.50",
                            p: 0.5,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500} sx={{ lineHeight: 1.4 }}>
                          {item.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          ₹ {Number(item.price).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <QtyControls item={item} 
                                      onIncrease={increaseQuantity}
                                      onDecrease={decreaseQuantity}/>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          ₹ {(item.price * (item.quantity || 1)).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          color="error"
                          size="small"
                          //onClick={() => dispatch(removeItem(item.id))}
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            /* ── MOBILE: card per item ── */
            <Stack spacing={1.5}>
              {cart.items.map((item) => (
                <Card key={item.id} variant="outlined">
                  <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                    <Box display="flex" gap={1.5} alignItems="flex-start">
                      <Box
                        component="img"
                        src={item.thumbnail}
                        alt={item.title}
                        sx={{
                          width: 64,
                          height: 64,
                          objectFit: "contain",
                          flexShrink: 0,
                          borderRadius: 1,
                          bgcolor: "grey.50",
                          p: 0.5,
                        }}
                      />
                      <Box flex={1} minWidth={0}>
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          sx={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineHeight: 1.4,
                            mb: 0.5,
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                          ₹ {Number(item.price).toFixed(2)} each
                        </Typography>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          flexWrap="wrap"
                          gap={1}
                        >
                          <QtyControls item={item} />
                          <Typography variant="body2" fontWeight={500}>
                            ₹ {(item.price * (item.quantity || 1)).toFixed(2)}
                          </Typography>
                          <Button
                            color="error"
                            size="small"
                            sx={{ minWidth: 0, px: 1 }}
                            //onClick={() => dispatch(removeItem(item.id))}
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}

          {/* Footer total */}
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "grey.50",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body1" color="text.secondary">
                Total
              </Typography>
              <Typography variant="h6" fontWeight={500}>
                ₹ {total.toFixed(2)}
              </Typography>
            </Box>
            </Box>

            {/* Checkout Button */}
            {cartItems.length > 0 && (
              <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                sx={{
                backgroundColor:"#8b6b3f",
                colo:"#fff",
                "&:hover":{
                    backgroundColor: "#6f532f",
                },
              }}
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </Button>
              </Box>
            )}
        </>
      )}
    </Box>
  );
}

export default Cart;