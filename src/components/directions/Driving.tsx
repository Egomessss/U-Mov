import { Tab } from "@headlessui/react"
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Autocomplete } from "@react-google-maps/api"
import React, { useContext, useEffect, useState } from "react"
import { createContext } from "vm"
import { DrivingContext } from "../../context/DrivingContextProvider"
import results from "../../../public/results.json"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { MdOutlineVisibility } from "react-icons/md"
import { BsTrash3 } from "react-icons/bs"
import { GrDirections } from "react-icons/gr"

function Driving() {
  const { drivingDirections, setDrivingDirections } = useContext(DrivingContext)
  console.log(drivingDirections)

  const [destinationAddresses, setDestinationAddresses] = useState<{}[]>([]) // initialize state with an empty array

  const [newDestination, setNewDestination] = useState({
    name: "",
    address: "",
  })

  const [selectedTravelMode, SetSelectedTravelMode] = useState("DRIVE")

  const handleSelectedTravelMode = (e) => SetSelectedTravelMode(e.target.value)

  const [time, setTime] = useState("10:00")
  const [featuresOpen, setFeaturesOpen] = useState(false)
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
    const newAddresses = [...destinationAddresses]
    newAddresses.splice(index, 1)
    setDestinationAddresses(newAddresses)
  }

  useEffect(() => {}, [drivingDirections])

  const hideDirections = (index) => {
    const updatedDirections = drivingDirections.map((route) => {
      if (route.request.destination.query === index) {
        return { ...route, visible: false }
      }
      return route
    })
    setDrivingDirections(updatedDirections)
  }

  const unhideDirections = (index) => {
    const updatedDirections = drivingDirections.map((route) => {
      if (route.request.destination.query === index) {
        return { ...route, visible: true }
      }
      return route
    })
    setDrivingDirections(updatedDirections)
  }

  return (
    <Tab.Panel>
      <Tab.Group>
        <Tab.List className="flex w-full">
          <Tab
            className={
              featuresOpen
                ? "flex w-1/2 items-center gap-2 rounded-lg border-2 bg-blue-500 px-4 py-2"
                : "flex w-1/2 items-center gap-2 rounded-lg bg-blue-500 px-4 py-2"
            }
          >
            <span>Options</span>
            <GrDirections className="text-xl" />
          </Tab>
          <Tab
            className={
              featuresOpen
                ? "bg-blue flex w-1/2 items-center gap-2 rounded-lg border-2 px-4 py-2"
                : "flex w-1/2 items-center gap-2 rounded-lg bg-blue-500 px-4 py-2"
            }
          >
            Routes
          </Tab>
          <Tab
            className={
              featuresOpen
                ? "bg-blue flex w-1/2 items-center gap-2 rounded-lg border-2 px-4 py-2"
                : "flex w-1/2 items-center gap-2 rounded-lg bg-blue-500 px-4 py-2"
            }
          >
            Results
          </Tab>
        </Tab.List>
        <Tab.Panels>
          {/* routes */}
          <Tab.Panel>
            <div>
              <button onClick={() => setDrivingDirections(results)}>
                Click me
              </button>
              {/* 2nd phase options */}
              <form
                className="flex flex-col gap-2"
                onSubmit={handleDestinationAddress}
              >
                <label
                  className="font-bold"
                  htmlFor="home-input"
                >
                  Main address
                </label>
                <Autocomplete
                  onPlaceChanged={onPlaceChanged}
                  // onLoad={onLoad}
                >
                  <input
                    className="border-lightgray  w-full border-b-2 bg-white px-2"
                    type="text"
                    placeholder="Enter Your Home Address"
                    id="home-input"
                  />
                </Autocomplete>
                <label
                  className="font-bold"
                  htmlFor="job-input"
                >
                  Destinations
                </label>
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
                  placeholder="Add a destination address"
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
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 px-4 py-2"
                >
                  Add destination
                </button>
                <div>
                  <label
                    className="font-bold"
                    htmlFor="travelMode"
                  >
                    Pick travel mode:
                  </label>
                  <select
                    id="travelMode"
                    value={selectedTravelMode}
                    onChange={SetSelectedTravelMode}
                    className="w-full rounded-lg border-2 bg-white"
                  >
                    <option value="DRIVE">Car</option>
                    <option value="TWO_WHEELER">
                      Two-wheeled, motorized vehicle
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    className="font-bold"
                    htmlFor="typeEngine"
                  >
                    Type of engine
                  </label>
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
                  <label
                    className="font-bold"
                    htmlFor="consumption"
                  >
                    Consumption
                  </label>
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
                  <label
                    htmlFor="traffic"
                    className="font-bold"
                  >
                    Live traffic:
                  </label>
                  <select
                    value={selectedTravelMode}
                    onChange={SetSelectedTravelMode}
                    className="w-full rounded-lg border-2 bg-white"
                  >
                    <option value="WALK">TRAFFIC_AWARE</option>
                    <option value="BICYCLE">TRAFFIC_AWARE_OPTIMAL</option>
                  </select>
                </div>
                <div>
                  <div className="flex justify-between">
                    <label htmlFor="tolls">Avoid tolls</label>
                    <input
                      type="checkbox"
                      name=""
                      id="tolls"
                    />
                  </div>
                  <div className="flex justify-between">
                    <label htmlFor="highways">Avoid Highways</label>
                    <input
                      type="checkbox"
                      name=""
                      id="highways"
                    />
                  </div>

                  <div className="flex justify-between">
                    <label htmlFor="ferries">Avoid ferries</label>
                    <input
                      type="checkbox"
                      name=""
                      id="ferries"
                    />
                  </div>
                  <div className="flex justify-between">
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
          </Tab.Panel>
          {/* results */}
          <Tab.Panel className="">
            <ul className="flex h-[800px] flex-col gap-2 overflow-y-scroll pt-4">
              {drivingDirections.map((direction, index) => (
                <div key={index}>
                  {/* <input type="text" /> */}
                  <p>Route {index + 1}</p>
                  <p className="font-semibold">Origin:</p>{" "}
                  <p className="text-xs">{direction.request.origin.query}</p>
                  <p className="font-semibold">Destination:</p>
                  <p className="text-xs">
                    {direction.request.destination.query}
                  </p>
                  <button className=" rounded-md  border-2 p-1">
                    <BsTrash3 />
                  </button>
                  {direction.visible ? (
                    <button
                      onClick={() =>
                        hideDirections(direction.request.destination.query)
                      }
                      className=" rounded-md  border-2 p-1"
                    >
                      <AiOutlineEyeInvisible />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        unhideDirections(direction.request.destination.query)
                      }
                      className=" rounded-md  border-2 p-1"
                    >
                      <MdOutlineVisibility />
                    </button>
                  )}
                </div>
              ))}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Tab.Panel>
  )
}

export default Driving
