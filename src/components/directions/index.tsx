import React, { Fragment, useContext, useEffect, useState, useRef } from "react"

import { Popover, Tab, Transition } from "@headlessui/react"
import { GrDirections } from "react-icons/gr"
import {
  MdDirectionsCar,
  MdDirectionsBusFilled,
  MdOutlineDirectionsBike,
  MdDirectionsWalk,
  MdDirections,
  MdLocationOn,
  MdOutlineModeOfTravel,
  MdToll,
  MdOutlineRemoveRoad,
  MdTraffic,
} from "react-icons/md"
import { MdOutlineElectricBolt } from "react-icons/md"
import { FaGasPump } from "react-icons/fa"
import Driving from "./routes"
import PublicTransport from "./PublicTransport"
import Tooltip from "../Tooltip"
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Autocomplete } from "@react-google-maps/api"

import {
  AiFillCar,
  AiFillClockCircle,
  AiFillSetting,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineEyeInvisible,
} from "react-icons/ai"
import { IoMdBoat } from "react-icons/io"
import { GiPathDistance } from "react-icons/gi"
import { MdOutlineVisibility } from "react-icons/md"
import { BsArrowLeftRight, BsFillHouseDoorFill, BsTrash3 } from "react-icons/bs"
import { IoSettingsOutline } from "react-icons/io5"
import { FiArrowDown } from "react-icons/fi"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"

import axios from "axios"
import { DrivingContext } from "../../context/DrivingContextProvider"
import formsData from "../../../public/formsData.json"
import drivingData from "../../../public/drivingData.json"
import drivingDataPromise from "../../../public/drivingDataPromise.json"
import { time } from "console"
// !the button add route add the routes if its in the car routes, it add to car routes, if its in the other routes, it add to other routes, also a way to change the house based on the button clicked
//! pedndular routes make 4 api calls, one without traffic, one with traffic on departure, and back the same
//! pendular routes need to switch the origin and destination

