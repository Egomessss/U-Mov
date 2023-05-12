import BottomNav from "@/components/BottomNav"
import DistanceMatrix from "@/pages/mappage/RoutesApi"
import MapApi from "@/pages/mappage/MapApi"

import Sidebar from "@/pages/mappage/Sidebar"
import React, { useEffect, useRef, useState } from "react"

import results from "../../../public/results.json"

function MapPage() {
  //! lisbon coordinates
  const center = {
    lng: -9.13549,
    lat: 38.7071,
  }
  const [map, setMap] = useState(/** @type google.maps.Map */ null)

  const handleCenter = () => map.panTo(center)

  return (
    <div className="flex h-[100dvh] flex-col bg-[#EEEEEE] px-6 pt-4 lg:px-20 ">
      {/* <Navbar /> */}

      <div className="relative h-full">
        <Sidebar centerMap={handleCenter} />
        <MapApi
          // directions={publicTransportDirections}
          map={map}
          setMap={(map) => setMap(map)}
          center={center}
          // routes={publicTransportDirections}
        />
      </div>
    </div>
  )
}

export default MapPage
