import React from 'react'
import TextField from '@mui/material/TextField';

export default function InputField(props) {
    const { id, label, name, autoComplete, handleChange, value, fullWidth, autoFocus, error, onBlur } = props
    return (
        <TextField
            error={error}
            margin="normal"
            fullWidth={fullWidth}
            id={id}
            label={label}
            name={name}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            onBlur={onBlur}
            onChange={(e) => {
                handleChange(e.target.value, id)
            }}
            value={value}
        />
    )
}
