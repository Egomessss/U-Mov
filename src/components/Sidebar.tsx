import { Popover, Transition } from "@headlessui/react"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import React, { Fragment, useState } from "react"

function Sidebar() {
  return (
    <div className="absolute top-1/2 left-10 flex h-[80%] w-24 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-around rounded-3xl border-2 border-white">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button>Directions</Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute bg-white left-24 w-52 h-64"></Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <div></div>
      <div className="h-20 w-20 rounded-full border-2 border-white"></div>
      <div className="h-20 w-20 rounded-full border-2 border-white"></div>
      <div className="h-20 w-20 rounded-full border-2 border-white"></div>
      <div className="h-20 w-20 rounded-full border-2 border-white"></div>
      <div className="h-20 w-20 rounded-full border-2 border-white"></div>
    </div>
  )
}

export default Sidebar
