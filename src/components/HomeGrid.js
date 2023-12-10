import React, { useState } from 'react';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import ScratchPad from './ScratchPad';
import HomeNotes from './HomeNotes';

const ReactGridLayout = WidthProvider(GridLayout);

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
        <div data-testid="home-grid" data-draggable={isDraggable.toString()}>
            <div className='hidden'>
                <button onClick={handleReOrderClick}>ReOrder</button>
                <button onClick={handleSaveClick}>Save</button>
            </div>
            <ReactGridLayout
                className="layout gridSection"
                layout={layout}
                onLayoutChange={onLayoutChange}
                isDraggable={isDraggable}
                isResizable={isDraggable}
                cols={12}
                rowHeight={30}
                width={1200}
                draggableHandle={null}
                resizeHandles={['s', 'w', 'e', 'sw', 'se']}
            >
                <div key="notes" className="bg-white p-4 shadow-md rounded-md">
                    <HomeNotes />
                </div>

                <div key="scratchPad" className="bg-yellow-200 p-2 shadow-md rounded-md">
                    <ScratchPad />
                </div>

                <div key="recentlyCaptured" className="bg-white p-4 shadow-md rounded-md">
                    <h2 className="text-2xl font-bold mb-4 ">Recently Captured</h2>
                    {/* Your Recently Captured content goes here */}
                    {/* Example content */}
                    <p>This is the content of the Recently Captured container.</p>
                </div>
            </ReactGridLayout >
        </div>
    );
};

export default HomeGrid;
