import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

export default function ColorBox({color}) {
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#007FFF',
          },
        },
      }}
    >
      <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            cursor: "pointer",
          width: 40,
          height: 40,
          borderRadius: 1,
          bgcolor: color,
        }}
      >
        <p style={{color: "#fff"}}>5</p>
      </Box>
    </ThemeProvider>
  );
}
