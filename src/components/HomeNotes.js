import React from 'react';
import { Tabs } from 'antd';
import 'tailwindcss/tailwind.css';
import BoxLabel from './BoxLabel';


const HomeNotes = () => {
    // Dummy notes
    const recentNotes = Array.from({ length: 10 }, (_, index) => `Note ${index + 21}`);
    const suggestedNotes = Array.from({ length: 10 }, (_, index) => `Note ${index + 11}`);

    return (
        <div className="tile-container">
            <BoxLabel title={'Notes'} />
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: 'Recent',
                        key: 'recent',
                        children: (
                            <div className={`border-b-2 `}>
                                {/* Display recent notes */}
                                <div className="flex overflow-x-auto flex-nowrap">
                                    {recentNotes.map((note, index) => (
                                        <div key={index} role='note' className="flex-shrink-0 w-44 h-40 bg-gray-200 m-2">
                                            {note}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ),
                    },
                    {
                        label: 'Suggested',
                        key: 'suggested',
                        children: (
                            <div className={`border-b-2 `}>
                                {/* Display suggested notes */}
                                <div className="flex overflow-x-auto flex-nowrap">
                                    {suggestedNotes.map((note, index) => (
                                        <div key={index} role='note' className="flex-shrink-0 w-44 h-40 bg-gray-200 m-2">
                                            {note}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ),
                    },
                ]}
            />

        </div>
    );
};

export default HomeNotes;
