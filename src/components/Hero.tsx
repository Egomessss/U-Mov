import React from "react"
import { AiFillStar, AiOutlineArrowRight } from "react-icons/ai"

function Hero() {
  return (
    <div>
      {/* full */}
      <div className="hidden h-[600px] gap-10 dark:text-[#EEEEEE] md:flex">
        <div className="w-2/4">
          {/* text */}
          <div className="flex h-3/4 flex-col gap-12">
            <h3 className="text-xl font-bold">Moving has never been easier</h3>
            <h1 className="font-lilita text-7xl uppercase">
              Giving You Your time Back
            </h1>
            <p className="font-bold">
              Everything you need to know before you move to your dream house in
              your fingertips
            </p>
          </div>

          <div className="flex items-center gap-10 ">
            <div>
              <p>+465 users</p>
              <div className="flex dark:text-orange">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
            </div>
            <button className="flex h-[50px] w-[250px] items-center justify-center gap-2 rounded-md bg-orange font-lilita text-2xl font-bold uppercase dark:text-black">
              <p>Try u-Mov Free</p>
              <AiOutlineArrowRight />
            </button>
          </div>
        </div>
        <div className="w-2/4">
          {/* image */}
          <img
            className="h-full w-full rounded-xl object-cover"
            src="https://assets.website-files.com/5e832e12eb7ca02ee9064d42/5fce34b954f89982650812a2_Layer%2020%20(1).jpg"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center md:hidden ">
        <div className="h-[400px] py-10 dark:text-[#EEEEEE]">
          {/* image */}
          <img
            className="h-full w-full rounded-xl object-cover"
            src="https://assets.website-files.com/5e832e12eb7ca02ee9064d42/5fce34b954f89982650812a2_Layer%2020%20(1).jpg"
            alt=""
          />
        </div>
        {/* mobile */}
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-center text-3xl font-bold">
            Moving has never been easier
          </h1>
          <button className="flex  h-[50px] w-[250px] items-center justify-center gap-2 rounded-md bg-orange font-lilita text-2xl font-bold uppercase dark:text-black">
            <p>Try u-Mov Free</p>
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
