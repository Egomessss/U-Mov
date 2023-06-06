import React from 'react'

function DrivingRoutesRequest() {
    const addRoutesData = () => {
        const houseNames = ["House 1", "House 2", "House 3"]
    
        const mainOriginsRefs = [
          mainOriginRef,
          mainOriginTwoRef,
          mainOriginThreeRef,
        ]
        console.log(mainOriginsRefs.map((ref) => ref.current?.value))
    
        const routeWithoutTraffic = {
          origin: "",
          destination: destinationRef.current?.value,
          intermediates: intermediateRef.current?.value,
          nonPendularDepartureTime: departureTime,
          travelMode: "DRIVING",
          routingPreference: trafficPreference,
          avoidTolls: tollsPreference,
          avoidHighways: highwaysPreference,
          avoidFerries: ferriesPreference,
          numberOfTravels: numberOfTravels,
          typeOfEngine: selectedEngineType,
          fuelConsumption: litersConsumed,
          energyConsumptionEletric: wattsConsumed,
          isPendularRoute: isPendularRoute,
          pendularRouteId: null,
          outboundTimePendular: outboundTimePendular,
          inboundTimePendular: inboundTimePendular,
        }

        //! traffic comparison
        const routeWithTraffic = {
          origin: "",
          destination: destinationRef.current?.value,
          intermediates: intermediateRef.current?.value,
          nonPendularDepartureTime: departureTime,
          travelMode: "DRIVING",
          routingPreference: trafficPreference,
          avoidTolls: tollsPreference,
          avoidHighways: highwaysPreference,
          avoidFerries: ferriesPreference,
          numberOfTravels: numberOfTravels,
          typeOfEngine: selectedEngineType,
          fuelConsumption: litersConsumed,
          energyConsumptionEletric: wattsConsumed,
          isPendularRoute: isPendularRoute,
          pendularRouteId: null,
          outboundTimePendular: outboundTimePendular,
          inboundTimePendular: inboundTimePendular,
        }

        const routePendularWithoutTraffic = {
            origin: "",
            destination: destinationRef.current?.value,
            intermediates: intermediateRef.current?.value,
            nonPendularDepartureTime: departureTime,
            travelMode: "DRIVING",
            routingPreference: trafficPreference,
            avoidTolls: tollsPreference,
            avoidHighways: highwaysPreference,
            avoidFerries: ferriesPreference,
            numberOfTravels: numberOfTravels,
            typeOfEngine: selectedEngineType,
            fuelConsumption: litersConsumed,
            energyConsumptionEletric: wattsConsumed,
            isPendularRoute: isPendularRoute,
            pendularRouteId: null,
            outboundTimePendular: outboundTimePendular,
            inboundTimePendular: inboundTimePendular,
          }

          const routePendularWithTraffic = {
            origin: "",
            destination: destinationRef.current?.value,
            intermediates: intermediateRef.current?.value,
            nonPendularDepartureTime: departureTime,
            travelMode: "DRIVING",
            routingPreference: trafficPreference,
            avoidTolls: tollsPreference,
            avoidHighways: highwaysPreference,
            avoidFerries: ferriesPreference,
            numberOfTravels: numberOfTravels,
            typeOfEngine: selectedEngineType,
            fuelConsumption: litersConsumed,
            energyConsumptionEletric: wattsConsumed,
            isPendularRoute: isPendularRoute,
            pendularRouteId: null,
            outboundTimePendular: outboundTimePendular,
            inboundTimePendular: inboundTimePendular,
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
        } //! pendular route back without traffic
        else if (
          trafficPreference === "TRAFFIC_UNAWARE" &&
          isPendularRoute === true
        ) {
          const updatedFetchedDrivingRoutesPendularWithoutTraffic = {
            ...fetchedDrivingDirections,
          }
    
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
    
                // Reverse the origins and destinations for the last two routes
                {
                  ...routeWithoutTraffic,
                  origin: destinationRef.current.value,
                  destination: mainOriginsRefs[index].current.value,
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
                  1
              ) {
                route.origin = mainOriginsRefs[index].current?.value
              }
            })
          })
          setFetchedDrivingDirections(
            updatedFetchedDrivingRoutesPendularWithoutTraffic
          )
        } //! pendular route with traffic
        else if (
          trafficPreference === "TRAFFIC_AWARE" &&
          isPendularRoute === true
        ) {
          const updatedFetchedDrivingRoutesPendularWithTraffic = {
            ...fetchedDrivingDirections,
          }
    
          houseNames.forEach((houseName, index) => {
            updatedFetchedDrivingRoutesPendularWithTraffic[houseName] = {
              ...fetchedDrivingDirections[houseName],
              Driving: [
                ...fetchedDrivingDirections[houseName].Driving,
                {
                  ...routeWithoutTraffic,
                  origin: destinationRef.current.value,
                  destination: mainOriginsRefs[index].current.value,
                  pendularRouteId: "House 1 Driving Traffic Pendular 1",
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
                  destination: mainOriginsRefs[index].current.value,
                  isPendularRoute: true,
                  pendularRouteId: "House 1 Driving Traffic Pendular 1",
                },
                {
                  ...routeWithTraffic,
                  origin: destinationRef.current.value,
                  destination: mainOriginsRefs[index].current.value,
                  isPendularRoute: true,
                },
              ],
            }
            updatedFetchedDrivingRoutesPendularWithTraffic[
              houseName
            ].Driving.forEach((route, routeIndex) => {
              // Skip modifying the origin for the last two routes
              if (
                routeIndex <
                updatedFetchedDrivingRoutesPendularWithTraffic[houseName].Driving
                  .length -
                  2
              ) {
                route.origin = mainOriginsRefs[index].current?.value
              }
            })
          })
          setFetchedDrivingDirections(
            updatedFetchedDrivingRoutesPendularWithTraffic
          )
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
    
  return (
    <div>DrivingRoutesRequest</div>
  )
}

export default DrivingRoutesRequest