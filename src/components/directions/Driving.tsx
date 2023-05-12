import { Tab } from "@headlessui/react"
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Autocomplete } from "@react-google-maps/api"
import React, { useContext, useState } from "react"
import { createContext } from "vm"
import { DrivingContext } from "../../context/DrivingContextProvider"
import results from "../../../public/results.json"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { MdOutlineVisibility } from "react-icons/md"
import { BsTrash3 } from "react-icons/bs"


function Driving() {
  const { drivingDirections, setDrivingDirections } = useContext(DrivingContext)


  const [destinationAddresses, setDestinationAddresses] = useState<{}[]>([]) // initialize state with an empty array

  const [newDestination, setNewDestination] = useState({
    name: "",
    address: "",
  })

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

  // console.log(newDestination)

  // const handleNewDestinationName = (event) => {
  //   setNewDestination({ ...newDestination, name: event.target.value })
  // }

  // const handleNewDestinationAddress = (event) => {
  //   setNewDestination({ ...newDestination, address: event.target.value })
  // }

  // const handleDestinationAddress = (event) => {
  //   event.preventDefault()

  //   if (
  //     newDestination.name.trim() !== "" &&
  //     newDestination.address.trim() !== ""
  //   ) {
  //     const newAddress = {
  //       id: newID(),
  //       name: newDestination.name.trim(),
  //       address: newDestination.address.trim(),
  //     }
  //     setDestinationAddresses([...destinationAddresses, newAddress])
  //     setNewDestination({ name: "", address: "" })
  //   }
  // }

  // const handleRemoveDestination = (index) => {
  //   const newAdresses = [...destinationAddresses]
  //   newAdresses.splice(index, 1)
  //   setDestinationAddresses(newAdresses)
  // }

  // const [selectedTravelMode, SetSelectedTravelMode] = useState("DRIVE")

  // const handleSelectedTravelMode = (e) => SetSelectedTravelMode(e.target.value)

  // const [time, setTime] = useState("10:00")

  return (
    <Tab.Panel>
      <h3>Driving routes</h3>
      <div>
        <div className="flex items-center justify-center gap-2">
          <h3>Home</h3>
          {/* this icons changes color according to user */}
          <ArrowRightIcon className="h-6" />
          <h3>Job</h3>
        </div>
        <button onClick={() => setDrivingDirections(results)}>Click me</button>
        <div>
          <label htmlFor="home-input">Main adress</label>
          <Autocomplete
          onPlaceChanged={onPlaceChanged}
          // onLoad={onLoad}
          >
            <input
              className="border-lightgray  w-full border-b-2 bg-white px-2"
              type="text"
              placeholder="Enter Your Home Adress"
              id="home-input"
            />
          </Autocomplete>
        </div>
        {/* 2nd phase options */}
        {/* <div>
          <div>
            <button>Eco options</button>
            <button>Car options</button>
            <form onSubmit={handleDestinationAddress}>
              <label htmlFor="job-input">Destinations</label>
             
              <input
                className="border-lightgray  w-full border-b-2 bg-white px-2"
                type="text"
                placeholder="Add a name for the destination"
                id="job-input"
                onChange={handleNewDestinationName}
              />{" "}
            
              <input
                className="border-lightgray  w-full border-b-2 bg-white px-2"
                type="text"
                placeholder="Add a destination adress"
                id="job-input"
                onChange={handleNewDestinationAddress}
              />
              <input
                className="border-lightgray  w-full border-b-2 bg-white px-2"
                type="number"
                placeholder="Number of travels per month"
                id="job-input"
                onChange={handleNewDestinationAddress}
              />
              <button type="submit">Add destinations</button>
              <div>
                {" "}
                <label htmlFor="travelMode">Pick travel mode:</label>
                <select
                  id="travelMode"
                  value={selectedTravelMode}
                  onChange={SetSelectedTravelMode}
                  className="w-full rounded-lg border-2 bg-white"
                >
                  <option value="WALK">Walk</option>
                  <option value="BICYCLE">Bycicle</option>
                  <option value="TWO_WHEELER">
                    Two-wheeled, motorized vehicle
                  </option>
                  <option value="DRIVE">Drive</option>
                </select>
              </div>
              <h3> Fuel consumption</h3>
              <div>
                <label htmlFor="typeEngine">Type of engine</label>
                <select
                  value={selectedTravelMode}
                  onChange={SetSelectedTravelMode}
                  className="w-full rounded-lg border-2 bg-white"
                  id="typeEngine"
                >
                  <option value="WALK">Diesel</option>
                  <option value="BICYCLE">Unleaded</option>
                  <option value="TWO_WHEELER">Super-unleaded</option>
                  <option value="DRIVE">Premium diesel</option>
                  <option value="DRIVE">Electric</option>
                </select>
              </div>
              <div>
                <label htmlFor="consumption">Consumption</label>
                <input
                  type="number"
                  placeholder="l/km"
                  className="border-lightgray  w-full border-b-2 bg-white px-2"
                  id="consumption"
                />
              
                <input
                  type="number"
                  placeholder="w/km"
                  className="border-lightgray  w-full border-b-2 bg-white px-2"
                  id="consumption"
                />
              </div>
              <div>
                <label htmlFor="traffic">Live traffic:</label>
                <select
                  id="traffic"
                  className="flex flex-wrap"
                  value={selectedTravelMode}
                  onChange={SetSelectedTravelMode}
                >
                  <option value="WALK">TRAFFIC_AWARE</option>
                  <option value="BICYCLE">TRAFFIC_AWARE_OPTIMAL</option>
                </select>
              </div>
              <div>
                <div className="flex gap-2">
                  <label htmlFor="tolls">Avoid tolls</label>
                  <input
                    type="checkbox"
                    name=""
                    id="tolls"
                  />
                </div>
                <div className="flex gap-2">
                  <label htmlFor="highways">Avoid Highways</label>
                  <input
                    type="checkbox"
                    name=""
                    id="highways"
                  />
                </div>

                <div className="flex gap-2">
                  <label htmlFor="ferries">Avoid ferries</label>
                  <input
                    type="checkbox"
                    name=""
                    id="ferries"
                  />
                </div>
                <div>
                  <label htmlFor="units">Units</label>
                  <select
                    value={selectedTravelMode}
                    onChange={SetSelectedTravelMode}
                    id="units"
                  >
                    <option value="WALK">METRIC</option>
                    <option value="BICYCLE">IMPERIAL</option>
                  </select>
                </div>

                <div className="flex justify-center gap-2">
                  {" "}
                  <button>Get Routes</button>
                  <button>Clear selection</button>
                </div>
              </div>
            </form>
          </div>
          <div className="pt-4">
            <ul className="flex flex-col gap-2">
              {destinationAddresses.map(({ id, name, address }) => (
                <li
                  className="border-b-2 pb-4"
                  key={id}
                >
                  <div className="flex gap-2">
                    <span>{name}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className=" flex justify-between">
                      <span>{address}</span>
                      <button
                        onClick={handleRemoveDestination}
                        className="rounded-md  px-2"
                      >
                        <TrashIcon className="text-orange h-6" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
        <div className="pt-4">
          <ul className="flex flex-col gap-2">
            {drivingDirections.map((direction, index) => (
              <div key={index}>
                {/* <input type="text" /> */}
                <p>Route {index + 1}</p>
                <p className="font-semibold">Origin:</p>{" "}
                <p className="text-xs">{direction.request.origin.query}</p>
                <p className="font-semibold">Destination:</p>
                <p className="text-xs">{direction.request.destination.query}</p>
                <button className=" rounded-md  border-2 p-1">
                  <BsTrash3 />
                </button>
                {/* {isHidden ? (
                  <button
                    // onClick={() => setIsHidden(true)}
                    className=" rounded-md  border-2 p-1"
                  >
                    <MdOutlineVisibility />
                  </button>
                ) : (
                  <button
                    // onClick={() => setIsHidden(false)}
                    className=" rounded-md  border-2 p-1"
                  >
                    <AiOutlineEyeInvisible />
                  </button>
                )} */}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </Tab.Panel>
  )
}

export default Driving
