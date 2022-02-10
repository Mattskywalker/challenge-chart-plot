import React from 'react';
import { Link } from 'react-router-dom';

import './Error.css'

/**
 * @description - This component should be called when user try to access some page that not exists;
 */
export default function Error() {

    return (
        <div className='Error' >
            <h1 className='Message' >Error 404</h1>
            <h3 className='Message' > Not found</h3>
            <Link to="/">Back to Home</Link>
        </div>
    )
}
