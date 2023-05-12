import React, { useState } from "react"

function DirectionsRenderer() {
  const [isHidden, setIsHidden] = useState(false)

  const directionsToogler = () => setIsHidden((prevState) => !prevState)


  return (
    <>
      <DirectionsRenderer
        key={index}
        directions={direction}
      />
    </>
  )
}

export default DirectionsRenderer
