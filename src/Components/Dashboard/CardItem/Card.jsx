import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard({title, price_or_count, additional}) {
  return (
    <Card className='card' sx={{"width": "300px"}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            {price_or_count} {additional}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
