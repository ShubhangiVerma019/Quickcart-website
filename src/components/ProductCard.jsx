import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import {useNavigate} from "react-router-dom";
function ProductCard({product}){
    const navigate = useNavigate();
    return(
        <Card sx={{
            height:"100%",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-between",
            width:"100%"
        }}>
            
            <CardMedia component="img"
            image={product.thumbnail}
            alt={product.title}
            sx={{height:200, objectFit: "contain", backgroundColor:"#f5f5f5", padding:"10px"}}/>

            
            <CardContent sx={{flexGrow:1}}>
                <Typography variant="body1"
                sx={{fontSize:"14px",
                    height:"40px",
                    overflow:"hidden"
                }}>
                    {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Rs{product.price}
                </Typography>
            </CardContent>

            
            <CardActions>
                <Button size="small" variant="contained" onClick={() => navigate(`/product/${product.id}`)}
                    sx={{ backgroundColor: "#846d46" }}>
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
}
export default React.memo(ProductCard);