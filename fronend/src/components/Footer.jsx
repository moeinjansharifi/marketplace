import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div className='px-6 py-3 flex items-center bg-gray-300 justify-center mt-5 h-20'>
                <p className='text-bold'>RentVibe &copy; {currentYear}</p>
        </div>
    )
}

export default Footer
