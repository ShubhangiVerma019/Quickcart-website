import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {getProductById} from "../api/productApi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//import { useDispatch } from "react-redux";
//import { addItem } from "../store/cartSlice";
import Button from "@mui/material/Button";
//import { useSelector } from "react-redux";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function ProductDetails(){
    //const dispatch = useDispatch();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const {id} = useParams();
    const [product, setProduct] = useState(null);

    

    //const cart = useSelector((state) => state.cart.items);
    //console.log(cart);
    useEffect(() => {
        getProductById(id).then((data) =>{
            setProduct(data);
        });
    },[id]);
    if(!product) return <h2>Loading...</h2>;

    const handleAddToCart = () => {
    if (!user) {
        navigate("/login");
        return;
    }

    addToCart(product);
    navigate("/cart");
    };

     return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-start" },
        gap: 6,
        p: { xs: 3, md: 6 },
        maxWidth: 1000,
        mx: "auto",
        mt: 4,
      }}
    >
      {/* Left: Product Image */}
      <Box
        sx={{
          flex: "0 0 auto",
          width: { xs: "100%", md: 380 },
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          p: 4,
          minHeight: 380,
          boxShadow: "0px 8px 30px rgba(0,0,0,0.50)",
        }}
      >
        <Box
          component="img"
          src={product.thumbnail}
          alt={product.title}
          sx={{
            width: "100%",
            maxWidth: 280,
            objectFit: "contain",
          }}
        />
      </Box>
 
      {/* Right: Product Details */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: { md: 1 },
        }}
      >
        <Typography variant="h5" fontWeight={700} color="text.primary">
          {product.title}
        </Typography>
 
        <Typography variant="h6" fontWeight={700} color="text.primary">
          Price: Rs {product.price}
        </Typography>
 
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {product.description}
        </Typography>
 
        <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
          <Button
            variant="contained"
            //onClick={() => dispatch(addItem(product))}
            onClick={handleAddToCart}
            sx={{
              backgroundColor: "#846d46",
              color: "#fff",
              px: 4,
              py: 1.2,
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 1,
              "&:hover": { backgroundColor: "#333148" },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
 
export default ProductDetails;