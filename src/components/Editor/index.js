import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.scss';
import TitleInput from './TitleInput';
import ReactDOM from 'react-dom/client';

var Font = Quill.import('formats/font');
Font.whitelist = ['Ubuntu', 'Raleway', 'Roboto', 'BadScript', 'CedarvilleCursive', 'Pacifico', 'DancingScript'];
Quill.register(Font, true);


const RichTextEditor = (props) => {
    const { handleCloseBtn, data, handleTitleChange } = props;
    const [value, setValue] = useState('');
    const targetRef = useRef(null);

    useEffect(() => {
        let isInjected = false

        if (!isInjected) {
            // The component to be appended
            const injectedComponent = document.createElement('div');
            injectedComponent.id = 'title-input';
            const elem = document.getElementById('title-input');
            const root = ReactDOM.createRoot(elem);
            root.render(<TitleInput value={data.title} handleChange={handleTitleChange} />);
            const targetElement = document.querySelector('.ql-toolbar');

            // Append the new component after the target element
            if (targetElement && !isInjected) {
                targetElement.parentNode.insertBefore(injectedComponent, targetElement.nextSibling);
                isInjected = true; // Mark as injected
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleClick = () => { }

    const myUndo = () => {
        let myEditor = targetRef.current.getEditor();
        return myEditor.history.undo();
    }

    const myRedo = () => {
        let myEditor = targetRef.current.getEditor();
        return myEditor.history.redo();
    }

    const icons = Quill.import("ui/icons");
    icons["undo"] = `<svg viewbox="0 0 18 18">
        <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
        <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
    </svg>`;
    icons["redo"] = `<svg viewbox="0 0 18 18">
        <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
        <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
    </svg>`;
    icons["close"] = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M 5 5 L 5 27 L 27 27 L 27 5 Z M 7 7 L 25 7 L 25 25 L 7 25 Z M 11.6875 10.3125 L 10.28125 11.71875 L 14.5625 16 L 10.21875 20.34375 L 11.625 21.75 L 15.96875 17.40625 L 20.28125 21.71875 L 21.6875 20.3125 L 17.375 16 L 21.625 11.75 L 20.21875 10.34375 L 15.96875 14.59375 Z">
        </path>
    </svg>`;

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ font: Font.whitelist }],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ color: [] }, { background: [] }],
                    [{ script: "sub" }, { script: "super" }],
                    ["undo", "redo"],
                    ["blockquote", "code-block"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [
                        { indent: "-1" },
                        { indent: "+1" },
                        { align: [] },
                    ],
                    [{ direction: "rtl" }],
                    [{ size: ["small", false, "large", "huge"] }],
                    ["link", "image", "video"],
                    ["clean"],
                    ["close"]

                ],
                handlers: {
                    image: handleClick,
                    close: () => {
                        handleCloseBtn();
                    },
                    undo: myUndo,
                    redo: myRedo,
                },
                history: {
                    delay: 500,
                    maxStack: 100,
                    userOnly: true,
                },
            },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const formats = [
        'header', 'font', 'size', 'code - block', 'undo', 'redo', 'direction',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'color', 'background',
        'align',
    ]

    return (
        <>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                placeholder="Start writing..."
                bounds={'.app'}
                modules={modules}
                ref={targetRef}
                formats={formats}
            />
        </>
    );
};


export default RichTextEditor;
