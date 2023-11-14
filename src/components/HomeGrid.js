import React, { useState } from 'react';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(GridLayout);

const HomeGrid = () => {
    const [layout, setLayout] = useState([
        { i: 'notes', x: 0, y: 0, w: 10, h: 4 },
        { i: 'scratchPad', x: 10, y: 0, w: 6, h: 4 },
        { i: 'recentlyCaptured', x: 0, y: 4, w: 16, h: 4 },
    ]);

    const onLayoutChange = (newLayout) => {
        setLayout(newLayout);
    };

    const onWidthChange = (i, newWidth) => {
        // Update the width of the selected item
        const updatedLayout = layout.map(item =>
            item.i === i ? { ...item, w: newWidth } : item
        );

        // Calculate the remaining width to distribute among nearby siblings
        const remainingWidth = 16 - newWidth;

        // Update the width of nearby sibling elements
        const updatedLayoutWithReducedWidth = updatedLayout.map(item =>
            item.i !== i ? { ...item, w: (item.w / (16 - newWidth)) * remainingWidth } : item
        );

        setLayout(updatedLayoutWithReducedWidth);
    };

    return (
        <ReactGridLayout
            className="layout"
            layout={layout}
            cols={16}
            rowHeight={30}
            width={1200}
            draggableHandle=".drag-handle"
            onLayoutChange={onLayoutChange}
            resizeHandles={['s', 'w', 'e', 'sw', 'se']}
            onResizeStop={(layout, oldItem, newItem) => onWidthChange(newItem.i, newItem.w)}
        >
            <div key="notes" className="bg-white p-4 shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-4 drag-handle">Notes</h2>
                {/* Your Notes content goes here */}
                {/* Example content */}
                <p>This is the content of the Notes container.</p>
            </div>

            <div key="scratchPad" className="bg-white p-4 shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-4 drag-handle">Scratch Pad</h2>
                {/* Your Scratch Pad content goes here */}
                {/* Example content */}
                <p>This is the content of the Scratch Pad container.</p>
            </div>

            <div key="recentlyCaptured" className="bg-white p-4 shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-4 drag-handle">Recently Captured</h2>
                {/* Your Recently Captured content goes here */}
                {/* Example content */}
                <p>This is the content of the Recently Captured container.</p>
            </div>
        </ReactGridLayout>
    );
};

export default HomeGrid;
