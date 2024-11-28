import React, { useState } from 'react';
import { TextField, InputAdornment, Button } from '@mui/material';

const SearchBar = ({ onSearch, onOpenModal, title }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search Bags"
      value={searchValue}
      onChange={handleSearch}
      sx={{ padding: '10px 0px' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="contained"
              color="primary"
              onClick={onOpenModal}
            >
              {title}
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;