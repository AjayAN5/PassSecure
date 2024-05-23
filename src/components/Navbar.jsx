import React from 'react'

const Navbar = ({ aboutDivId }) => {

    return (
        <>
            <nav className="bg-neutral-950 text-white flex w-screen justify-between h-14 items-center font-poppinsFont border-solid border-b-2 border-gray-700">
                <div className="logo font-bold text-2xl font-alegreyaFont">
                    <a href="/" className='flex items-center'>
                        <span><img width={20} src="/public/images/passSecure-logo.svg" alt="passSecure-logo" className='pl-5' /></span>
                        <span>Pass</span>
                        <span className='text-green-600'>Secure</span>
                    </a>
                </div>
                <ul className='flex flex-row justify-around gap-10 px-5'>
                    <li>
                        <a className='hover:font-bold hover:text-gray-600' href={`#${aboutDivId}`}>About</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
