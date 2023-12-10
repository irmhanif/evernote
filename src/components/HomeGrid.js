import React, { useState } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(Responsive);

const HomeGrid = () => {
    const [layout, setLayout] = useState([
        { i: 'notes', x: 0, y: 0, w: 8, h: 8 },
        { i: 'scratchPad', x: 10, y: 0, w: 4, h: 8 },
        { i: 'recentlyCaptured', x: 0, y: 4, w: 12, h: 14 },
    ]);

    const [isDraggable, setIsDraggable] = useState(false);

    const onLayoutChange = (newLayout) => {
        setLayout(newLayout);
    };

    const handleReOrderClick = () => {
        setIsDraggable(!isDraggable);
    };

    const handleSaveClick = () => {
        console.log(layout);
    };

    return (
        <>
            <div className='hidden'>
                <button onClick={handleReOrderClick}>ReOrder</button>
                <button onClick={handleSaveClick}>Save</button>
            </div>
            <ReactGridLayout
                className="layout gridSection"
                layouts={{ lg: layout }}
                onLayoutChange={onLayoutChange}
                isDraggable={isDraggable}
                isResizable={isDraggable}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={30}
                width={1200}
                draggableHandle={null}
                resizeHandles={['s', 'w', 'e', 'sw', 'se']}
            >
                <div key="notes" className="bg-white p-4 shadow-md rounded-md">
                    <h2 className="text-2xl font-bold mb-4 ">Notes</h2>
                    {/* Your Notes content goes here */}
                    {/* Example content */}
                    <p>This is the content of the Notes container.</p>
                </div>

                <div key="scratchPad" className="bg-white p-4 shadow-md rounded-md">
                    <h2 className="text-2xl font-bold mb-4 ">Scratch Pad</h2>
                    {/* Your Scratch Pad content goes here */}
                    {/* Example content */}
                    <p>This is the content of the Scratch Pad container.</p>
                </div>

                <div key="recentlyCaptured" className="bg-white p-4 shadow-md rounded-md">
                    <h2 className="text-2xl font-bold mb-4 ">Recently Captured</h2>
                    {/* Your Recently Captured content goes here */}
                    {/* Example content */}
                    <p>This is the content of the Recently Captured container.</p>
                </div>
            </ReactGridLayout >
        </>

    );
};

export default HomeGrid;
