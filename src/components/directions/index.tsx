import React, { Fragment, useContext, useEffect, useState, useRef } from "react"
import { Popover, Tab, Transition } from "@headlessui/react"
import { GrDirections } from "react-icons/gr"
import {
  MdDirectionsCar,
  MdDirectionsBusFilled,
  MdOutlineDirectionsBike,
  MdDirectionsWalk,
  MdDirections,
} from "react-icons/md"
import Driving from "./routes"
import PublicTransport from "./PublicTransport"
import Tooltip from "../Tooltip"
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Autocomplete } from "@react-google-maps/api"

import { DrivingContext } from "../../context/DrivingContextProvider"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { MdOutlineVisibility } from "react-icons/md"
import { BsTrash3 } from "react-icons/bs"
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

  // const [travelMode, setTravelMode] = useState("DRIVE")

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

  console.log(Object.keys(routesFormData).map((house) => routesFormData[house]))

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

  const fetchData = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": "AIzaSyAC-ZmHeOUM6VvIDtbc8y_sfKG-Lh7ZgME",
        "X-Goog-FieldMask":
          "routes.distanceMeters,routes.duration,routes.polyline",
      },
    }
    const data = {
      origin: {
        address: "Algés, Portugal",
      },
      destination: {
        address: "Moscavide, Portugal",
      },
      intermediates: [{ address: "Oriente, Lisboa, Portugal" }],
      travelMode: "DRIVE",
      routeModifiers: {
        avoidTolls: true,
        avoidHighways: true,
        avoidFerries: true,
      },
    }

    axios
      .post(
        "https://routes.googleapis.com/directions/v2:computeRoutes",
        data,
        config
      )
      .then((response) => {
        console.log(response.data)
        // Rest of the code
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // const fetchData = async () => {
  //   try {
  //     const promises = Object.entries(fetchedData).flatMap(
  //       ([route, destinations]) => {
  //         return destinations.map(({ origin, destination }) => {
  //           const config = {
  //             headers: {
  //               "Content-Type": "application/json",
  //               "X-Goog-Api-Key": "AIzaSyAC-ZmHeOUM6VvIDtbc8y_sfKG-Lh7ZgME",
  //               "X-Goog-FieldMask":
  //                 "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
  //             },
  //           }
  //           const data = {
  //             origin: {
  //               address: origin,
  //             },
  //             destination: {
  //               address: destination,
  //             },
  //             travelMode: "DRIVE",
  //           }

  //           const apiUrl =
  //             "https://routes.googleapis.com/directions/v2:computeRoutes"

  //           return axios
  //             .post(apiUrl, data, config)
  //             .then((response) => {
  //               const routeData = response.data.routes[0]
  //               const distance = routeData.distanceMeters
  //               const duration = routeData.duration
  //               const encodedPolyline = routeData.polyline.encodedPolyline
  //               return {
  //                 route,
  //                 origin,
  //                 destination,
  //                 distance,
  //                 duration,
  //                 encodedPolyline,
  //                 isVisible: true,
  //               }
  //             })
  //             .catch((error) => {
  //               console.error(
  //                 `Error fetching data for route ${route}, origin ${origin}, destination ${destination}:`,
  //                 error
  //               )
  //               return {
  //                 route,
  //                 origin,
  //                 destination,
  //                 distance: null,
  //                 duration: null,
  //                 encodedPolyline: null,
  //                 isVisible: true,
  //               }
  //             })
  //         })
  //       }
  //     )

  //     const results = await Promise.all(promises)
  //     const updatedRoutesData = results.reduce((acc, result) => {
  //       const {
  //         route,
  //         origin,
  //         destination,
  //         distance,
  //         duration,
  //         encodedPolyline,
  //         isVisible,
  //       } = result
  //       if (!acc[route]) {
  //         acc[route] = []
  //       }
  //       acc[route].push({
  //         origin,
  //         destination,
  //         distance,
  //         duration,
  //         encodedPolyline,
  //         isVisible,
  //       })
  //       return acc
  //     }, {})
  //     setFetchedData(updatedRoutesData)
  //   } catch (error) {
  //     console.error("Error fetching data:", error)
  //   }
  // }

  // Function to hide directions

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
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button className="bg-lightgray text-orange flex  h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-blue-500">
            <GrDirections className="text-xl" />
            <span className="text-sm">Directions</span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-x-1"
            enterTo="opacity-100 translate-x-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-1"
          >
            <Popover.Panel className="absolute left-24 top-0 h-full  w-96 rounded-3xl  bg-white p-4 text-black">
              <div className="btn-success btn w-full gap-x-4 ">
                <span>Routes</span>
                <GrDirections className="text-xl" />
              </div>

              <Tab.Group>
                <Tab.List className="flex justify-evenly pt-4">
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

                <Tab.Panels className="h-[90%] w-full overflow-y-scroll">
                  {Object.keys(routesFormData).map((house) => {
                    const houseNumber = house.split(" ")[1]
                    const houseRoutes = routesFormData[house]
                    if (houseRoutes.length > 0) {
                      return (
                        <Tab.Panel>
                          <div className="w-full py-4 ">
                            <Autocomplete>
                              <input
                                type="text"
                                placeholder="Enter the house address..."
                                className="input-bordered input-accent input input-md w-full bg-white"

                                // ref={originRefs[houseNumber]}
                              />
                            </Autocomplete>
                            <FiArrowDown className="my-4 w-full text-center text-2xl" />

                            <ul className="flex h-1/2 flex-col gap-2">
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
                                    </div>
                                    <h2>Travel mode:</h2>
                                    <div className="flex flex-wrap ">
                                      <div className="form-control w-1/2">
                                        <label className="label cursor-pointer">
                                          <span className="label-text flex items-center gap-2">
                                            <span>Car</span>
                                            <MdDirectionsCar />
                                          </span>
                                          <input
                                            type="checkbox"
                                            className="checkbox-success checkbox"
                                          />
                                        </label>
                                      </div>
                                      <div className="form-control w-1/2">
                                        <label className="label cursor-pointer">
                                          <span className="label-text flex items-center gap-2">
                                            <span className="whitespace-nowrap">
                                              Public Transport
                                            </span>
                                            <MdDirectionsBusFilled />
                                          </span>
                                          <input
                                            type="checkbox"
                                            className="checkbox-success checkbox"
                                          />
                                        </label>
                                      </div>
                                      <div className="form-control w-1/2">
                                        <label className="label cursor-pointer">
                                          <span className="label-text flex items-center gap-2">
                                            <span>Bicycle</span>
                                            <MdOutlineDirectionsBike />
                                          </span>
                                          <input
                                            type="checkbox"
                                            className="checkbox-success checkbox"
                                          />
                                        </label>
                                      </div>
                                      <div className="form-control w-1/2">
                                        <label className="label cursor-pointer">
                                          <span className="label-text flex items-center gap-2">
                                            <span>Walk</span>
                                            <MdDirectionsWalk />
                                          </span>
                                          <input
                                            type="checkbox"
                                            className="checkbox-success checkbox"
                                          />
                                        </label>
                                      </div>
                                    </div>
                                   { <div>
                                      <h2>Prefer:</h2>
                                      <div className="flex flex-wrap ">
                                        <div className="flex gap-2">
                                          <input
                                            type="text"
                                            placeholder="Enter departure time..."
                                            className="input-bordered input-accent input input-md w-full bg-white"

                                            // ref={originRefs[houseNumber]}
                                          />
                                          <input
                                            type="text"
                                            placeholder="Enter arrival time..."
                                            className="input-bordered input-accent input input-md w-full bg-white"

                                            // ref={originRefs[houseNumber]}
                                          />
                                        </div>

                                        <div className="form-control w-1/2">
                                          <label className="label cursor-pointer">
                                            <span className="label-text flex items-center gap-2">
                                              <span>Bus</span>
                                              <MdDirectionsCar />
                                            </span>
                                            <input
                                              type="checkbox"
                                              className="checkbox-success checkbox"
                                            />
                                          </label>
                                        </div>
                                        <div className="form-control w-1/2">
                                          <label className="label cursor-pointer">
                                            <span className="label-text flex items-center gap-2">
                                              <span className="whitespace-nowrap">
                                                Rail
                                              </span>
                                              <MdDirectionsBusFilled />
                                            </span>
                                            <input
                                              type="checkbox"
                                              className="checkbox-success checkbox"
                                            />
                                          </label>
                                        </div>
                                        <div className="form-control w-1/2">
                                          <label className="label cursor-pointer">
                                            <span className="label-text flex items-center gap-2">
                                              <span>Subway</span>
                                              <MdOutlineDirectionsBike />
                                            </span>
                                            <input
                                              type="checkbox"
                                              className="checkbox-success checkbox"
                                            />
                                          </label>
                                        </div>
                                        <div className="form-control w-1/2">
                                          <label className="label cursor-pointer">
                                            <span className="label-text flex items-center gap-2">
                                              <span>Train</span>
                                              <MdDirectionsWalk />
                                            </span>
                                            <input
                                              type="checkbox"
                                              className="checkbox-success checkbox"
                                            />
                                          </label>
                                        </div>
                                        <div className="form-control w-1/2">
                                          <label className="label cursor-pointer">
                                            <span className="label-text flex items-center gap-2">
                                              <span>Tram</span>
                                              <MdDirectionsWalk />
                                            </span>
                                            <input
                                              type="checkbox"
                                              className="checkbox-success checkbox"
                                            />
                                          </label>
                                        </div>
                                      </div>
                                      <h2>Preference:</h2>
                                      <div className="flex">
                                        <div className="form-control w-1/2">
                                          <label className="label cursor-pointer">
                                            <span className="label-text flex items-center gap-2">
                                              <span>Fewer transfers</span>
                                            </span>
                                            <input
                                              type="checkbox"
                                              className="checkbox-success checkbox"
                                            />
                                          </label>
                                        </div>
                                        <div className="form-control w-1/2">
                                          <label className="label cursor-pointer">
                                            <span className="label-text flex items-center gap-2">
                                              <span>Less walking</span>
                                            </span>
                                            <input
                                              type="checkbox"
                                              className="checkbox-success checkbox"
                                            />
                                          </label>
                                        </div>
                                      </div>
                                    </div>}

                                    <div className="flex items-center">
                                      <div className="form-control w-1/2 ">
                                        <label className="label">
                                          <span className="label-text">
                                            Type of engine
                                          </span>
                                        </label>
                                        <select
                                          className="select-accent select select-sm w-full bg-white text-xs "
                                          onChange={handleSelectedEngineType}
                                        >
                                          <option value="GASOLINE">
                                            Gasoline
                                          </option>
                                          <option value="ELECTRIC">
                                            Electric
                                          </option>
                                          <option value="HYBRID">Hybrid</option>
                                          <option value="DIESEL">
                                            {" "}
                                            Diesel
                                          </option>
                                        </select>
                                      </div>
                                      <div className="form-control  w-1/2 ">
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
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default Routes
