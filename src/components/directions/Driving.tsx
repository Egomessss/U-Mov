import { Tab } from "@headlessui/react"
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Autocomplete } from "@react-google-maps/api"
import React, { useContext, useEffect, useState, useRef } from "react"
import { DrivingContext } from "../../context/DrivingContextProvider"
import results from "../../../public/results.json"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { MdOutlineVisibility } from "react-icons/md"
import { BsTrash3 } from "react-icons/bs"
import { GrDirections } from "react-icons/gr"
import Tooltip from "../Tooltip"
import { IoSettingsOutline } from "react-icons/io5"
import axios from "axios"

import drivingData from "../../../public/drivingData.json"
function Driving() {
  const { drivingDirections, setDrivingDirections } = useContext(DrivingContext)
  const [fetchedDrivingDirections, setFetchedDrivingDirections] =
    useState(drivingData)
  console.log(fetchedDrivingDirections.length)

  const [compareMultipleHouses, setCompareMultipleHouses] = useState(false)
  // console.log(fetchedDrivingDirections)

  // ! origin and destination refs

  /** @type React.MutableRefObject<HTMLInputElement> */
  const mainOriginRef = useRef()

  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef()
  // console.log(destinationRef.current.value)

  const numberOfTravelsRef = useRef()

  //! units
  const [units, setUnits] = useState("IMPERIAL")
  // console.log(units)

  const handleUnitsMeasure = (e) => {
    setUnits(e.target.value)
  }

  // ! travel mode
  const [selectedTravelMode, SetSelectedTravelMode] = useState("DRIVE")
  // console.log(selectedTravelMode)

  const handleSelectedTravelMode = (e) => SetSelectedTravelMode(e.target.value)

  // ! Engine Type
  const [selectedEngineType, SetSelectedEngineType] = useState("GASOLINE")
  // console.log(selectedEngineType)

  const handleSelectedEngineType = (e) => SetSelectedEngineType(e.target.value)

  // ! consumption

  const [litersConsumed, setLitersConsumed] = useState(0)
  // console.log(litersConsumed)

  const handleLitersConsumed = (e) => setLitersConsumed(e.target.value)

  const [wattsConsumed, setWattsConsumed] = useState(0)
  // console.log(wattsConsumed)

  const handleWattsConsumed = (e) => setWattsConsumed(e.target.value)
  //! traffic

  const [trafficPreference, setTrafficPreference] = useState("TRAFFIC_UNAWARE")
  // console.log(trafficPreference)

  const handleTraffic = (e) => {
    const isChecked = e.target.checked
    if (isChecked) {
      setTrafficPreference("TRAFFIC_AWARE")
    } else {
      setTrafficPreference("TRAFFIC_UNAWARE")
    }
  }

  //! tolls
  const [tollsPreference, setTollsPreference] = useState(false)
  // console.log(tollsPreference)

  const handleTolls = (e) => {
    const isChecked = e.target.checked
    if (isChecked) {
      setTollsPreference(true)
    } else {
      setTollsPreference(false)
    }
  }

  //! highways
  const [highwaysPreference, setHighwaysPreference] = useState(false)
  // console.log(highwaysPreference)

  const handleHighways = (e) => {
    const isChecked = e.target.checked
    if (isChecked) {
      setHighwaysPreference(true)
    } else {
      setHighwaysPreference(false)
    }
  }

  const [featuresOpen, setFeaturesOpen] = useState(false)

  // ! fetch route

  // ! add one origin or origins
  // ! add destinations

  // ! button for comparing uses the destinations autocomplete to save autocomplete requests
  //! create an array for the origins
  //! create an array for the destinations

  // ! button to add a new oriign using differnt destinations config
  // ! button to add a new oriign using the same destinations config
  // ! iterate over the origins and destinations and fetch the routes, usin gthe fetch data

  const fetchData = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": "AIzaSyAC-ZmHeOUM6VvIDtbc8y_sfKG-Lh7ZgME",
        "X-Goog-FieldMask":
          "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
      },
    }

    const data = {
      origin: {
        address: mainOriginRef.current.value,
      },
      destination: {
        address: destinationRef.current.value,
      },
      travelMode: selectedTravelMode,
      routingPreference: trafficPreference,
      routeModifiers: {
        avoidTolls: tollsPreference,
        avoidHighways: highwaysPreference,
      },
      units: units,
    }

    axios
      .post(
        "https://routes.googleapis.com/directions/v2:computeRoutes",
        data,
        config
      )
      .then((response) => {
        const data = response.data

        const modifiedData = {
          "Origin 1": [
            {
              isVisible: true,
              origin: mainOriginRef.current.value,
              destination: destinationRef.current.value,
              duration: data.routes[0].duration,
              distance: data.routes[0].distanceMeters,
              polyline: data.routes[0].polyline.encodedPolyline,
            },
          ],
        }
        setFetchedDrivingDirections(modifiedData)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  //! add data to routes
  // const addDataToRoutes = (data) => {

  // }

  //!
  const handleRemoveDestination = (index) => {
    const newAddresses = [...destinationAddresses]
    newAddresses.splice(index, 1)
    setDestinationAddresses(newAddresses)
  }

  // ! hide directions
  const hideDirections = (index) => {
    const updatedDirections = drivingDirections.map((route) => {
      if (route.request.destination.query === index) {
        return { ...route, visible: false }
      }
      return route
    })
    setDrivingDirections(updatedDirections)
  }

  // ! unhide directions
  const unhideDirections = (index) => {
    const updatedDirections = drivingDirections.map((route) => {
      if (route.request.destination.query === index) {
        return { ...route, visible: true }
      }
      return route
    })
    setDrivingDirections(updatedDirections)
  }

  // ! delete route

  const handleDeleteRoute = (indexToDelete) => {
    setDirections((prev) => {
      return { ...prev }
    })
    const updatedDirections = [...directions]
    // console.log(updatedDirections)
    updatedDirections.splice(indexToDelete, 1)
    setDirections(updatedDirections)
  }

  return (
    <Tab.Panel>
      <Tab.Group>
        <Tab.List className="flex w-full justify-between">
          <Tab
            onClick={() => setFeaturesOpen((prev) => !prev)}
            // className="btn-success btn w-1/2 gap-x-2"
            className={
              featuresOpen
                ? "btn-success btn flex w-[48%] items-center gap-2"
                : "btn-outline  btn flex w-[48%] items-center gap-2"
            }
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
              <button
                // onClick={() => setDrivingDirections(results)}
                onClick={() => fetchData()}
              >
                Click me
              </button>
              <div
                className="flex flex-col gap-2"
                // action=""
              >
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">
                      Add a address for this main location
                    </span>
                  </label>
                  <Autocomplete>
                    <input
                      type="text"
                      placeholder="Enter the address"
                      className="input-bordered input-accent input w-full bg-white"
                      ref={mainOriginRef}
                    />
                  </Autocomplete>
                </div>
                {/* destinations */}
                {compareMultipleHouses && (
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text">
                        Use Previous Destinations
                      </span>
                    </label>

                    <label className="label cursor-pointer">
                      <span className="label-text">Avoid Highways</span>
                      <input
                        type="checkbox"
                        className="checkbox-accent checkbox"
                      />
                    </label>
                  </div>
                )}
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">
                      Add a address for this destination
                    </span>
                  </label>
                  <Autocomplete>
                    <input
                      type="text"
                      placeholder="Enter the address"
                      className="input-bordered input-accent input w-full bg-white"
                      ref={destinationRef}
                    />
                  </Autocomplete>
                </div>
                <input
                  type="text"
                  placeholder="Number of travels per month"
                  className="input-bordered input-accent input w-full bg-white"
                  ref={numberOfTravelsRef}
                />
                {/* <button
                  onClick={handleNewDestination}
                  className="btn-success btn"
                >
                  Add Destination
                </button> */}
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">Units</span>
                  </label>
                  <select
                    className="select-accent select w-full bg-white "
                    onChange={handleUnitsMeasure}
                  >
                    <option value="Metric">Metric</option>
                    <option value="Imperial">Imperial</option>
                  </select>
                </div>
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">Pick travel mode:</span>
                  </label>
                  <select
                    className="select-accent select w-full bg-white "
                    onChange={handleSelectedTravelMode}
                  >
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
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">
                      Take Live Traffic Into Consideration?
                    </span>
                    <input
                      type="checkbox"
                      className="checkbox-accent checkbox"
                      onChange={handleTraffic}
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Avoid tolls?</span>
                    <input
                      type="checkbox"
                      className="checkbox-accent checkbox"
                      onChange={handleTolls}
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Avoid Highways?</span>
                    <input
                      type="checkbox"
                      className="checkbox-accent checkbox"
                      onChange={handleHighways}
                    />
                  </label>
                </div>

                {/* <button className="btn-success btn w-full">Add Route</button>
                <button
                  onClick={() => setCompareMultipleHouses(prev)}
                  className="btn-success btn w-full"
                >
                  Compare Multiple Houses
                </button> */}
                <button
                  onClick={() => fetchData()}
                  className="btn-success btn w-full"
                >
                  Fetch data
                </button>
              </div>
            </div>
            {/* routes */}
          </Tab.Panel>
          {/* routes */}
          <Tab.Panel className="h-[900px] overflow-y-scroll pt-4">
            {/* fetchedDrivingDirections.length > 0 && */}
            {Object.values(fetchedDrivingDirections).map((house, index) => {
              return (
                <div key={index}>
                  <h2>
                    House {index + 1} {house[0].origin}
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {house.map((route, subIndex) => {
                      console.log(route)
                      return (
                        <li
                          className="border-b-2 pb-4"
                          key={route.distance}
                        >
                          <span>Edit: Route {subIndex + 1}</span>
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                              <span>{route.destination}</span>
                            </div>
                          </div>{" "}
                          <div className="flex items-center">
                            {" "}
                            <button
                              // onClick={handleRemoveDestination}
                              className="rounded-md px-2"
                            >
                              <TrashIcon className="text-orange h-6" />
                            </button>
                            {route.isVisible ? (
                              <button
                                // onClick={() =>
                                //   showDirections(direction.request.destination.query)
                                // }
                                className=" rounded-md  border-2 p-1"
                              >
                                <MdOutlineVisibility />
                              </button>
                            ) : (
                              <button
                                // onClick={() =>
                                //   hideDirections(direction.request.destination.query)
                                // }
                                className=" rounded-md  border-2 p-1"
                              >
                                <AiOutlineEyeInvisible />
                              </button>
                            )}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Tab.Panel>
  )
}

export default Driving
