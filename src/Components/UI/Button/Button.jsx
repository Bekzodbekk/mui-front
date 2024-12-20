import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function ButtonUI({ content, onClick, disabled }) {
  return (
    <Box >
      <div>
        <Button 
          variant="contained" 
          size="large"
          onClick={onClick}
          disabled={disabled}
        >
          {content}
        </Button>
      </div>
    </Box>
  );
}