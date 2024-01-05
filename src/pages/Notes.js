import React, { useRef, useState, useReducer } from 'react';
import { GrDocumentNotes } from "react-icons/gr";
import { detectMobile, generateBasicNote } from '../helpers';
import createNotes from '../assets/createNotesF.jpg'
import NotesList from '../components/Notes';
import RichEditor from '../components/Editor';

const initialState = JSON.parse(sessionStorage.getItem('notes')) || [];

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            const newNote = generateBasicNote();
            sessionStorage.setItem('notes', JSON.stringify([...state, newNote]));
            return [...state, newNote];
        case 'UPDATE_NOTE':
            const updatedNotes = state.map((note) => {
                if (note.id === action.payload.id) {
                    return {
                        ...note,
                        ...action.payload.updatedNote,
                    };
                }
                return note;
            });
            sessionStorage.setItem('notes', JSON.stringify(updatedNotes));
            return updatedNotes;
        case 'DELETE_NOTE':
            const filteredNotes = state.filter((note) => note.id !== action.payload.id);
            sessionStorage.setItem('notes', JSON.stringify(filteredNotes));
            return filteredNotes;
        default:
            return state;
    }
};
const Notes = () => {
    const [showEditor, setShowEditor] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [notes, dispatch] = useReducer(reducer, initialState, () => {
        const sessionState = sessionStorage.getItem('notes');
        if (sessionState) {
            return JSON.parse(sessionState);
        }
        return initialState;
    });
    const notesRef = useRef(null);


    const isMobile = detectMobile();

    const createNote = () => {
        dispatch({ type: 'ADD_NOTE' });
        setShowEditor(true);
    };

    const handleClose = () => {
        setShowEditor(false);
    };

    const handleRowClick = (row) => {
        console.log('rowClick', row.title)
        setShowEditor(true);

        setCurrentNote(row);

    }

    const renderListSections = () => {
        return (
            <div className='notesListContainer'>
                {notes.length === 0 ? (
                    <div className='emptyNotes'>
                        <div className='mt-3 createNoteImgContainer'>
                            <img src={createNotes} alt='create notes' className='createNoteImg' />
                            <p>
                                Create your first note. Click the{' '}
                                <span className='text-blue-500 underline' onClick={createNote}>
                                    + New Note
                                </span>{' '}
                                button in the sidebar to get started.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <NotesList notes={notes} onRowClick={handleRowClick} />
                    </>
                )}
            </div>
        );
    };

    const handleTitleChange = (value) => {
        dispatch({ type: 'UPDATE_NOTE', payload: { id: currentNote.id, updatedNote: { title: value } } });

    }

    return (
        <div ref={notesRef} className={isMobile ? 'mobileNotes' : 'flex'}>
            {((isMobile && !showEditor) || !isMobile) && (
                <div className='notesSidebar' style={{ width: isMobile ? '100%' : '20%' }}>
                    <div className='p-2 notesHeader'>
                        <div>
                            <h2>
                                <GrDocumentNotes /> Notes
                            </h2>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='m-0'>
                                {notes.length} note{notes.length !== 1 && 's'}
                            </p>
                        </div>
                    </div>
                    {
                        renderListSections()
                    }
                </div>
            )}
            {showEditor && <div style={{ width: isMobile ? '100%' : '80%' }} className=''>
                <div className='notesContent'>
                    <RichEditor handleCloseBtn={handleClose} data={currentNote} handleTitleChange={handleTitleChange} />
                </div>
            </div>}
        </div>
    );
};

export default Notes;