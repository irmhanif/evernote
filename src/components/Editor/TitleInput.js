import React from 'react';
import TextField from '@material-ui/core/TextField';

const TitleInput = (props) => {
    const { value, handleChange } = props;
    return (
        <TextField
            variant="standard"
            className='titleInput'
            InputProps={{
                disableUnderline: true
            }}
            placeholder='Title'
            value={value}
            onChange={(e) => {
                handleChange(e.target.value);
            }}
        />
    );
};

export default TitleInput;
