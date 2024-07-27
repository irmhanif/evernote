import React, { useRef, useState, useReducer, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { GrDocumentNotes } from "react-icons/gr";
import { createNote, deepCopy, detectMobile, generateBasicNote, getUserData } from '../helpers';
import createNotes from '../assets/createNotesF.jpg'
import NotesList from '../components/Notes';
import RichEditor from '../components/Editor';
import moment from 'moment';

const initialState = [];
// () => {
//     const sessionState = sessionStorage.getItem('notes');
//     if (sessionState) {
//         return JSON.parse(sessionState);
//     }
//     return initialState;
// }

const notesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            const newNote = action.payload;
            // createNote(newNote)
            // sessionStorage.setItem('notes', JSON.stringify([...state, newNote]));

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
            // sessionStorage.setItem('notes', JSON.stringify(updatedNotes));
            return updatedNotes;
        case 'DELETE_NOTE':
            const filteredNotes = state.filter((note) => note.id !== action.payload.id);
            // sessionStorage.setItem('notes', JSON.stringify(filteredNotes));
            return filteredNotes;
        default:
            return state;
    }
};

const Notes = () => {
    const [showEditor, setShowEditor] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [showCurrentNote, setShowCurrentNote] = useState(null);

    const [notes, dispatch] = useReducer(notesReducer, initialState);
    const notesRef = useRef(null);

    useEffect(() => {
        if (showCurrentNote) {
            setCurrentNote(notes?.[notes?.length - 1]);
            setShowCurrentNote(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showCurrentNote, notes]);

    const isMobile = detectMobile();

    const handleCreateNote = async () => {
        const newNote = generateBasicNote();
        const response = await createNote(newNote)
        if (response) {
            dispatch({ type: 'ADD_NOTE', payload: response })
            setShowEditor(true);
            setCurrentNote(response)
            setShowCurrentNote(true)
        }
    };

    const handleTitleChange = (value) => {
        const clonedNotes = deepCopy(notes)
        const updatedNotes = clonedNotes.map((note) => {
            if (note.id === currentNote?.id) {
                return {
                    ...note,
                    title: value,
                };
            }
            return note;
        });
        dispatch({ type: 'UPDATE_NOTE', payload: { id: currentNote?.id, updatedNote: { title: value } } });

    }

    const handleNotesUpdate = (value) => {
        dispatch({ type: 'UPDATE_NOTE', payload: { id: currentNote?.id, updatedNote: { description: value, dateUpdated: moment().format('MMM DD YY HH:mm'), } } });
    }

    const handleClose = () => {
        setShowEditor(false);
    };

    const handleRowClick = (row) => {
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
                                Create your first note. Click the
                                <span className='text-blue-500 underline' onClick={handleCreateNote}>
                                    + New Note
                                </span>
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

    return (
        <div ref={notesRef} className={isMobile ? 'mobileNotes' : 'flex'}>
            {((isMobile && !showEditor) || !isMobile) && (
                <div className='notesSidebar' style={{ width: isMobile ? '100%' : '20%' }}>
                    <div className='p-2 notesHeader'>
                        <div className='flex justify-between'>
                            <h2 className='m-0'>
                                <GrDocumentNotes /> Notes
                            </h2>
                            <AddCircleIcon className='cursor-pointer' onClick={handleCreateNote} />
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
                    <RichEditor handleCloseBtn={handleClose} data={currentNote} handleTitleChange={handleTitleChange} handleNotesUpdate={handleNotesUpdate} />
                </div>
            </div>}
        </div>
    );
};

export default Notes;