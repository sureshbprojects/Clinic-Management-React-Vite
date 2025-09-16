// components/DateTimePickerField.jsx
import * as React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function DateTimePickerField(props) {
  const { label, width, name, control } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          // Ensure the value is a dayjs object
          const value = field.value ? dayjs(field.value) : null;
          
          return (
            <DateTimePicker
              {...field}
              label={label}
              value={value}
              onChange={(date) => {
                // Convert to UTC when saving
                const utcDate = date ? date.utc() : null;
                field.onChange(utcDate);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth={width === '100%'}
                  style={{ width: width !== '100%' ? width : undefined }}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
}
