import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Selector({ title, menuItems, value, onChange, error = false }) {
  const handleChange = (event) => {
    // Call the parent's onChange handler with the new value
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth error={error}>
        <InputLabel>{title}</InputLabel>
        <Select
          value={value}
          label={title}
          onChange={handleChange}
        >
          {menuItems.map((elem, idx) => (
            <MenuItem key={idx} value={elem}>
              {elem}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}