import * as React from 'react';
import '../../App.css'
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';

export default function MyLabelField(props) {
  const {label, name, width, control} = props
  console.log("Label field:", name)
  
  return (
     <Controller
        name = {name}
        control = {control}
        defaultValue = {''}
        render = {({
            field:{onChange, value}, 
            fieldState : {error},
            formState,
        }) =>(
          <TextField 
          sx={{ width: { width } }}
          onChange = {onChange}
          value = {value}
          label= {label}
          variant="outlined" 
          className={"myForm"}
          error = {!!error}
          helperText = {error?.message}
          disabled={true}  // This makes the field non-editable
          InputProps={{
            readOnly: true,
            style: {
              cursor: 'not-allowed',
              backgroundColor: '#f5f5f5',
              color: '#333'
            }
          }}
           />
        )}
      />
  );
}
