import { Tab } from "@headlessui/react"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { Autocomplete } from "@react-google-maps/api"
import React, { useEffect, useRef, useState } from "react"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { BsTrash3 } from "react-icons/bs"
import { MdOutlineVisibility } from "react-icons/md"

function PublicTransport() {


    const [routeName, setRouteName] = useState("")
    const [directions, setDirections] = useState([])
  
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
  
    const [publicTransportDirections, setPublicTransportDirections] = useState<
      {}[]
    >([])
    const [hiddenPublicTransportDirections, setHiddenPublicTransportDirections] =
      useState<{}[]>([])
  
    const [isHidden, setIsHidden] = useState(false)
  
    useEffect(() => {
      setPublicTransportDirections(results)
    }, [])
  
    // first select a route
  
    // then a button click the button to hide it
    // this puts in the hidden routes state
  
    // the  another button to show it again
    // this puts it back in the routes state
  
    const hideDirections = (index) => {
      const filterByIndex = directions.find(
        (route) => route.request.destination.query === index
      )
  
      console.log("filter", filterByIndex)
      // check for duplicates
      const isDuplicate = hiddenPublicTransportDirections.some(
        (route) => route.request.destination.query === index
      )
  
      if (!isDuplicate) {
        setHiddenPublicTransportDirections([
          ...hiddenPublicTransportDirections,
          { filterByIndex },
        ])
      }
  
      setPublicTransportDirections(
        publicTransportDirections.filter(
          (route) =>
            route.request.destination.query !==
            filterByIndex.request.destination.query
        )
      )
  
      setIsHidden(true)
    }
  
    const showDirections = (index) => {
      const filterByIndex = publicTransportDirections.find(
        (route) => route.request.destination.query === index
      )
  
      // check for duplicates
      const isDuplicate = publicTransportDirections.some(
        (route) => route.request.destination.query === index
      )
  
      if (!isDuplicate) {
        setPublicTransportDirections([
          ...publicTransportDirections,
          { filterByIndex },
        ])
      }
  
      setHiddenPublicTransportDirections(
        hiddenPublicTransportDirections.filter(
          (route) =>
            route.request.destination.query !==
            filterByIndex.request.destination.query
        )
      )
  
      setIsHidden(false)
    }


    console.log("this is the visible direcitons", publicTransportDirections)
    console.log("this is the hidden direcitons", hiddenPublicTransportDirections)

  return (
    <Tab.Panel>
      <h3>Public transport routes</h3>
      <div>
        <div className="flex items-center justify-center gap-2">
          <h3>Home</h3>
          {/* this icons changes color according to user */}
          <ArrowRightIcon className="h-6" />
          <h3>Job</h3>
        </div>
        <div>
          <label htmlFor="home-input">Main adress</label>
          <Autocomplete
          // onPlaceChanged={handlePublicOrigin}
          // onLoad={onLoad}
          >
            <input
              className="border-lightgray  w-full border-b-2 bg-white px-2"
              type="text"
              placeholder="Enter Your Home Adress"
              id="home-input"
              ref={handlePublicOrigin}
            />
          </Autocomplete>
        </div>
        <div>
          <div>
            <form onSubmit={handleDestinationAddress}>
              <label htmlFor="job-input">Destinations</label>
              <Autocomplete
              // onPlaceChanged={handlePublicDestination}
              >
                <input
                  className="border-lightgray  w-full border-b-2 bg-white px-2"
                  type="text"
                  placeholder="Add a name for the destination"
                  id="job-input"
                  ref={handlePublicDestination}
                />
              </Autocomplete>

              <button onClick={calculateRoute}>Add destinations</button>
            </form>
          </div>
          <div className="pt-4">
            <ul className="flex flex-col gap-2">
              {directions.map((direction, index) => (
                <div key={index}>
                  {/* <input type="text" /> */}
                  <p>Route {index + 1}</p>
                  <p className="font-semibold">Origin:</p>{" "}
                  <p className="text-xs">{direction.request.origin.query}</p>
                  <p className="font-semibold">Destination:</p>
                  <p className="text-xs">
                    {direction.request.destination.query}
                  </p>
                  <button
                    onClick={() => handleDeleteRoute(index)}
                    className=" rounded-md  border-2 p-1"
                  >
                    <BsTrash3 />
                  </button>
                  {isHidden ? (
                    <button
                      onClick={() =>
                        showDirections(direction.request.destination.query)
                      }
                      className=" rounded-md  border-2 p-1"
                    >
                      <MdOutlineVisibility />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        hideDirections(direction.request.destination.query)
                      }
                      className=" rounded-md  border-2 p-1"
                    >
                      <AiOutlineEyeInvisible />
                    </button>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Tab.Panel>
  )
}

export default PublicTransport
