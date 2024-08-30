import React, { useEffect, useState } from 'react';
import { Input } from "antd";

const TitleInput = (props) => {
    const { value, handleChange } = props;
    const [inputValue, setInputValue] = useState(value)

    useEffect(() => {
        setInputValue(value)
    }, [value])

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
        handleChange(e.target.value)
    }
    return (
        <Input
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
