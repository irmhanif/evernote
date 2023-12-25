import React, { useEffect, useRef, useState } from 'react';
import Sort from '../components/Sort';
import { GrDocumentNotes } from "react-icons/gr";
import { TbFilterSearch } from "react-icons/tb";
import { BsSortUp } from "react-icons/bs";
import { detectMobile } from '../helpers';


const Notes = () => {
    const [showSort, setShowSort] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const notesRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (notesRef.current && !notesRef.current.contains(event.target)) {
                setShowSort(false);
                setShowFilter(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleSortClick = (event) => {
        event.stopPropagation();
        setShowSort(!showSort);
    };
    const handleFilterClick = (event) => {
        event.stopPropagation();
        setShowFilter(!showFilter);
    };

    const [notes] = useState([]);

    const isMobile = detectMobile()

    return (
        <div ref={notesRef}>
            <div className='p-2' style={{ width: isMobile ? '100%' : '30%' }}>
                <div>
                    <h2><GrDocumentNotes /> Notes</h2>
                </div>
                <div className='flex justify-between items-center'>
                    <p className="m-0">{notes.length} note{notes.length !== 1 && 's'}</p>
                    <div className='flex justify-between items-center w-14'>
                        <div>
                            <BsSortUp onClick={handleSortClick} className='w-6 h-6' />
                            {showSort && <Sort />}
                        </div>
                        <div>
                            <TbFilterSearch onClick={handleFilterClick} className='w-6 h-6' />
                            {showFilter && <Sort />}
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-t border-solid border-gray-500' style={{ borderRight: 0, borderLeft: 0, borderBottom: 0 }}>
                <ul>
                    <li>Note 1</li>
                    <li>Note 2</li>
                    <li>Note 3</li>
                </ul>
            </div >
            <div style={{ width: isMobile ? '0' : '70%' }}></div>
        </div>
    );
};

export default Notes;
