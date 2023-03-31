import BottomNav from "@/components/BottomNav"
import DistanceMatrix from "@/components/RoutesApi"
import MapApi from "@/components/MapApi"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import React, { useRef, useState } from "react"

function MapPage() {
  const newID = (() => {
    let id = 0
    return () => id++
  })()

  const INITIAL_TASKS = [
    {
      id: newID(),
      name: "Job",
      address: "Parangaba, Fortaleza - State of Ceará,Brazil",
    },
    {
      id: newID(),
      name: "Kids school",
      address: "Parangaba, Fortaleza - State of Ceará,Brazil",
    },
    {
      id: newID(),
      name: "Wife",
      address: "Parangaba, Fortaleza - State of Ceará,Brazil",
    },
  ]

  const onPlaceChanged = () => {
    if (origins != null) {
      const place = origins.getPlace()
      setOrigins(place.formatted_address)
    } else {
      alert("Please enter text")
    }
  }
  const [destinationAddresses, setDestinationAddresses] = useState<{}[]>([]) // initialize state with an empty array
  console.log(destinationAddresses)

  const [newDestination, setNewDestination] = useState({
    name: "",
    address: "",
  })
  // console.log(newDestination)

  const handleNewDestinationName = (event) => {
    setNewDestination({ ...newDestination, name: event.target.value })
  }

  const handleNewDestinationAddress = (event) => {
    setNewDestination({ ...newDestination, address: event.target.value })
  }

  const handleDestinationAddress = (event) => {
    event.preventDefault()

    if (
      newDestination.name.trim() !== "" &&
      newDestination.address.trim() !== ""
    ) {
      const newAddress = {
        id: newID(),
        name: newDestination.name.trim(),
        address: newDestination.address.trim(),
      }
      setDestinationAddresses([...destinationAddresses, newAddress])
      setNewDestination({ name: "", address: "" })
    }
  }

  const handleRemoveDestination = (index) => {
    const newAdresses = [...destinationAddresses]
    newAdresses.splice(index, 1)
    setDestinationAddresses(newAdresses)
  }

  const clearRoute = () => {
    setDirections(null)
    setDistance("")
    setDuration("")
    originRef.current.value = ""
    destinationRef.current.value = ""
  }

  // lisbon coordinates
  const center = {
    lng: -9.13549,
    lat: 38.7071,
  }
  const [map, setMap] = useState(/** @type google.maps.Map */ null)

  const handleCenter = () => map.panTo(center)

  const [selectedTravelMode, SetSelectedTravelMode] = useState("DRIVE")

const handleSelectedTravelMode=(e)=> SetSelectedTravelMode(e.target.value)

const [time, setTime] = useState('10:00')



  return (
    <div className="flex h-[100dvh] flex-col bg-[#EEEEEE] px-6 pt-4 dark:bg-gradient-to-b dark:from-[#000000] dark:via-darkgray dark:to-darkgray dark:text-white lg:px-20 ">
      <Navbar />
      {/* <DistanceMatrix /> */}
      <div className="relative h-full">
        <Sidebar
          centerMap={handleCenter}
          clearRoute={clearRoute}
          handleDestinationAddress={handleDestinationAddress}
          handleNewDestinationName={handleNewDestinationName}
          handleNewDestinationAddress={handleNewDestinationAddress}
          handleRemoveDestination={handleRemoveDestination}
          onPlaceChanged={onPlaceChanged}
          destinationAddresses={destinationAddresses}
          selectedTravelMode={selectedTravelMode}
          SetSelectedTravelMode={handleSelectedTravelMode}
          time={time}
          setTime={setTime}

        />
        <MapApi
          // directions={directions}
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
