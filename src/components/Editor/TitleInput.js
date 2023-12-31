import React from 'react';
import TextField from '@material-ui/core/TextField';

const TitleInput = () => {
    return (
        <TextField
            variant="standard"
            className='titleInput'
            InputProps={{
                disableUnderline: true
            }}
            placeholder='Title'
        />
    );
};

export default TitleInput;