function Routes() {
  // const { drivingDirections, setDrivingDirections } = useContext(DrivingContext)
  const [routesFormData, setRoutesFormData] = useState(formsData)
  // console.log(routesFormData)

  const [fetchedDrivingDirections, setFetchedDrivingDirections] = useState({
    "House 1": {
      Driving: [],
      Other: [],
    },

    "House 2": {
      Driving: [],
      Other: [],
    },
    "House 3": {
      Driving: [],
      Other: [],
    },
  })
  console.log(fetchedDrivingDirections)

  /** @type React.MutableRefObject<HTMLInputElement> */
  const mainOriginRef = useRef(null)
  // console.log(mainOriginRef.current?.value)

  /** @type React.MutableRefObject<HTMLInputElement> */
  const mainOriginTwoRef = useRef(null)
  // console.log(mainOriginRef.current?.value)

  /** @type React.MutableRefObject<HTMLInputElement> */
  const mainOriginThreeRef = useRef(null)
  // console.log(mainOriginRef.current?.value)

  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef(null)
  // console.log(destinationRef.current?.value)

  /** @type React.MutableRefObject<HTMLInputElement> */
  const intermediateRef = useRef(null)
  // console.log(intermediateRef.current?.value)

  const [departureTime, setDepartureTime] = useState("")
  // console.log("time", departureTime)

  const handleDepartureTimeChange = (e) => {
    const inputTime = e.target.value
    const currentDate = new Date()

    // Retrieve the current date components
    const year = currentDate.getUTCFullYear()
    const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, "0")
    const day = currentDate.getUTCDate().toString().padStart(2, "0")

    // Combine the input time with the current date components to create the formatted time
    const formattedTime = `${year}-${month}-${day}T${inputTime}:00Z`

    // Update the departureTime state with the formatted time
    setDepartureTime(formattedTime)
  }

  //! a way to set a house based on a

  const [openCarRoutes, setOpenCarRoutes] = useState(false)

  const [openOtherRoutes, setOpenOtherRoutes] = useState(false)

  //! units

  // ! changes every origin in a  house
  const handleOriginChange = () => {
    const mappedRoutes = routesFormData.map((route) => {
      return { ...route, origin: mainOriginRef.current?.value }
    })
    setRoutesFormData(mappedRoutes)
  }

  // ! handle destination change
  const handleDestinationChange = () => {
    const mappedRoutes = routesFormData.map((route) => {
      return { ...route, destination: destinationRef.current?.value }
    })
    setRoutesFormData(mappedRoutes)
  }

  //! handle intermediate change
  const handleIntermediateChange = () => {
    // Map over the routesFormData array
    const modifiedRoutes = routesFormData.map((route) => {
      // Map over the intermediates array of each route
      const modifiedIntermediates = route.intermediates.map((address) => {
        // Update the address value with the value from intermediateRef
        return { ...address, address: intermediateRef.current?.value }
      })

      // Return the route with modified intermediates
      return { ...route, intermediates: modifiedIntermediates }
    })

    // Set the updated routesFormData state
    setRoutesFormData(modifiedRoutes)
  }

  // ! travel mode
  const [selectedTravelMode, SetSelectedTravelMode] = useState("DRIVE")
  // console.log(selectedTravelMode)

  const handleSelectedTravelMode = (e) => SetSelectedTravelMode(e.target.value)

  //! traffic

  const [trafficPreference, setTrafficPreference] = useState("TRAFFIC_UNAWARE")
  console.log(trafficPreference)

  const handleTraffic = (e) => {
    const isChecked = e.target.checked
    if (isChecked) {
      setTrafficPreference("TRAFFIC_AWARE")
    } else {
      setTrafficPreference("TRAFFIC_UNAWARE")
    }
  }

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

  const [ferriesPreference, setFerriesPreference] = useState(false)

  const handleFerries = (e) => {
    const isChecked = e.target.checked
    if (isChecked) {
      setFerriesPreference(true)
    } else {
      setFerriesPreference(false)
    }
  }

  const [numberOfTravels, setNumberOfTravels] = useState(0)

  const handleNumberOfTravels = (e) => setNumberOfTravels(e.target.value)

  const [isPendularRoute, setIsPendularRoute] = useState(false)
  console.log(isPendularRoute)
  const handleIsPendularRoute = (e) => {
    const isChecked = e.target.checked
    if (isChecked) {
      setIsPendularRoute(true)
    } else {
      setIsPendularRoute(false)
    }
  }

  // ! fetch route
  //? add fuel consumption

  const addRoutesData = () => {
    //! if traffic aware route with traffic and without

    // const route = "Driving 1":[

    // ]

    const houseNames = ["House 1", "House 2", "House 3"]
    const mainOriginsRefs = [
      mainOriginRef,
      mainOriginTwoRef,
      mainOriginThreeRef,
    ]

    const routeWithoutTraffic = {
      origin: "Algés, Portugal",
      destination: "Algés, Portugal",
      intermediates: "Algés, Portugal",
      nonPendularDepartureTime: "2023-10-15T15:01:23.045123456Z",
      travelMode: "",
      routingPreference: "TRAFFIC_UNAWARE",
      avoidTolls: true,
      avoidHighways: true,
      avoidFerries: true,
      numberOfTravels: 20,
      typeOfEngine: "Gasoline",
      fuelConsumption: 4,
      energyConsumptionEletric: wattsConsumed,
      isPendularRoute: false,
      pendularRouteId: null,
      outboundTimePendular: null,
      inboundTimePendular: null,
    }
    //! traffic comparison
    const routeWithTraffic = {
      ...routeWithoutTraffic,
      routingPreference: "TRAFFIC_AWARE",
    }
    //! pendular route back with no traffic
    const inboundRoutePendularWithoutTraffic = {
      ...routeWithoutTraffic,
      origin: destinationRef.current.value,
      destination: mainOriginRef.current.value,
    }

    //! pendular route back with traffic
    const inboundRoutePendularWithTraffic = {
      ...routeWithoutTraffic,
      routingPreference:
        trafficPreference === "TRAFFIC_AWARE"
          ? "TRAFFIC_UNAWARE"
          : trafficPreference,
    }

    // ? normal routes done for each location
    if (trafficPreference === "TRAFFIC_UNAWARE" && isPendularRoute === false) {
      const updatedFetchedDrivingRoutesNormal = {
        ...fetchedDrivingDirections,
      }

      houseNames.forEach((houseName, index) => {
        updatedFetchedDrivingRoutesNormal[houseName] = {
          ...fetchedDrivingDirections[houseName],
          Driving: [
            ...fetchedDrivingDirections[houseName].Driving,
            routeWithoutTraffic,
          ],
        }
        updatedFetchedDrivingRoutesNormal[houseName].Driving.forEach(
          (route) => (route.origin = mainOriginsRefs[index].current?.value)
        )
      })
      setFetchedDrivingDirections(updatedFetchedDrivingRoutesNormal)
      // ? 1 one route without traffic and one with traffic outbound // total  2 routes
    } else if (
      trafficPreference === "TRAFFIC_AWARE" &&
      isPendularRoute === false
    ) {
      const updatedFetchedDrivingRoutesWithTraffic = {
        ...fetchedDrivingDirections,
      }

      houseNames.forEach((houseName, index) => {
        updatedFetchedDrivingRoutesWithTraffic[houseName] = {
          ...fetchedDrivingDirections[houseName],
          Driving: [
            ...fetchedDrivingDirections[houseName].Driving,
            routeWithoutTraffic,
            routeWithTraffic,
          ],
        }
        updatedFetchedDrivingRoutesWithTraffic[houseName].Driving.forEach(
          (route) => (route.origin = mainOriginsRefs[index].current?.value)
        )
      })
      setFetchedDrivingDirections(updatedFetchedDrivingRoutesWithTraffic)
    } else if (
      trafficPreference === "TRAFFIC_UNAWARE" &&
      isPendularRoute === true
    ) {
      const updatedFetchedDrivingRoutesPendularWithoutTraffic = {
        ...fetchedDrivingDirections,
      }

      console.log(updatedFetchedDrivingRoutesPendularWithoutTraffic)

      houseNames.forEach((houseName, index) => {
        updatedFetchedDrivingRoutesPendularWithoutTraffic[houseName] = {
          ...fetchedDrivingDirections[houseName],
          Driving: [
            ...fetchedDrivingDirections[houseName].Driving,
            {
              ...routeWithoutTraffic,
              origin: destinationRef.current.value,
              destination: mainOriginsRefs[index].current.value,
            },
            {
              ...routeWithTraffic,
              origin: destinationRef.current.value,
              destination: mainOriginsRefs[index].current.value,
            },
            // Reverse the origins and destinations for the last two routes
            {
              ...routeWithoutTraffic,
              origin: destinationRef.current.value,
              destination:  mainOriginsRefs[index].current.value,
              isPendularRoute: true,
            },
            {
              ...routeWithTraffic,
              origin: destinationRef.current.value,
              destination:  mainOriginsRefs[index].current.value,
              isPendularRoute: true,
            },
          ],
        }
        updatedFetchedDrivingRoutesPendularWithoutTraffic[
          houseName
        ].Driving.forEach((route, routeIndex) => {
          // Skip modifying the origin for the last two routes
          if (
            routeIndex <
            updatedFetchedDrivingRoutesPendularWithoutTraffic[houseName].Driving
              .length -
              2
          ) {
            route.origin = mainOriginsRefs[index].current?.value
          }
        })
      })
      setFetchedDrivingDirections(
        updatedFetchedDrivingRoutesPendularWithoutTraffic
      )
    } else if (
      trafficPreference === "TRAFFIC_AWARE" &&
      isPendularRoute === true
    ) {
    }
  }

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
        address: "Oriente, Lisboa, Portugal",
      },
      intermediates: [{ address: "Lisboa, Portugal" }],
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_UNAWARE",
      // departureTime: departureTime,
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
        const data = response.data
        const houseNames = ["House 1", "House 2", "House 3"]
        const mainOriginsRefs = [
          mainOriginRef,
          mainOriginTwoRef,
          mainOriginThreeRef,
        ]

        //! compare traffic, if not selected just pass one object to forms data with traffic unaware
        //! if selected, pass two objects, one with traffic aware and one with traffic unaware

        const route = {
          origin: null,
          destination: destinationRef.current,
          intermediates: intermediateRef.current,
          nonPendularDepartureTime: departureTime,
          travelMode: selectedTravelMode,
          routingPreference: trafficPreference,
          avoidTolls: tollsPreference,
          avoidHighways: highwaysPreference,
          avoidFerries: ferriesPreference,
          numberOfTravels: 0,
          typeOfEngine: selectedEngineType,
          fuelConsumption: wattsConsumed,
          energyConsumptionEletric: litersConsumed,
          isPendularRoute: false,
          pendularRouteId: null,
          outboundTimePendular: "",
          inboundTimePendular: "",
          polyline: data.routes[0].polyline.encodedPolyline,
          duration: data.routes[0].duration,
          distance: data.routes[0].distanceMeters,
          isVisible: true,
        }

        if (trafficPreference === "TRAFFIC_UNAWARE") {
          const updatedFetchedDrivingRoutesNormal = {
            ...fetchedDrivingDirections,
          }

          houseNames.forEach((houseName, index) => {
            updatedFetchedDrivingRoutesNormal[houseName] = {
              ...fetchedDrivingDirections[houseName],
              Driving: [...fetchedDrivingDirections[houseName].Driving, route],
            }
            updatedFetchedDrivingRoutesNormal[houseName].Driving.forEach(
              (route) => (route.origin = mainOriginsRefs[index].current?.value)
            )
          })
          console.log(updatedFetchedDrivingRoutesNormal)

          setFetchedDrivingDirections(updatedFetchedDrivingRoutesNormal)
        }

        //! if traffic aware we need to fetch 2 routes and then add the two routes to the object and identify them so i can compare them later
      })

      // const trafficComparisonData = [
      //     [
      //       {
      //         origin: mainOriginRef.current,
      //         destination: destinationRef.current,
      //         intermediates: intermediateRef.current,
      //         nonPendularDepartureTime: departureTime,
      //         travelMode: selectedTravelMode,
      //         routingPreference: trafficPreference,
      //         avoidTolls: tollsPreference,
      //         avoidHighways: highwaysPreference,
      //         avoidFerries: ferriesPreference,
      //         numberOfTravels: 0,
      //         typeOfEngine: selectedEngineType,
      //         fuelConsumption: wattsConsumed,
      //         energyConsumptionEletric: litersConsumed,
      //         isPendularRoute: false,
      //         pendularRouteId: "",
      //         outboundTimePendular: "",
      //         inboundTimePendular: "",
      //         polyline: data.routes[0].polyline.encodedPolyline,
      //         duration: data.routes[0].duration,
      //         distance: data.routes[0].distanceMeters,
      //         isVisible: true,
      //       },
      //       {
      //         origin: mainOriginRef.current,
      //         destination: destinationRef.current,
      //         intermediates: intermediateRef.current,
      //         nonPendularDepartureTime: departureTime,
      //         travelMode: selectedTravelMode,
      //         routingPreference: trafficPreference,
      //         avoidTolls: tollsPreference,
      //         avoidHighways: highwaysPreference,
      //         avoidFerries: ferriesPreference,
      //         numberOfTravels: 0,
      //         typeOfEngine: selectedEngineType,
      //         fuelConsumption: wattsConsumed,
      //         energyConsumptionEletric: litersConsumed,
      //         isPendularRoute: false,
      //         pendularRouteId: "",
      //         outboundTimePendular: "",
      //         inboundTimePendular: "",
      //         polyline: data.routes[0].polyline.encodedPolyline,
      //         duration: data.routes[0].duration,
      //         distance: data.routes[0].distanceMeters,
      //         isVisible: true,
      //       },
      //     ],
      //   ]
      // const pendularData = [
      //   [
      //     {
      //       origin: "",
      //       destination: "",
      //       intermediates: "",
      //       nonPendularDepartureTime: "",
      //       travelMode: "DRIVE",
      //       routingPreference: "TRAFFIC_AWARE",
      //       avoidTolls: true,
      //       avoidHighways: true,
      //       avoidFerries: true,
      //       numberOfTravels: 0,
      //       typeOfEngine: "",
      //       fuelConsumption: 0,
      //       energyConsumptionEletric: 0,
      //       isPendularRoute: false,
      //       pendularRouteId: "",
      //       outboundTimePendular: "",
      //       inboundTimePendular: "",
      //       polyline: "",
      //       duration: 0,
      //       distance: 0,
      //       isVisible: true,
      //     },
      //     {
      //       origin: "",
      //       destination: "",
      //       intermediates: "",
      //       nonPendularDepartureTime: "",
      //       travelMode: "DRIVE",
      //       routingPreference: "TRAFFIC_UNAWARE",
      //       avoidTolls: true,
      //       avoidHighways: true,
      //       avoidFerries: true,
      //       numberOfTravels: 0,
      //       typeOfEngine: "",
      //       fuelConsumption: 0,
      //       energyConsumptionEletric: 0,
      //       isPendularRoute: false,
      //       pendularRouteId: "",
      //       outboundTimePendular: "",
      //       inboundTimePendular: "",
      //       polyline: "",
      //       duration: 0,
      //       distance: 0,
      //       isVisible: true,
      //     },
      //     {
      //       origin: "",
      //       destination: "",
      //       intermediates: "",
      //       nonPendularDepartureTime: "",
      //       travelMode: "DRIVE",
      //       routingPreference: "TRAFFIC_AWARE",
      //       avoidTolls: true,
      //       avoidHighways: true,
      //       avoidFerries: true,
      //       numberOfTravels: 0,
      //       typeOfEngine: "",
      //       fuelConsumption: 0,
      //       energyConsumptionEletric: 0,
      //       isPendularRoute: false,
      //       pendularRouteId: "",
      //       outboundTimePendular: "",
      //       inboundTimePendular: "",
      //       polyline: "",
      //       duration: 0,
      //       distance: 0,
      //       isVisible: true,
      //     },
      //     {
      //       origin: "",
      //       destination: "",
      //       intermediates: "",
      //       nonPendularDepartureTime: "",
      //       travelMode: "DRIVE",
      //       routingPreference: "TRAFFIC_UNAWARE",
      //       avoidTolls: true,
      //       avoidHighways: true,
      //       avoidFerries: true,
      //       numberOfTravels: 0,
      //       typeOfEngine: "",
      //       fuelConsumption: 0,
      //       energyConsumptionEletric: 0,
      //       isPendularRoute: false,
      //       pendularRouteId: "",
      //       outboundTimePendular: "",
      //       inboundTimePendular: "",
      //       polyline: "",
      //       duration: 0,
      //       distance: 0,
      //       isVisible: true,
      //     }
      //   ],
      // ]
      // const updatedFetchedTrafficRoutes =

      // const updatedFetchedPendularWithTrafficRoutes =

      // const updatedFetchedPendularWithoutTrafficRoutes =

      .catch((error) => {
        console.error(error)
      })
  }

  // const fetchData = () => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-Goog-Api-Key": "AIzaSyAC-ZmHeOUM6VvIDtbc8y_sfKG-Lh7ZgME",
  //       "X-Goog-FieldMask":
  //         "routes.distanceMeters,routes.duration,routes.polyline",
  //     },
  //   }
  //   const data = {
  //     origin: {
  //       address: "Algés, Portugal",
  //     },
  //     destination: {
  //       address: "Moscavide, Portugal",
  //     },
  //     intermediates: [{ address: "Oriente, Lisboa, Portugal" }],
  //     travelMode: "DRIVE",
  //     routeModifiers: {
  //       avoidTolls: true,
  //       avoidHighways: true,
  //       avoidFerries: true,
  //     },
  //   }

  //   axios
  //     .post(
  //       "https://routes.googleapis.com/directions/v2:computeRoutes",
  //       data,
  //       config
  //     )
  //     .then((response) => {
  //       console.log(response.data)
  //       // Rest of the code
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }

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

  // !if transit is selected only fill transit option rest has to be commited in fetch query
  // !if drive is selected only fill drive option rest has to be commited in fetch query
  //! pendular movement takes the previous route and adds the info bellow it with a similar id? with just a different time
  //! check traffic calculations for routes and compare
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
              {/* <div className="btn-success btn w-full gap-x-4 ">
                <span>Routes</span>
                <GrDirections className="text-xl" />
              </div> */}

              <Tab.Group>
                <Tab.List className="flex justify-around  pt-4">
                  {/* {Object.keys(formsData).map((house) => {
                    const houseNumber = house.split(" ")[1]
                    const houseRoutes = routesFormData[house]

                    return ( */}
                  <Tab className="btn-success btn-sm btn w-[48%]">
                    <span>Settings</span> <AiFillSetting className="text-lg" />
                  </Tab>
                  <Tab className="btn-success btn-sm btn w-[48%]">
                    <span>Routes</span> <GrDirections className="text-lg" />
                  </Tab>
                  {/* )
                  })} */}
                </Tab.List>

                <Tab.Panels className="h-[90%] w-full ">
                  {/* {Object.keys(routesFormData).map((house) => {
                    const houseNumber = house.split(" ")[1]
                    const houseRoutes = routesFormData[house]
                    const mainOriginRef = useRef(null)
                    if (houseRoutes.length > 0) {
                      return ( */}
                  <Tab.Panel>
                    <div className="w-full py-4">
                      <ul className="flex h-1/2 flex-col gap-2">
                        <Autocomplete>
                          <input
                            type="text"
                            // placeholder={`Enter house ${houseNumber} address`}
                            placeholder="Enter house 1 address"
                            className="input-bordered input-accent input input-sm w-full bg-white"
                            ref={mainOriginRef}
                            onChange={handleOriginChange}
                          />
                        </Autocomplete>
                        <Autocomplete>
                          <input
                            type="text"
                            // placeholder={`Enter house ${houseNumber} address`}
                            placeholder="Enter house 2 address"
                            className="input-bordered input-secondary input input-sm w-full bg-white"
                            ref={mainOriginTwoRef}
                            // onChange={handleOriginChange}
                          />
                        </Autocomplete>
                        <Autocomplete>
                          <input
                            type="text"
                            // placeholder={`Enter house ${houseNumber} address`}
                            placeholder="Enter house 3 address"
                            className="input-bordered input-warning input input-sm w-full bg-white"
                            ref={mainOriginThreeRef}
                            // onChange={handleOriginChange}
                          />
                        </Autocomplete>
                        <FiArrowDown className=" w-full text-center text-4xl" />
                        <li
                          className="flex flex-col gap-2 pb-4"
                          // key={route.distance}
                        >
                          {/* drive */}

                          <button
                            onClick={() => setOpenCarRoutes((prev) => !prev)}
                            className="btn-success btn-sm btn"
                          >
                            Car Routes
                          </button>
                          {/* disclosure */}
                          {openCarRoutes && (
                            <div>
                              <div className="flex flex-col gap-2">
                                <Autocomplete>
                                  <input
                                    type="text"
                                    placeholder="Enter destination address"
                                    className="input-bordered input-accent input input-sm w-full bg-white"
                                    ref={destinationRef}
                                    onChange={handleDestinationChange}
                                  />
                                </Autocomplete>
                                <Autocomplete>
                                  <input
                                    type="text"
                                    placeholder="Enter intermediate address"
                                    className="input-bordered input-accent input input-sm w-full bg-white"
                                    ref={intermediateRef}
                                    onChange={handleIntermediateChange}
                                  />
                                </Autocomplete>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="form-control ">
                                  <label className="label cursor-pointer">
                                    <span className="label-text whitespace-nowrap pr-1 text-xs">
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
                                    <input
                                      type="time"
                                      max={24}
                                      min={0}
                                      step={10}
                                      placeholder="Departure time"
                                      className="input-bordered input-accent input input-sm  bg-white"
                                      onChange={handleDepartureTimeChange}
                                    />
                                  </label>
                                </div>
                                <div className="form-control w-full">
                                  <label className="label cursor-pointer">
                                    <span className="label-text flex items-center gap-2">
                                      <span>Car</span>
                                      <MdDirectionsCar />
                                    </span>
                                    <input
                                      type="checkbox"
                                      checked
                                      readOnly
                                      className="checkbox-success checkbox checkbox-sm"
                                    />
                                  </label>
                                </div>
                              </div>

                              <div className="flex flex-wrap ">
                                <div className="flex w-full gap-1">
                                  <div className="form-control  w-1/3">
                                    <label className="label">
                                      <span className="label-text whitespace-nowrap">
                                        Type of engine
                                      </span>
                                    </label>
                                    <select
                                      className="select-accent select select-sm  bg-white text-xs "
                                      onChange={handleSelectedEngineType}
                                    >
                                      <option value="GASOLINE">Gasoline</option>
                                      <option value="ELECTRIC">Electric</option>
                                      <option value="HYBRID">Hybrid</option>
                                      <option value="DIESEL"> Diesel</option>
                                    </select>
                                  </div>
                                  {selectedEngineType !== "ELECTRIC" && (
                                    <div className="form-control  w-1/3 ">
                                      <label className="label">
                                        <FaGasPump />
                                        <span className="label-text ">
                                          Consumption
                                        </span>
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="liters/km"
                                        className="input-bordered input-accent  input input-sm  bg-white text-xs"
                                        onChange={handleLitersConsumed}
                                      />
                                    </div>
                                  )}

                                  {(selectedEngineType === "HYBRID" ||
                                    selectedEngineType === "ELECTRIC") && (
                                    <div className="form-control  w-1/3 ">
                                      <label className="label">
                                        <MdOutlineElectricBolt />
                                        <span className="label-text">
                                          Consumption
                                        </span>
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="kwh/km"
                                        className="input-bordered input-accent input input-sm  bg-white"
                                        onChange={handleWattsConsumed}
                                      />
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
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
                                  <div className="form-control ">
                                    <label className="label cursor-pointer">
                                      <span className="label-text pr-1 text-xs">
                                        Avoid ferries
                                      </span>
                                      <input
                                        type="checkbox"
                                        className="checkbox-accent checkbox checkbox-xs"
                                        onChange={handleFerries}
                                      />
                                    </label>
                                  </div>
                                </div>

                                {/* if this button is selected, do the follwoing data, in the fetch data function will take 2 routes intead of one, with the previous setting but integrate traffic*/}
                                <div className="form-control w-full">
                                  <label className="label cursor-pointer justify-between">
                                    <span className="label-text text-xs">
                                      Pendular route?
                                    </span>
                                    <input
                                      type="checkbox"
                                      className="checkbox-accent checkbox checkbox-sm"
                                      onChange={handleIsPendularRoute}
                                    />
                                  </label>
                                </div>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="Go..."
                                    className="input-bordered input-accent input input-sm w-full bg-white"
                                    // ref={originRefs[houseNumber]}
                                  />
                                  <input
                                    type="text"
                                    placeholder="Back"
                                    className="input-bordered input-accent input input-sm w-full bg-white"
                                    // ref={originRefs[houseNumber]}
                                  />
                                </div>
                                <button
                                  onClick={addRoutesData}
                                  className="btn-success btn-sm btn my-4 w-full gap-4 "
                                >
                                  <span>Add Route</span>
                                  <GrDirections className="text-xl" />
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Public */}
                          <div className="collapse rounded-lg border-2 ">
                            <input type="checkbox" />
                            <div className="collapse-title whitespace-nowrap text-lg font-medium">
                              Public transport / Cycling /Walking
                            </div>
                            <div className="collapse-content">
                              <div>
                                <h2 className="text-base">Prefer:</h2>
                                <div className="flex flex-wrap ">
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      placeholder="Enter departure time..."
                                      className="input-bordered input-accent input input-sm w-full bg-white"

                                      // ref={originRefs[houseNumber]}
                                    />
                                    <input
                                      type="text"
                                      placeholder="Enter arrival time..."
                                      className="input-bordered input-accent input input-sm w-full bg-white"

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
                                <h2 className="text-base">Preference:</h2>
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
                              </div>
                              <div className="form-control ">
                                <label className="label cursor-pointer">
                                  <span className="label-text pr-1 text-xs">
                                    Pendular route?
                                  </span>
                                  <input
                                    type="checkbox"
                                    className="checkbox-accent checkbox checkbox-xs"
                                    onChange={handleIsPendularRoute}
                                  />
                                </label>
                              </div>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Go..."
                                  className="input-bordered input-accent input input-sm w-full bg-white"
                                  // ref={originRefs[houseNumber]}
                                />
                                <input
                                  type="text"
                                  placeholder="Back"
                                  className="input-bordered input-accent input input-sm w-full bg-white"
                                  // ref={originRefs[houseNumber]}
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="flex items-center justify-between"> */}
                          {/* <div>
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
                                    </div> */}
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={fetchData}
                      className="btn-success btn-sm btn my-4 w-full gap-4 "
                    >
                      <span>Fetch data</span>
                      <GrDirections className="text-xl" />
                    </button>
                  </Tab.Panel>
                  <Tab.Panel>
                    <ul>
                      <li className="flex  flex-col">
                        <div>
                          <span className="font-bold">Destination:</span>
                          <span className="text-sm"> Lisboa, Portugal</span>
                        </div>
                        <div>
                          <span className="font-bold">Intermediate:</span>
                          <span className="text-sm"> Algés, Portugal</span>
                        </div>
                        <div className="rounded-lg border-y-2 border-red-500">
                          {" "}
                          <div className="flex items-center gap-1">
                            <BsFillHouseDoorFill />
                            <span>1</span>
                          </div>
                          <div className="flex items-center justify-between gap-1">
                            <AiFillCar />
                            <div className="flex items-center gap-1">
                              <MdOutlineModeOfTravel />
                              <span>30</span>
                            </div>

                            <MdToll className="fill-red-600" />
                            <IoMdBoat className="fill-red-600" />
                            <MdTraffic className="fill-red-600" />
                            <MdOutlineRemoveRoad className="fill-red-600" />
                            <div className="flex items-center gap-1">
                              <AiFillClockCircle className="fill-blue-500" />
                              <span>10mins</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <GiPathDistance />
                              <span>10km</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-1">
                            {" "}
                            <div className="flex items-center gap-1">
                              <FaGasPump />
                              <span>10$</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MdOutlineElectricBolt className="fill-yellow-500" />
                              <span>10$</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BsArrowLeftRight />
                              <input
                                type="checkbox"
                                checked
                                className="checkbox-success checkbox checkbox-xs"
                              />
                            </div>
                            <div className="flex items-center">
                              {" "}
                              <BsFillHouseDoorFill /> <span>13 am</span>
                              <AiOutlineArrowRight />
                            </div>
                            <div className="flex items-center">
                              <AiOutlineArrowLeft />
                              <span>19 pm</span>
                              <MdLocationOn />
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Tab.Panel>
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
