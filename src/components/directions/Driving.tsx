import { Tab } from "@headlessui/react"
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Autocomplete } from "@react-google-maps/api"
import React, { useContext, useEffect, useState, useRef } from "react"
import { createContext } from "vm"
import { DrivingContext } from "../../context/DrivingContextProvider"
import results from "../../../public/results.json"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { MdOutlineVisibility } from "react-icons/md"
import { BsTrash3 } from "react-icons/bs"
import { GrDirections } from "react-icons/gr"
import Tooltip from "../Tooltip"
import { IoSettingsOutline } from "react-icons/io5"

function Driving() {
  const { drivingDirections, setDrivingDirections } = useContext(DrivingContext)
  const [origins, setOrigins] = useState<{}[]>([])
  console.log(origins)

  // ! origin
  /** @type React.MutableRefObject<HTMLInputElement> */
  const mainOriginNameRef = useRef()

  /** @type React.MutableRefObject<HTMLInputElement> */
  const mainOriginRef = useRef()
  // console.log(mainOriginRef.current.value)

  const handleOrigins = () => {
    if (
      mainOriginNameRef.current.value !== "" &&
      mainOriginRef.current.value !== ""
    ) {
      const newAddress = {
        name: mainOriginNameRef.current.value.trim(),
        address: mainOriginRef.current.value.trim(),
      }
      setOrigins([...origins, newAddress])
      mainOriginNameRef.current.value = ""
      mainOriginRef.current.value = ""
    }
  }

  // ! destinations
  const [drivingDestinations, setDrivingDestinations] = useState<{}[]>([]) // initialize state with an empty array
  console.log(drivingDestinations)

  const [travelsPerMonth, setTravelsPerMonth] = useState(0) 
  console.log(travelsPerMonth)

  const handleTravelsPerMonth = (e) => setTravelsPerMonth(e.target.value)

  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationNameRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef()

  const handleNewDestination = () => {
    if (
      destinationNameRef.current.value !== "" &&
      destinationRef.current.value !== ""
    ) {
      const newAddress = {
        name: destinationNameRef.current.value.trim(),
        address: destinationRef.current.value.trim(),
      }
      setDrivingDestinations([...drivingDestinations, newAddress])
      destinationNameRef.current.value = ""
      destinationRef.current.value = ""
      setTravelsPerMonth(0)
    }
  }
  // ! travel mode
  const [selectedTravelMode, SetSelectedTravelMode] = useState("DRIVE")
  console.log(selectedTravelMode)

  const handleSelectedTravelMode = (e) => SetSelectedTravelMode(e.target.value)

  // ! Engine Type
  const [selectedEngineType, SetSelectedEngineType] = useState("GASOLINE")
  console.log(selectedEngineType)

  const handleSelectedEngineType = (e) => SetSelectedEngineType(e.target.value)

  // ! consumption

  const [litersConsumed, setLitersConsumed] = useState(0)
  console.log(litersConsumed)
  const [wattsConsumed, setWattsConsumed] = useState(0)
  console.log(wattsConsumed)

  const handleLitersConsumed = (e) => setLitersConsumed(e.target.value)
  const handleWattsConsumed = (e) => setWattsConsumed(e.target.value)

  const [featuresOpen, setFeaturesOpen] = useState(false)

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
            className="btn-success btn w-1/2 gap-x-2"
            // className={
            //   featuresOpen
            //     ? "flex w-1/2 items-center gap-2 rounded-lg border-2 bg-blue-500 px-4 py-2"
            //     : "flex w-1/2 items-center gap-2 rounded-lg bg-blue-500 px-4 py-2"
            // }
          >
            <span>Options</span>
            <IoSettingsOutline className="text-xl" />
          </Tab>
          <Tab
            className="btn-success btn w-1/2 gap-x-2"
            // className={
            //   featuresOpen
            //     ? "bg-blue flex w-1/2 items-center gap-2 rounded-lg border-2 px-4 py-2"
            //     : "flex w-1/2 items-center gap-2 rounded-lg bg-blue-500 px-4 py-2"
            // }
          >
            <span>Routes</span>
            <GrDirections className="text-xl" />
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
              {/* <label
                className="font-bold"
                htmlFor="home-input"
              >
                Main address
              </label>
              <input
                className="border-lightgray  w-full border-b-2 bg-white px-2"
                type="text"
                placeholder="Add a name for this main location"
                id="job-input"
                ref={mainOriginNameRef}
              /> */}
              <div className="flex flex-col gap-2">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">
                      Add a name and address for this main location
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Add a name for this location"
                    className="input-bordered input-accent input w-full bg-white"
                    ref={mainOriginNameRef}
                  />
                </div>

                <Autocomplete>
                  <input
                    type="text"
                    placeholder="Enter the address"
                    className="input-bordered input-accent input w-full bg-white"
                    ref={mainOriginRef}
                  />
                </Autocomplete>
                <button
                  onClick={handleOrigins}
                  className="btn-success btn"
                >
                  Add main location
                </button>
              </div>
              {/* destinations */}
              <div className="flex flex-col gap-2">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">
                      Add a name and address for this destination
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Add a name for this location"
                    className="input-bordered input-accent input w-full bg-white"
                    ref={destinationNameRef}
                  />
                </div>

                <Autocomplete>
                  <input
                    type="text"
                    placeholder="Enter the address"
                    className="input-bordered input-accent input w-full bg-white"
                    ref={destinationRef}
                  />
                </Autocomplete>
                <input
                  type="text"
                  placeholder="Number of travels per month"
                  className="input-bordered input-accent input w-full bg-white"
                  onChange={handleTravelsPerMonth}
                />
                <button
                  onClick={handleNewDestination}
                  className="btn-success btn"
                >
                  Add main location
                </button>
              </div>
              {/* <label
                className="font-bold"
                htmlFor="job-input"
              >
                Destinations
              </label>
              <input
                className="border-lightgray  w-full border-b-2 bg-white px-2"
                type="text"
                placeholder="Add a name for this destination"
                id="job-input"
                ref={destinationNameRef}
              />
              <Autocomplete>
                <input
                  className="border-lightgray  w-full border-b-2 bg-white px-2"
                  type="text"
                  placeholder="Add a destination address"
                  id="job-input"
                  ref={destinationRef}
                />
              </Autocomplete>
              <input
                className="border-lightgray  w-full border-b-2 bg-white px-2"
                type="number"
                placeholder="Number of travels per month"
                id="job-input"
                // ref={destinationRef}
              />

              <button
                onClick={handleNewDestination}
                className="rounded-lg bg-blue-500 px-4 py-2"
              >
                Add destination
              </button> */}
              <form
                className="flex flex-col gap-2"
                // onSubmit={handleNewDestinationAddress}
              >
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">Pick travel mode:</span>
                  </label>
                  <select
                    className="select-accent select w-full bg-white "
                    onChange={handleSelectedTravelMode}
                  >
                    <option
                      disabled
                      selected
                    >
                      Pick travel mode:
                    </option>
                    <option value="DRIVE">Car</option>
                    <option value="TWO_WHEELER">
                      Two-wheeled, motorized vehicle
                    </option>
                  </select>
                </div>

                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">Type of engine</span>
                  </label>
                  <select
                    className="select-accent select w-full bg-white "
                    onChange={handleSelectedEngineType}
                  >
                    <option
                      disabled
                      selected
                    >
                      Select Type of engine
                    </option>
                    <option value="GASOLINE">
                      Gasoline/petrol fueled vehicle
                    </option>
                    <option value="ELECTRIC">
                      Electricity powered vehicle
                    </option>
                    <option value="HYBRID">Hybrid fuel vehicle</option>
                    <option value="DRIVE">Premium diesel</option>
                    <option value="DIESEL"> Diesel fueled vehicle</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label
                      className="font-bold"
                      htmlFor="consumption"
                    >
                      Consumption
                    </label>
                    <Tooltip
                      color={"blue"}
                      text={"Hellogfdddddddddddddho"}
                      type={"info"}
                    />
                  </div>
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text">
                        What is your consumption?
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="liters/km"
                      className="input-bordered input-accent input w-full bg-white"
                      onChange={handleLitersConsumed}
                    />
                  </div>

                  {(selectedEngineType === "HYBRID" ||
                    selectedEngineType === "ELECTRIC") && (
                    <input
                      type="text"
                      placeholder="kwh/km"
                      className="input-bordered input-accent input w-full bg-white"
                      onChange={handleWattsConsumed}
                    />
                  )}
                </div>
                {/* <div>
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
                </div> */}
                <div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Avoid tolls</span>
                      <input
                        type="checkbox"
                        className="checkbox-accent checkbox"
                      />
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Avoid Highways</span>
                      <input
                        type="checkbox"
                        className="checkbox-accent checkbox"
                      />
                    </label>
                  </div>

                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text">Units</span>
                    </label>
                    <select className="select-accent select w-full bg-white ">
                      <option
                        disabled
                        selected
                      >
                        Units
                      </option>
                      <option>METRIC</option>
                      <option>IMPERIAL</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            {/* routes */}
          </Tab.Panel>
          {/* routes */}
          <Tab.Panel className="h-[900px] overflow-y-scroll pt-4">
            <div>
              <h2>Origins:</h2>
              <ul className="flex flex-col gap-2">
                {origins.map(({ name, address }) => {
                  return (
                    <li
                      className="border-b-2 pb-4"
                      key={address}
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
                  )
                })}
              </ul>
            </div>
            <div>
              <h2>Destinations:</h2>
              <ul className="flex flex-col gap-2">
                {drivingDestinations.map(({ id, name, address }) => (
                  <li
                    className="border-b-2 pb-4"
                    key={address}
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
        </Tab.Panels>
      </Tab.Group>
    </Tab.Panel>
  )
}

export default Driving
