import ThemeToggler from '@/hooks/ThemeToggler'
import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'

function Navbar() {
    return (
        <nav className='font-lilita dark:text-[#EEEEEE] flex justify-between h-[50px]'>
            <div>
                <h1 className='text-5xl '>u-Mov</h1>
            </div>
            <div className='flex gap-14'>
                <ul className='flex gap-10 items-center text-xl uppercase'>
                    <li><ThemeToggler /></li>
                    <li>
                        <button>Link 1</button>
                    </li>
                    <li>
                        <button>Wishlist</button>
                    </li>
                    <li>
                        <button>Log in</button>
                    </li>
                </ul>
                <button className='dark:text-black gap-2 flex justify-center items-center text-2xl dark:bg-orange rounded-md w-[150px] uppercase'>
                    <p>Sign up</p>
                    <AiOutlineArrowRight />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
