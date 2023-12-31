import React, { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.scss';
import TitleInput from './TitleInput'; // Import the TitleInput component
import ReactDOM from 'react-dom/client';

var Font = Quill.import('formats/font');
Font.whitelist = ['Ubuntu', 'Raleway', 'Roboto'];
Quill.register(Font, true);

const RichTextEditor = () => {
    const [value, setValue] = useState('');
    const targetRef = useRef(null);

    useEffect(() => {
        let isInjected = false

        if (!isInjected) {
            // The component to be appended
            const injectedComponent = document.createElement('div');
            injectedComponent.id = 'title-input';
            // injectedComponent.innerHTML = `<TitleInput />`; // Append the TitleInput component
            const elem = document.getElementById('title-input');
            const root = ReactDOM.createRoot(elem);
            root.render(<TitleInput />);
            const targetElement = document.querySelector('.ql-toolbar');

            // Append the new component after the target element
            if (targetElement && !isInjected) {
                targetElement.parentNode.insertBefore(injectedComponent, targetElement.nextSibling);
                targetElement.appendChild(injectedComponent);
                isInjected = true; // Mark as injected
            }
        }
    }, [])

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': Font.whitelist }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['code-block'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
        ],
    }
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video', 'code - block',
        'color', 'background',
        'align',
    ]

    return (
        <>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                placeholder="Enter text..."
                bounds={'.app'}
                modules={modules}
                ref={targetRef}
                formats={formats}
            />
        </>
    );
};


export default RichTextEditor;
