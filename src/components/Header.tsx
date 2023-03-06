import React from 'react'

import { AiFillStar, AiOutlineArrowRight } from "react-icons/ai";


function Header() {
    return (
        // remove the h-screen
        <div className='h-screen px-20 py-4' >
            {/* Nav */}
            <nav className='font-lilita text-cream flex justify-between h-[70px]'>
                <div>
                    <h1 className='text-7xl '>u-Mov</h1>
                </div>
                <div className='flex gap-14'>
                    <ul className='flex gap-10 items-center text-xl uppercase'>
                        <li>Link 1</li>
                        <li>Wishlist</li>
                        <li>Log in</li>
                    </ul>
                    <button className='text-black gap-2 flex justify-center items-center text-2xl bg-yellow rounded-md w-[150px] uppercase'>
                        <p>Sign up</p>
                        <AiOutlineArrowRight />
                    </button>
                </div>

            </nav>
            {/* Main  */}
            <main>
                {/* hero */}
                <div className='text-cream h-[800px] p-20 flex gap-10'><div className='w-2/4'>
                    {/* text */}
                    <div className='h-3/4 flex flex-col gap-12'>
                        <h3>Moving has never been easier</h3>
                        <h1 className='text-7xl font-lilita uppercase'>Giving You Your time Back</h1>
                        <p>Everything you need to know before you move to your dream house in your fingertips</p>
                    </div>

                    <div className='flex items-center gap-10 '>

                        <div>
                            <p>+465 users</p>
                            <div className='flex text-yellow'>
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                            </div>
                        </div>
                        <button className='text-black font-lilita gap-2 flex justify-center h-[50px] font-bold items-center text-2xl bg-yellow rounded-md w-[250px] uppercase'>
                            <p>Try u-Mov Free</p>
                            <AiOutlineArrowRight />
                        </button>
                    </div>
                </div>
                    <div className='w-2/4'>
                        {/* image */}
                        <img className='rounded-xl object-cover w-full h-full' src="https://assets.website-files.com/5e832e12eb7ca02ee9064d42/5fce34b954f89982650812a2_Layer%2020%20(1).jpg" alt="" />
                    </div></div>


                {/* hook */}
                <div className='flex justify-center flex-col items-center'>
                    <h2 className='text-5xl font-lilita'>All the advantages</h2>
                    {/* bullet hooks */}
                    <ul>
                        <li>Compare</li>
                        <li>Search</li>
                        <li>Research</li>
                    </ul>
                </div>

            </main>




        </div>
    )
}

export default Header