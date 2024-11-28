import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function ColorBox({ color, count, isSelected, onClick }) {
  // Create a theme with custom primary color
  const theme = createTheme({
    palette: {
      primary: {
        main: '#007FFF',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        onClick={(e) => {
          if (count === 0) return; // Agar count 0 bo'lsa, hech narsa qilmaydi
          e.stopPropagation();
          if (onClick) {
            onClick();
          }
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: count === 0 ? "not-allowed" : "pointer", // Disable holati uchun kursor o'zgartirish
          width: 40,
          height: 40,
          borderRadius: 1,
          bgcolor: color,
          border: isSelected 
            ? `1px solid red` 
            : `1px solid ${color}`,
          boxShadow: isSelected 
            ? '0 0 0 1px white, 0 0 0 1px red'
            : 'none',
          opacity: count === 0 ? 0.5 : 1, // Disable holati uchun ko'rinishni pasaytirish
          pointerEvents: count === 0 ? 'none' : 'auto', // Disable holati uchun klikni bloklash
          transition: 'all 0.2s ease',
          '&:hover': {
            opacity: count === 0 ? 0.5 : 0.8, // Hover effekti faqat aktiv bo'lganda ishlaydi
            transform: count === 0 ? 'none' : 'scale(1.05)', // Hover effekti faqat aktiv bo'lganda ishlaydi
          },
        }}
      >
        <p style={{
          color: "#fff", 
          margin: 0, 
          fontWeight: 'bold',
          fontSize: '0.8rem'
        }}>
          {count}
        </p>
      </Box>
    </ThemeProvider>
  );
}
