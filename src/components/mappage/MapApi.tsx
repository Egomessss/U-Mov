import React, { useContext, useState } from "react"
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api"
import { DrivingContext } from "../../context/DrivingContextProvider"

//  Make sure you cache the props passed to GoogleMap to avoid re-renders that may harm the performance.
// restringir a api somente para o site
// hide the key?

// centers the map
const LIBRARIES = ["places"]

function MapApi({ center, setMap, map, directions, routes }) {
  const { drivingDirections } = useContext(DrivingContext)
  // console.log(drivingDirections.map(obj => obj.visible))

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAC-ZmHeOUM6VvIDtbc8y_sfKG-Lh7ZgME",
    libraries: LIBRARIES,
  })

  if (!isLoaded) {
    return <div className="flex items-center justify-center">Loading...</div>
  }

  const containerStyle = {
    width: "100%",
    height: "100%",
  }
  // console.log(directions)

  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP]
    }
  }
  return (
    <div className="-mx-20  h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={setMap}
        options={mapOptions}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <>
          {/* <Marker position={center} /> */}
          {/* {routes.map((direction, index) => (
            <div key={index}>
              <DirectionsRenderer
                key={index}
                directions={direction}
              />
            </div>
          ))} */}
          {drivingDirections.filter(obj => obj.visible === true).map((direction, index) => {
            // ver onDirecitons changed https://react-google-maps-api-docs.netlify.app/#directionsrenderer
              return (
                <DirectionsRenderer
                  key={index}
                  directions={direction}
                />
              )
            })}
        </>
      </GoogleMap>
    </div>
  )
}

export default MapApi

// option to choose an icon
// option to choose a color for the route
