import React from "react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { BsMoonFill, BsFillSunFill } from "react-icons/bs"
import { Switch } from "@headlessui/react"

function ThemeToggler() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render UI after theme is loaded in client-side to prevent server-side hydration mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="py-16">
      <Switch
        aria-label="Toogle Dark Mode"
        onChange={handleThemeChange}
        className={`${theme === "light" ? "bg-white" : "bg-black"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span
          /* Transition the switch's knob on state change */
          className={`transform transition duration-200 ease-in-out
          ${theme === "light" ? "translate-x-11" : "translate-x-2"}
        `}
        >
          {theme === "light" ? (
            <BsFillSunFill className=" h-5 w-5 fill-orange-500" />
          ) : (
            <BsMoonFill className=" h-5 w-5 fill-white" />
          )}
        </span>
      </Switch>
    </div>
  )
}

export default ThemeToggler
{
  /* </div>
        <button className='w-8 h-8 dark:bg-black flex items-center justify-center transition-all duration-300 focus:outline-none'
            onClick={handleThemeChange} aria-label="Toogle Dark Mode">
            {theme === "light" ? <BsMoonFill className=" w-5 h-5" /> : <BsFillSunFill className=" w-5 h-5" />}
        </button></div> */
}
