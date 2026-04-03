import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper } from "@mui/material";
import ProductCard from "../components/ProductCard";
import heroBg from "../assets/hero.jpg";
import { useProducts } from "../hooks/useProducts";
function Home() {
  const { products, loading, error } = useProducts();
  //const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("all");
//console.log(products);
console.log(products?.map(p => p.category));
  // useEffect(() => {
  //   axios.get("https://fakestoreapi.com/products").then((res) => {
  //     setProducts(res.data);
  //     setFilteredProducts(res.data);
  //   });
  // }, []);

  useEffect(() => {
  if (products.length > 0) {
    setFilteredProducts(products);
  }
}, [products]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (cat === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((item) => item.category.toLowerCase() === cat.toLowerCase())
      );
    }
    // Scroll to products section smoothly
    document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const categories = [
    { label: "All", value: "all" },
    { label: "Beauty", value: "beauty" },
    { label: "Fragrances", value: "fragrances" },
    { label: "Furniture", value: "furniture" },
    { label: "Groceries", value: "groceries" },
  ];

  return (
    <Box>
      {/* HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          pb: 8,
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.52)",
          },
        }}
      >
        {/* Hero Text */}
        <Box sx={{ position: "relative", zIndex: 1, textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              fontWeight: 700,
              letterSpacing: "0.03em",
              mb: 1,
            }}
          >
            QuickCart
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "rgba(255,255,255,0.75)", fontWeight: 300, letterSpacing: "0.08em" }}
          >
            Shop the latest. Fast. Simple. Yours.
          </Typography>
        </Box>

        {/* Categories — pinned to bottom of hero */}
        <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Typography
            variant="overline"
            sx={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.2em", display: "block", mb: 2 }}
          >
            Browse Categories
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
            {categories.map((cat) => (
              <Paper
                key={cat.value}
                elevation={0}
                onClick={() => handleCategoryChange(cat.value)}
                sx={{
                  padding: "10px 24px",
                  cursor: "pointer",
                  borderRadius: "50px",
                  transition: "all 0.25s ease",
                  backgroundColor:
                    category === cat.value ? "#846d46" : "rgba(255,255,255,0.12)",
                  color: "#fff",
                  backdropFilter: "blur(8px)",
                  border: category === cat.value
                    ? "1.5px solid #bc985a"
                    : "1.5px solid rgba(255,255,255,0.3)",
                  fontWeight: category === cat.value ? 600 : 400,
                  fontSize: "0.875rem",
                  "&:hover": {
                    backgroundColor:
                      category === cat.value ? "#825f22" : "rgba(255,255,255,0.22)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {cat.label}
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>

      {/* PRODUCTS SECTION */}
      <Box id="products-section" sx={{ px: { xs: 2, md: 5 }, py: 6, backgroundColor: "#f9f9f9",
        "& .MuiCardActions-root": { pt: 1, pb: 1.5, px: 2 },
        "& .MuiCardActions-root .MuiButton-root": { py: 0.5, px: 1.5, fontSize: "0.75rem", textTransform: "none" },
      }}>
        <Typography
          variant="h5"
          textAlign="center"
          mb={4}
          sx={{ fontWeight: 600, color: "#222" }}
        >
          Latest Products
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: { xs: "12px", md: "24px" },
            padding: "0",
          }}
        >
          {filteredProducts.map((item) => (
            <Box
              key={item.id}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <ProductCard product={item} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;