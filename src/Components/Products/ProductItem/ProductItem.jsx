import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';

export default function ActionAreaCard() {
  return (
    <Card sx={{ width: "100%" }}>
      <CardActionArea>
        <Box sx={{ display: "flex", alignItems: "center", gap: "50px" }}>
          <CardMedia
            component="img"
            sx={{ width: "25%", height: "100%", borderRadius: "5px" }}
            image={require("../../../Assets/image.png")}
            alt="green iguana"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              Cantlor
            </Typography>
            {/* O'lcham va narx uchun alohida Typography komponentlari */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6" component="div" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                Razmer: L
              </Typography>
              <Typography variant="h6" component="div" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                Narxi: 120.000
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}