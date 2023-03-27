import BottomNav from "@/components/BottomNav"
import MapApi from "@/components/MapApi"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import React, { useRef, useState } from "react"

function MapPage() {
  const [map, setMap] = useState(/** @type google.maps.Map */ null)
  const [directions, setDirections] = useState<any | null>(null)
  const [distance, setDistance] = useState("")
  const [duration, setDuration] = useState("")

 /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  console.log(originRef)

 /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef()

  const calculateRoute = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return
    }
    const directionsService = new google.maps.DirectionsService()

    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    })

    setDirections(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  const clearRoute = () => {
    setDirections(null)
    setDistance("")
    setDuration("")
    originRef.current.value = ""
    destinationRef.current.value = ""
  }

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
          originRef={originRef}
          destinationRef={destinationRef}
          centerMap={handleCenter}
          calculateRoute={calculateRoute}
          clearRoute={clearRoute}
          distance={distance}
          duration={duration}
        />
        <MapApi
          directions={directions}
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
