import BottomNav from "@/components/BottomNav"
import Map from "@/components/Map"
import Navbar from "@/components/Navbar"
import React from "react"

function MapPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#EEEEEE] px-6 py-4 dark:bg-gradient-to-b dark:from-[#000000] dark:via-darkgray dark:to-darkgray dark:text-white lg:px-20 ">
      <Navbar />
      <Map />
      <BottomNav />
    </div>
  )
}

export default MapPage
