import React from 'react'
import TextField from '@mui/material/TextField';

export default function InputField(props) {
    const { id, label, name, autoComplete, handleChange, required, fullWidth, autoFocus, error } = props
    return (
        <TextField
            error={error}
            margin="normal"
            required={required}
            fullWidth={fullWidth}
            id={id}
            label={label}
            name={name}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            onChange={(e) => {
                handleChange(e.target.value, id)
            }}
        />
    )
}
