import React, { useEffect, useRef, useState } from 'react';
import Sort from '../components/Sort';
import { GrDocumentNotes } from "react-icons/gr";
import { TbFilterSearch } from "react-icons/tb";
import { BsSortUp } from "react-icons/bs";
import { detectMobile } from '../helpers';
import createNotes from '../assets/createNotesF.jpg'
import { dummyNotes } from '../mockData/data';
import NotesList from '../components/Notes';
import RichEditor from '../components/Editor';


const Notes = () => {
    const [showSort, setShowSort] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [notes, setNotes] = useState([]);
    const [showEditor, setShowEditor] = useState(false)

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


    const isMobile = detectMobile()

    const createNote = () => {
        setNotes(dummyNotes)
        setShowEditor(true)
    }

    const renderListSections = () => {
        return (
            <div className='notesListContainer'  >
                {notes.length === 0 ?
                    <div className='emptyNotes'>
                        <div className='mt-3 createNoteImgContainer'>
                            <img src={createNotes} alt='create notes' className='createNoteImg' />
                            <p>Create your first note
                                Click the <span className='text-blue-500 underline' onClick={createNote}>+ New Note</span> button in the sidebar to get started.
                            </p>
                        </div>
                    </div>

                    : <>
                        <NotesList notes={notes} />
                    </>
                }


            </div >
        )
    }

    return (
        <div ref={notesRef} className={isMobile ? 'mobileNotes' : 'flex'}>
            {((isMobile && !showEditor) || (!isMobile)) &&
                <div className='notesSidebar' style={{ width: isMobile ? '100%' : '20%' }}>
                    <div className='p-2 notesHeader' >
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
                    {
                        renderListSections()
                    }
                </div>
            }
            {showEditor && <div style={{ width: isMobile ? '100%' : '80%' }} className=''>
                <div className='notesContent'>
                    <RichEditor />
                </div>
            </div>}

        </div>
    );
};

export default Notes;
