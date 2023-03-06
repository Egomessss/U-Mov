import React from 'react'
import { AiFillStar, AiOutlineArrowRight } from 'react-icons/ai'

function Hero() {
    return (
        <div className='text-cream h-[600px] flex gap-10'>
            <div className='w-2/4'>
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
            </div>
        </div>
    )
}

export default Hero