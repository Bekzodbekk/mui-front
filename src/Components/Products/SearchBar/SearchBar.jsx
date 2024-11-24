import React from 'react';
import { TextField, InputAdornment, Button } from '@mui/material';

const SearchBar = ({ onOpenModal }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search Bags"
      sx={{ padding: '10px' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="contained"
              color="primary"
              onClick={onOpenModal} // Modalni ochuvchi callback
            >
              Add Product
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
