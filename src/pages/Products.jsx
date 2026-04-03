import { useEffect, useState } from "react";
import { searchProducts  } from "../api/productApi";
import { getProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import { useSearchParams } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 10;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: (theme.vars ?? theme).palette.text.secondary,
  }));


  useEffect(() => {
    
    if (search.trim() !== "") {
        const timer = setTimeout(() => {
            setLoading(true);
        //search
      searchProducts(search)
        .then((data) => {
            setProducts(data || []);
            setTotal(data?.length || 0);
            //console.log("Products:", data);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }, 500);
    return () => clearTimeout(timer);
    } else {
        setLoading(true);
      // fallback-load all products, pagination done
      getProducts(page, limit)
        .then((data) => {
            setProducts(data.products || []);
            setTotal(data.total || 0);
            //console.log("Products:", data);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [search, page]);
//console.log("fetching page:",page);

const  SkeletonCard = () => {
    return (
        <Box sx={{backgroundColor:"#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                   p:2}}>
            {/* Image */}        
            <Skeleton variant="rectangular" height={180} animation="wave" sx={{borderRadius: "4px"}}/>
            {/* Title */}
            <Skeleton variant="text" 
                      sx={{mt:1}}
                      height={30}
                      animation="wave"/>
            {/* Price */}
            <Skeleton variant="text" width="40%" height={25} animation="wave"/>
            {/* Button */}
            <Skeleton variant="rectangular" height={36} width="50%" sx={{mt:1, borderRadius:"6px"}} animation="wave"/>
        </Box>
    );
};

  return (
    <div>
      <h2>Products</h2>
      <TextField
  label="Search products"
  variant="outlined"
  fullWidth
  value={search}
  onChange={(e) => {
    const value = e.target.value;
    setSearchParams(
        value ? {search: value} : {}
    );
    setPage(1);}}
  sx={{ mb: 2 }}
/>
      <Box sx={{ padding: "16px" }}>
        {loading ? (
           <Grid container spacing={2}>
            {Array.from(new Array(10)).map((_, index) => (
                <Grid size={{ xs: 6, sm: 6, md: 4 }} key={index}>
                    <SkeletonCard/>
                </Grid>
            ))}
            </Grid>
        ) : (
        <>
        <Grid container spacing={2}>
          {products?.map((product) => (
            <Grid size={{ xs: 6, sm:6, md: 4 }} key={product.id}>
                <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <Pagination
        count={Math.ceil(total / limit)}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ display: "flex", justifyContent: "center", mt: 3 }}
        />
        </>
        )}
      </Box>
    </div>
  );
}
export default Products;
