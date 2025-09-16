import * as React from 'react';
import '../../App.css'
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';

export default function MyTextField(props) {
  const {label, name, control} = props
  console.log("hello 123",+name)
  return (

     <Controller
        name = {name}
        control = {control}
        render = {({
            field:{onChange, value}, 
            fieldState : {error},
            formState,
        }) =>(

          <TextField 
          onChange = {onChange}
          value = {value|| ''}
          label= {label}
          variant="outlined" 
          className={"myForm"}
          error = {!!error}
          helperText = {error?.message}
           />
          
        )
      }
     
     />

  );
}