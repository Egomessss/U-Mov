import ThemeToggler from '@/hooks/ThemeToggler'
import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { CgMenuGridR } from "react-icons/cg"

function Navbar() {
    return (
        <nav className='font-lilita dark:text-[#EEEEEE] flex justify-between h-[50px]'>
            <div>
                <h1 className='text-5xl '>u-Mov</h1>
            </div>
            <div className='flex items-center gap-4'>
                <ThemeToggler />
                <button><CgMenuGridR className='w-8 h-8 text-orange' /></button>

                <div className='hidden md:flex md:gap-14'>
                    <ul className='flex gap-10 items-center text-xl uppercase'>
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
            </div>


        </nav>
    )
}

export default Navbar
