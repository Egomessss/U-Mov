import React from 'react'
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { BsMoonFill, BsFillSunFill } from 'react-icons/bs';


function ThemeToggler() {

    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])
    if (!mounted) return null
    return (
        <button className='w-8 h-8 dark:bg-black flex items-center justify-center transition-all duration-300 focus:outline-none'
            onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label="Toogle Dark Mode">
            {theme === "light" ? <BsMoonFill className=" w-5 h-5" /> : <BsFillSunFill className=" w-5 h-5" />}
        </button>
    )
}

export default ThemeToggler