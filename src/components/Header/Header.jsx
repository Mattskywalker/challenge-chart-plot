import React from 'react'

import './Header.css';

export default function Header({text}) {
    return (
        <div className='Header'>
            <h2 className='HeaderText' ><strong>{text}</strong></h2>
        </div>
    )
}
