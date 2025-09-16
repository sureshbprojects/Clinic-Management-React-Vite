import TextField from '@mui/material/TextField';
import { Controller } from "react-hook-form"

export default function MyMultipleLineField(props) {
    const { label, width, placeholder, name, control } = props
    console.log("hello",+label)
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState
            }) => (

                <TextField
                    sx={{ width: { width } }}
                    id="standard-multiline-static"
                    onChange={onChange}
                    value={value}
                    label={label}
                    multiline
                    rows={3}
                    variant="standard"
                    placeholder={placeholder}
                    error={!!error}
                    helperText={error?.message}
                />
            )}
        />

    );
}
