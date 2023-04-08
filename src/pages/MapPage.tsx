import BottomNav from "@/components/BottomNav"
import DistanceMatrix from "@/components/RoutesApi"
import MapApi from "@/components/MapApi"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import React, { useEffect, useRef, useState } from "react"

import results from "../../public/results.json"

function MapPage() {
  //! Driving states

  const newID = (() => {
    let id = 0
    return () => id++
  })()

  const onPlaceChanged = () => {
    if (origins != null) {
      const place = origins.getPlace()
      setOrigins(place.formatted_address)
    } else {
      alert("Please enter text")
    }
  }

  const [destinationAddresses, setDestinationAddresses] = useState<{}[]>([]) // initialize state with an empty array

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

  const [selectedTravelMode, SetSelectedTravelMode] = useState("DRIVE")

  const handleSelectedTravelMode = (e) => SetSelectedTravelMode(e.target.value)

  const [time, setTime] = useState("10:00")

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! public transport states

  const [routeName, setRouteName] = useState("")
  const [directions, setDirections] = useState(results)

  const [distance, setDistance] = useState("")
  const [duration, setDuration] = useState("")

  const publicOriginRef = useRef()

  const publicDestinationAddressesRef = useRef()

  const calculateRoute = async () => {
    if (
      publicOriginRef.current.value === "" ||
      publicDestinationAddressesRef.current.value === ""
    ) {
      return
    }
    const directionsService = new google.maps.DirectionsService()

    const results = await directionsService.route({
      origin: publicOriginRef.current.value,
      destination: publicDestinationAddressesRef.current.value,
      travelMode: google.maps.TravelMode.TRANSIT,
      transitOptions: {
        modes: [google.maps.TransitMode.BUS],
      },
      unitSystem: google.maps.UnitSystem.METRIC,
    })

    setDirections((prevDirections) => [...prevDirections, results])
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  const handleDeleteRoute = (indexToDelete) => {
    setDirections((prev) => {
      return { ...prev }
    })
    const updatedDirections = [...directions]
    // console.log(updatedDirections)
    updatedDirections.splice(indexToDelete, 1)
    setDirections(updatedDirections)
  }

  const [visibleDirections, setVisibleDirections] = useState<{}[]>([])
  const [hiddenDirections, setHiddenDirections] = useState<{}[]>([])
  const [isHidden, setIsHidden] = useState(false)

  // !if the button(to hide a route at first) is clicked use the index provided to shift that object to a hidden routes state
  // ! if the button is clicked again we use the index to put that route back in the visible directions state

  useEffect(() => {
    setVisibleDirections(results)
  }, [])

  const hideDirections = (index) => {
    const filterByIndex = directions.find(
      (route) => route.request.destination.query === index
    )

    console.log("filter", filterByIndex)
    // check for duplicates
    const isDuplicate = hiddenDirections.some(
      (route) => route.request.destination.query === index
    )

    if (!isDuplicate) {
      setHiddenDirections([...hiddenDirections, { filterByIndex }])
    }

    setVisibleDirections(
      visibleDirections.filter(
        (route) =>
          route.request.destination.query !==
          filterByIndex.request.destination.query
      )
    )

    setIsHidden(true)
  }

  const showDirections = (index) => {
    const filterByIndex = visibleDirections.find(
      (route) => route.request.destination.query === index
    )

    // check for duplicates
    const isDuplicate = visibleDirections.some(
      (route) => route.request.destination.query === index
    )

    if (!isDuplicate) {
      setVisibleDirections([...visibleDirections, { filterByIndex }])
    }

    setHiddenDirections(
      hiddenDirections.filter(
        (route) =>
          route.request.destination.query !==
          filterByIndex.request.destination.query
      )
    )

    setIsHidden(false)
  }

  console.log("this is the visible direcitons", visibleDirections)
  console.log("this is the hidden direcitons", hiddenDirections)

  //! lisbon coordinates
  const center = {
    lng: -9.13549,
    lat: 38.7071,
  }
  const [map, setMap] = useState(/** @type google.maps.Map */ null)

  const handleCenter = () => map.panTo(center)

  return (
    <div className="flex h-[100dvh] flex-col bg-[#EEEEEE] px-6 pt-4 dark:bg-gradient-to-b dark:from-[#000000] dark:via-darkgray dark:to-darkgray dark:text-white lg:px-20 ">
      <Navbar />

      <div className="relative h-full">
        <Sidebar
          centerMap={handleCenter}
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
          handlePublicOrigin={publicOriginRef}
          handlePublicDestination={publicDestinationAddressesRef}
          calculateRoute={calculateRoute}
          handleDeleteRoute={handleDeleteRoute}
          directions={directions}
          hideDirections={hideDirections}
          showDirections={showDirections}
          isHidden={isHidden}
        />
        <MapApi
          directions={directions}
          map={map}
          setMap={(map) => setMap(map)}
          center={center}
          routes={visibleDirections}
        />
      </div>
    </div>
  )
}

export default MapPage
