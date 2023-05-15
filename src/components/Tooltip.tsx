import React from "react"
import { AiOutlineInfoCircle } from "react-icons/ai"
function Tooltip({ color, text, type }) {
  // how to make the span appear on hover?

  return (
    <div
      className={`tooltip tooltip-${type}`}
      data-tip={text}
    >
      <AiOutlineInfoCircle className={`text-${color}-500`} />
    </div>
  )
}

export default Tooltip
