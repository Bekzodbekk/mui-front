import * as React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, Container, CircularProgress } from '@mui/material';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ColorBox from "../../UI/ColorBox/ColorBox";
import ModalWindow from '../SellModalWindow/SellModalWindow';

// Helper function to format price
const formatPrice = (price) => {
  const [integerPart] = String(price).split('.');
  return `${Number(integerPart).toLocaleString()} so'm`;
};

export default function ProductDashboardCard() {
  const [openModalWindow, setOpenModalWindow] = useState(false);
  const { id } = useParams();
  const [dataApi, setDataApi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProductColor, setSelectedProductColor] = useState(null);
  const [socket, setSocket] = useState(null);
  
  // Ref to track if default color has been set
  const defaultColorSet = useRef(false);

  const connectWebSocket = useCallback(() => {
    const newSocket = new WebSocket(`wss://localhost:9000/products/${id}/ws`);

    newSocket.onopen = () => {
      console.log('WebSocket connection established');
      setIsLoading(true);
    };

    newSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setDataApi(data);

        // Set default color only if it hasn't been set before
        if (data && data.product && data.product.colors && !defaultColorSet.current) {
          const colors = Object.entries(data.product.colors);
          const defaultColor = colors.find(([color, count]) => count > 0)?.[0];
          if (defaultColor) {
            setSelectedProductColor(defaultColor);
            defaultColorSet.current = true;
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error parsing WebSocket message: ", err);
        setIsLoading(false);
      }
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error: ", error);
      setIsLoading(false);
    };

    newSocket.onclose = (event) => {
      console.log('WebSocket connection closed', event);
      setSocket(null);
      setIsLoading(false);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [id]);

  useEffect(() => {
    const cleanup = connectWebSocket();

    return () => {
      cleanup();
    };
  }, [connectWebSocket]);

  // Loading state
  if (isLoading) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  // No data state
  if (!dataApi) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h6" color="error">
          Ma'lumotlar topilmadi
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card sx={{
        width: '90%',
        maxWidth: 500,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        boxShadow: 6,
      }}>
        {/* Image Section */}
        <CardMedia
          component="img"
          alt="Product Image"
          sx={{
            width: '100%',
            height: 250,
            objectFit: 'cover',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16
          }}
          image={dataApi.image || require("../../../Assets/image.png")}
        />

        {/* Content Section */}
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 4
        }}>
          <Box>
            <Typography gutterBottom variant="h4" component="div" sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 1
            }}>
              {dataApi.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Uniq Number:</strong> {dataApi.product.unique_number}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Size:</strong> {dataApi.product.size}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Price:</strong> {formatPrice(dataApi.product.price)}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Count:</strong> {dataApi.product.count}
            </Typography>
            
            {/* Color Selection Section */}
            {dataApi.product.colors && Object.keys(dataApi.product.colors).length > 0 && (
              <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                mt: 2,
                alignItems: "center"
              }}>
                {Object.keys(dataApi.product.colors).map((color) => (
                  <ColorBox
                    key={color}
                    color={color}
                    count={dataApi.product.colors[color]}
                    isSelected={selectedProductColor === color}
                    onClick={() => {
                      setSelectedProductColor(color)
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </CardContent>

        {/* Action Buttons */}
        <CardActions sx={{
          justifyContent: 'space-between',
          p: 3,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Button 
            sx={{width: "100%"}} 
            size="medium" 
            variant="outlined" 
            color="error"
            onClick={() => setOpenModalWindow(true)}
          >
            Sell
          </Button>
          <Button sx={{width: "100%"}} size="medium" variant="outlined" color="secondary">
            New Debt
          </Button>
          <Button sx={{width: "100%"}} size="medium" variant="outlined" color="primary">
            Add Product
          </Button>
        </CardActions>

        {/* Modal Window */}
        <ModalWindow 
          open={openModalWindow}
          handleClose={() => setOpenModalWindow(false)}
          price={dataApi.product.price}
          color={selectedProductColor}
          id={dataApi.product.id}
        />
      </Card>
    </Container>
  );
}