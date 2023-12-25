import React, { useState } from 'react';
import { BiSort } from 'react-icons/bi'; // Import the sorting icon from a library
import Sort from '../components/Sort';

const Notes = () => {
    const [showSort, setShowSort] = useState(false);

    const handleSortClick = () => {
        setShowSort(!showSort);
    };

    return (
        <div>
            <h1>Notes</h1>
            <p>Count of notes: 3</p>

            <div className='flex justify-between items-center'>
                <BiSort onClick={handleSortClick} />
                {showSort && <Sort />}
            </div>

            <div>
                <label htmlFor="filter">Filter:</label>
                <input type="text" id="filter" />
            </div>
            <div style={{ width: '30%' }}>
                <ul>
                    <li>Note 1</li>
                    <li>Note 2</li>
                    <li>Note 3</li>
                </ul>
            </div>
            <div style={{ width: '70%' }}></div>
        </div>
    );
};

export default Notes;
