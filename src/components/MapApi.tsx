import React from "react"
import { GoogleMap, LoadScript } from "@react-google-maps/api"

//  Make sure you cache the props passed to GoogleMap to avoid re-renders that may harm the performance.
// restringir a api somente para o site

const containerStyle = {
  width: "100%",
  height: "100%",
}

const center = {
  lat: -3.745,
  lng: -38.523,
}

function MapApi() {
  return (
    <div className="-mx-20  h-full border-2 border-white">
      <LoadScript googleMapsApiKey="AIzaSyAC-ZmHeOUM6VvIDtbc8y_sfKG-Lh7ZgME">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default MapApi
