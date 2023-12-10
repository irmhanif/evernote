import React, { useState, useEffect, useRef } from 'react';

const BoxLabel = ({ title }) => {
    const [showOptions, setShowOptions] = useState(false);
    const boxLabelRef = useRef(null);

    const handleIconClick = (event) => {
        event.stopPropagation();
        setShowOptions(!showOptions);
    };

    const handleOutsideClick = (event) => {
        if (boxLabelRef.current && !boxLabelRef.current.contains(event.target)) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className="flex justify-between items-center" onClick={handleOutsideClick} ref={boxLabelRef}>
            <h4 className="text-primary mt-1 font-semibold mb-2">
                {title}
            </h4>
            <div>
                {/* Three dots icon */}
                <div onClick={handleIconClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 cursor-pointer"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4 10a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 114 0 2 2 0 01-4 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                {/* Options */}
                {showOptions && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                        {/* Option 1 */}
                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Option 1
                        </div>
                        {/* Option 2 */}
                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Option 2
                        </div>
                        {/* Option 3 */}
                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Option 3
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoxLabel;
