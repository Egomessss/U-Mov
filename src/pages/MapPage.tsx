import BottomNav from "@/components/BottomNav"
import MapApi from "@/components/MapApi"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import React, { useState } from "react"

function MapPage() {
  const [map, setMap] = useState(/** @type google.maps.Map */( null))

  const center = {
    lat: -3.745,
    lng: -38.523,
  }

  const handleCenter = () => map.panTo(center)

  return (
    <div className="flex h-[100dvh] flex-col bg-[#EEEEEE] px-6 pt-4 dark:bg-gradient-to-b dark:from-[#000000] dark:via-darkgray dark:to-darkgray dark:text-white lg:px-20 ">
      <Navbar />
      <div className="relative h-full">
        <Sidebar
          centerMap={handleCenter}
        />
        <MapApi
          map={map}
          setMap={(map) => setMap(map)}
          center={center}
        />
      </div>
      <BottomNav />
    </div>
  )
}

export default MapPage
