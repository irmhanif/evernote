import React from 'react'
import favicon1 from '../assets/favicon-1.png'
import favicon2 from '../assets/favicon-2.png'
import favicon3 from '../assets/favicon-3.png'

export default function Logo(props) {
    const { size = '2' } = props
    const getSize = (size) => {
        switch (size) {
            case '1':
                return favicon1;
            case '2':
                return favicon2;
            case '3':
                return favicon3;
            default:
                break;
        }
    }
    return (
        <img src={getSize(size)} alt='icon' />
    )
}
