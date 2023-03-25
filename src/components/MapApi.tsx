import React, { useState } from "react"
import {
  GoogleMap,
  LoadScript,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api"

//  Make sure you cache the props passed to GoogleMap to avoid re-renders that may harm the performance.
// restringir a api somente para o site
// hide the key?

const containerStyle = {
  width: "100%",
  height: "100%",
}

// centers the map

function MapApi({ center, setMap, map }) {
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyAC-ZmHeOUM6VvIDtbc8y_sfKG-Lh7ZgME",
  // })

  // if (!isLoaded) {
  //   return <div>Loading...</div>
  // }

  return (
    <div className="-mx-20  h-full">
      <LoadScript googleMapsApiKey="AIzaSyAC-ZmHeOUM6VvIDtbc8y_sfKG-Lh7ZgME">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={setMap}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <>
            <Marker position={center} />
          </>
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapApi
