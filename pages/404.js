import React from 'react';
import Link from 'next/link';

function Custom404() {
    return (
        <div style={{textAlign: 'center', marginTop: '5em'}}>
            <p>Whoops! It looks like you took a wrong turn.</p>
            <Link href="/">Return Home</Link>
        </div>
    )
}

export default Custom404
