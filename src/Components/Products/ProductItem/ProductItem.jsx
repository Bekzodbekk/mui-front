import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ id ,image_url, name, size, price, unique_number, colors, count }) => {
  // Placeholder rasm URL-i
  const placeholderImage = "https://placehold.co/200x200";
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/product/${id}`)
  }
  
  return (
    <Card sx={{ width: "100%", mb: 2 }} >
      <CardActionArea onClick={handleNavigate}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "50px" }}>
          <CardMedia
            component="img"
            sx={{
              marginLeft: "20px",
              width: "200px",
              height: "200px",
              borderRadius: "5px",
              objectFit: "cover"
            }}
            image={image_url || placeholderImage}
            alt={name}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = placeholderImage;
            }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6" component="div" sx={{ fontSize: '15px' }}>
                Code: {unique_number}
              </Typography>
              <Typography variant="h6" component="div" sx={{ fontSize: '15px' }}>
                Razmer: {size}
              </Typography>
              <Typography variant="h6" component="div" sx={{ fontSize: '15px' }}>
                Narxi: {price.toLocaleString()} so'm
              </Typography>
              <Typography variant="h6" component="div" sx={{ fontSize: '15px' }}>
                Soni: {count}
              </Typography>
              {colors && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" component="div" sx={{ fontSize: '15px' }}>
                    Ranglar:
                  </Typography>
                  {Object.entries(colors).map(([color, quantity]) => (
                    <Box
                      key={color}
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: color,
                        border: '1px solid #ddd',
                        borderRadius: '50%'
                      }}
                      title={`${quantity} dona`}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ProductItem;