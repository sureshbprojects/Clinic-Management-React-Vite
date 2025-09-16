import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from "react-hook-form"
import FormHelperText from '@mui/material/FormHelperText';

export default function MySelectFields(props) {

  const { label, width, name, control, options, onChange } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange: fieldOnChange, value },
        fieldState: { error },
        formState,
      }) => (
        <FormControl variant="standard" sx={{ width: { width } }}>
          <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={value || ''}
            error={!!error}
            onChange={(e) => {
              const selectedValue = e.target.value;
              // Update form state
              fieldOnChange(selectedValue);
              // Call custom onChange handler if provided
              if (onChange) {
                onChange(selectedValue);
              }
            }}
          >
            {Array.isArray(options) ? (
              options.map((option) => (
                <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
              ))
            ) : (
              <option disabled value="">
                No options available
              </option>
            )}

          </Select>

          <FormHelperText sx={{ color: "#d32f2f" }}>{error?.message}</FormHelperText>

        </FormControl>
      )}
    />
  );
}
