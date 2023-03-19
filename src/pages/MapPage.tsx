import BottomNav from "@/components/BottomNav"
import MapApi from "@/components/MapApi"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import React from "react"

function MapPage() {
  return (
    <div className="flex h-[100dvh] flex-col bg-[#EEEEEE] px-6 pt-4 dark:bg-gradient-to-b dark:from-[#000000] dark:via-darkgray dark:to-darkgray dark:text-white lg:px-20 ">
      <Navbar />
      <div className='h-full relative'>
        <Sidebar/>
        <MapApi/>
      </div>
      <BottomNav />
    </div>
  )
}

export default MapPage
