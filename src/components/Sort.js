import React from 'react';

const Sort = () => {

    return (
        <div>
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
        </div>
    );
};

export default Sort;
