import * as React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, Grid, Container } from '@mui/material';
import ColorBox from '../../UI/ColorBox/ColorBox';

export default function ProductDashboardCard() {
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
        maxWidth: 500, // Kenglikni qisqartirdik
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        boxShadow: 6,
      }}>
        {/* Image Section - Yuqorida va to'liq kenglikda */}
        <CardMedia
          component="img"
          alt="Product Image"
          sx={{
            width: '100%',
            height: 250, // Balandlikni belgilang
            objectFit: 'cover',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16
          }}
          image={require("../../../Assets/image.png")}
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
              Cantlor
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Uniq Number:</strong> 123-2
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Size:</strong> L
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Price:</strong> 130.000 so'm
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Count:</strong> 10
            </Typography>
            <Box sx={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: "15px",
              mt: 1
            }}>
              <ColorBox color={"red"}/>
              <ColorBox color={"blue"}/>
              <ColorBox color={"green"}/>
              <ColorBox color={"yellow"}/>
              <ColorBox color={"purple"}/>
            </Box>
          </Box>
        </CardContent>

        {/* Action Buttons */}
        <CardActions sx={{
          justifyContent: 'space-between',
          p: 3,
          borderTop: '1px solid',
          borderColor: 'divider'
        }}>
          <Button size="medium" variant="contained" color="primary">
            Details
          </Button>
          <Button size="medium" variant="outlined" color="secondary">
            Edit
          </Button>
          <Button size="medium" variant="outlined" color="error">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}