import BottomNav from "@/components/BottomNav"
import MapApi from "@/components/MapApi"
import Navbar from "@/components/Navbar"
import React from "react"

function MapPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#EEEEEE] px-6 py-4 dark:bg-gradient-to-b dark:from-[#000000] dark:via-darkgray dark:to-darkgray dark:text-white lg:px-20 ">
      <Navbar />
      <div className='flex-grow'>
        <MapApi/>
      </div>
      <BottomNav />
    </div>
  )
}

export default MapPage
