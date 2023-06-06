import { Tab } from "@headlessui/react"
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Autocomplete } from "@react-google-maps/api"
import React, { useContext, useEffect, useState, useRef } from "react"
import { DrivingContext } from "../../context/DrivingContextProvider"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { MdOutlineVisibility } from "react-icons/md"
import { BsTrash3 } from "react-icons/bs"
import { GrDirections } from "react-icons/gr"
import Tooltip from "../Tooltip"
import { IoSettingsOutline } from "react-icons/io5"
import { FiArrowDown } from "react-icons/fi"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import axios from "axios"

import formsData from "../../../public/formsData.json"
import drivingData from "../../../public/drivingData.json"
import drivingDataPromise from "../../../public/drivingDataPromise.json"
function Routes() {
  // const { drivingDirections, setDrivingDirections } = useContext(DrivingContext)
  const [routesFormData, setRoutesFormData] = useState(formsData)
  // console.log(routesFormData)

  const [fetchedDrivingDirections, setFetchedDrivingDirections] = useState()
  // console.log(fetchedDrivingDirections)

  //! units
  const [units, setUnits] = useState("IMPERIAL")
  // console.log(units)

  const handleUnitsMeasure = (e) => {
    setUnits(e.target.value)
  }

  const handleOrigin = (e, houseNumber, index) => {
    const updatedOrigin = routesFormData[`House ${houseNumber}`].map(
      (route) => {
        if (route.id === index) {
          return { ...route, origin: e.target.value }
        }
        return route
      }
    )

    const updatedRoutesFormData = {
      ...routesFormData,
      [`House ${houseNumber}`]: updatedOrigin,
    }

    setRoutesFormData(updatedRoutesFormData)
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
  //? add fuel consumption


  const hideDirections = (house, index) => {
    // Update the state using the setRoutesFormData function
    setRoutesFormData((prev) => {
      return { ...prev }
    })

    // Access the data for the specified house
    const houseData = routesFormData[house]
    console.log(houseData)

    // Create updated directions by mapping over the house data
    const updatedDirections = houseData.map((route) => {
      // If the route's destination matches the index, hide it by updating the isVisible property to false
      if (route.destination === index) {
        return { ...route, isVisible: false }
      }
      return route
    })

    // Create updated routes form data by merging the updated directions with the existing data
    const updatedRoutesFormData = {
      ...routesFormData,
      [house]: updatedDirections,
    }

    // Update the state with the updated routes form data
    setRoutesFormData(updatedRoutesFormData)
  }

  // Function to unhide directions
  const unhideDirections = (house, index) => {
    // Update the state using the setRoutesFormData function
    setRoutesFormData((prev) => {
      return { ...prev }
    })

    // Access the data for the specified house
    const houseData = routesFormData[house]

    // Create updated directions by mapping over the house data
    const updatedDirections = houseData.map((route) => {
      // If the route's destination matches the index, unhide it by updating the isVisible property to true
      if (route.destination === index) {
        return { ...route, isVisible: true }
      }
      return route
    })

    // Create updated routes form data by merging the updated directions with the existing data
    const updatedRoutesFormData = {
      ...routesFormData,
      [house]: updatedDirections,
    }

    // Update the state with the updated routes form data
    setRoutesFormData(updatedRoutesFormData)
  }

  // ! delete route

  const handleDeleteRoute = (house, indexToDelete) => {
    // Refresh the state to trigger a re-render
    setRoutesFormData((prev) => {
      return { ...prev }
    })

    // Get the route data for the specific house
    const houseData = routesFormData[house]

    // Remove the route at the specified index
    houseData.splice(indexToDelete, 1)

    // Create an updated object with the modified route data
    const updatedRoutesFormData = { ...routesFormData, [house]: houseData }

    // Update the state with the updated route data
    setRoutesFormData(updatedRoutesFormData)
  }

  return (
    <div className="h-full">
      <Tab.Group>
        <Tab.List className="flex justify-evenly ">
          {Object.keys(routesFormData).map((house) => {
            const houseNumber = house.split(" ")[1]
            const houseRoutes = routesFormData[house]
            if (houseRoutes.length > 0) {
              return (
                <Tab key={houseNumber}>
                  <button
                    // onClick={() => handleHouseButtonClick(houseNumber)}
                    className="btn-success btn-sm btn"
                  >
                    House {houseNumber}
                  </button>
                </Tab>
              )
            }
            return null // Skip rendering for empty houses
          })}
        </Tab.List>
        <Tab.Panels className="h-full">
          {Object.keys(routesFormData).map((house) => {
            const houseNumber = house.split(" ")[1]
            const houseRoutes = routesFormData[house]
            if (houseRoutes.length > 0) {
              return (
                <Tab.Panel className="">
                  <div className="py-4">
                    <div className="flex w-full flex-col items-center justify-center">
                      <Autocomplete>
                        <input
                          type="text"
                          placeholder="Enter the house address..."
                          className="input-bordered input-accent input input-md w-full bg-white"

                          // ref={originRefs[houseNumber]}
                        />
                      </Autocomplete>
                      <FiArrowDown className="text-2xl" />
                    </div>

                    <ul className="flex flex-col gap-2 h-1/2">
                      {houseRoutes.map((route) => {
                        return (
                          <li
                            className="border-y-2 pb-4"
                            key={route.distance}
                          >
                            <div className="flex flex-col gap-2">
                              <Autocomplete>
                                <input
                                  type="text"
                                  placeholder="Enter the address for destination 1"
                                  className="input-bordered input-accent input input-sm w-full bg-white"
                                  // ref={destinationRefs[houseNumber][destination]}
                                />
                              </Autocomplete>
                            </div>{" "}
                            <div>
                              <h2>Travel Mode:</h2>
                              <div className="flex flex-wrap items-center">
                                <div className="form-control w-1/3 ">
                                  <label className="label">
                                    <span className="label-text">
                                      Travel mode:
                                    </span>
                                  </label>
                                  <select
                                    className="select-accent select select-sm w-full bg-white text-xs "
                                    onChange={handleSelectedTravelMode}
                                  >
                                    <option value="DRIVE">Car</option>
                                    <option value="TWO_WHEELER">
                                      Motorcycle
                                    </option>
                                  </select>
                                </div>
                                <div className="form-control w-[35%] ">
                                  <label className="label">
                                    <span className="label-text">
                                      Type of engine
                                    </span>
                                  </label>
                                  <select
                                    className="select-accent select select-sm w-full bg-white text-xs "
                                    onChange={handleSelectedEngineType}
                                  >
                                    <option value="GASOLINE">Gasoline</option>
                                    <option value="ELECTRIC">Electric</option>
                                    <option value="HYBRID">Hybrid</option>
                                    <option value="DIESEL"> Diesel</option>
                                  </select>
                                </div>
                                <div className="form-control  w-[30%] ">
                                  <label className="label">
                                    <span className="label-text">
                                      Consumption
                                    </span>
                                  </label>
                                  {/* <Tooltip
                                  color={"blue"}
                                  text={"Hellogfdddddddddddddho"}
                                  type={"info"}
                                /> */}

                                  <input
                                    type="text"
                                    placeholder="liters/km"
                                    className="input-bordered input-accent  input input-sm w-full bg-white text-xs"
                                    onChange={handleLitersConsumed}
                                  />
                                </div>

                                {(selectedEngineType === "HYBRID" ||
                                  selectedEngineType === "ELECTRIC") && (
                                  <input
                                    type="text"
                                    placeholder="kwh/km"
                                    className="input-bordered input-accent input input-sm w-1/3 bg-white"
                                    onChange={handleWattsConsumed}
                                  />
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="form-control ">
                                  <label className="label cursor-pointer">
                                    <span className="label-text pr-1 text-xs">
                                      Live Traffic
                                    </span>
                                    <input
                                      type="checkbox"
                                      className="checkbox-accent checkbox checkbox-xs"
                                      onChange={handleTraffic}
                                    />
                                  </label>
                                </div>

                                <div className="form-control ">
                                  <label className="label cursor-pointer">
                                    <span className="label-text pr-1 text-xs">
                                      Avoid tolls?
                                    </span>
                                    <input
                                      type="checkbox"
                                      className="checkbox-accent checkbox checkbox-xs"
                                      onChange={handleTolls}
                                    />
                                  </label>
                                </div>

                                <div className="form-control ">
                                  <label className="label cursor-pointer">
                                    <span className="label-text pr-1 text-xs">
                                      Avoid Highways?
                                    </span>
                                    <input
                                      type="checkbox"
                                      className="checkbox-accent checkbox checkbox-xs"
                                      onChange={handleHighways}
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <button
                                    onClick={() =>
                                      unhideDirections(
                                        `House ${houseNumber}`,
                                        route.destination
                                      )
                                    }
                                    className={`rounded-md border-2 p-1 ${
                                      route.isVisible && "bg-green-500"
                                    }`}
                                  >
                                    <MdOutlineVisibility />
                                  </button>
                                  <button
                                    onClick={() =>
                                      hideDirections(
                                        `House ${houseNumber}`,
                                        route.destination
                                      )
                                    }
                                    className={`rounded-md border-2 p-1 ${
                                      !route.isVisible && "bg-red-500"
                                    }`}
                                  >
                                    <AiOutlineEyeInvisible />
                                  </button>
                                </div>
                                <button
                                  onClick={() =>
                                    handleDeleteRoute(
                                      `House ${houseNumber}`,
                                      route.destination
                                    )
                                  }
                                  className="rounded-md px-2"
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
                </Tab.Panel>
              )
            }
            return null // Skip rendering for empty houses
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Routes
