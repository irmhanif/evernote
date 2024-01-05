import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const TitleInput = (props) => {
    const { value, handleChange } = props;
    const [inputValue, setInputValue] = useState(value)

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
        handleChange(e.target.value)
    }
    return (
        <TextField
            variant="standard"
            className='titleInput'
            InputProps={{
                disableUnderline: true
            }}
            placeholder='Title'
            value={inputValue}
            onChange={handleInputChange}
        />
    );
};

export default TitleInput;
