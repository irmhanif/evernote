import React, { useState } from 'react';
import BoxLabel from './BoxLabel';

function ScratchPad() {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };


    return (
        <div className="scratchPadContainer h-full">
            <BoxLabel title={'Scratch Pad'} />
            <textarea value={text} onChange={handleChange} placeholder="Start typing..." className="p-0 bg-transparent w-full h-4/5 resize-none border-none outline-none" />
        </div>
    );
}

export default ScratchPad;