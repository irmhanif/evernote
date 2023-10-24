import React from 'react'
import cs from 'classnames';
import { AiOutlineSetting } from "react-icons/ai";
function Profile(props) {
    const { collapsed } = props
    const username = "Mohamed Idris M";
    const profileIcon = username[0].toUpperCase();
    return (
        <div className={cs("px-4 py-4 items-center flex justify-between profile", !collapsed && ' flex-col-reverse gap-1')}>
            <div className="flex items-center space-x-2">
                <div className="bg-blue-600 rounded-full h-7 w-7 flex items-center justify-center text-white">
                    {profileIcon}
                </div>
                {collapsed && <><div className="text-xs text-white">{username}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" className="downArrow">
                        <path fill="none" d="M7 2L4 5 1 2"></path>
                    </svg>
                </>}
            </div>
            <div>
                <AiOutlineSetting className="setting" color='#737373' />
            </div>
        </div>
    )
}

export default Profile