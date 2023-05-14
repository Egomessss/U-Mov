import BottomNav from "@/components/BottomNav"
import DistanceMatrix from "@/components/mappage/RoutesApi"
import MapApi from "@/components/mappage/MapApi"

import Sidebar from "@/components/mappage/Sidebar"
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react"

import results from "../../public/results.json"
import DrivingContextProvider from "../context/DrivingContextProvider"

function MapPage() {
  //! lisbon coordinates
  const center = {
    lng: -9.13549,
    lat: 38.7071,
  }
  const [map, setMap] = useState(/** @type google.maps.Map */ null)

  const handleCenter = () => map.panTo(center)

  return (
    <div className=" h-[100dvh]   lg:px-20 ">
      {/* <Navbar /> */}
      <div className="relative h-full">
        <DrivingContextProvider>
          <Sidebar centerMap={handleCenter} />
          <MapApi
            // directions={publicTransportDirections}
            map={map}
            setMap={(map) => setMap(map)}
            center={center}
            // routes={publicTransportDirections}
          />
        </DrivingContextProvider>
      </div>
    </div>
  )
}

export default MapPage
