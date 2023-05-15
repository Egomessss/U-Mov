import { Disclosure, Popover, Transition } from "@headlessui/react"
import {
  UserCircleIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline"
import { BiDirections } from "react-icons/bi"

import React, { Fragment, useState } from "react"
import { Autocomplete } from "@react-google-maps/api"
import Directions from "@/components/directions"

type centerMapProps = {
  lng: number
  lat: number
}

function Sidebar({ centerMap }) {
  return (
    <div className="absolute top-1/2 left-0 z-50 h-[95%] w-24 -translate-x-1/2 -translate-y-1/2 transform rounded-3xl  border-2 border-white bg-white ">
      <div className="relative flex h-full w-full flex-col items-center justify-around">
        {/* centers the map to main location */}
        <button
          onClick={centerMap}
          className="bg-lightgray flex h-20 w-20 items-center justify-center rounded-full border-2"
        >
          <ViewfinderCircleIcon className="text-orange h-8" />
        </button>
        {/* Directions */}
        <Directions />
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button className="bg-lightgray text-orange h-20  w-20 rounded-full">
                Surroundings
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
                <Popover.Panel className="absolute left-24 top-0 h-full w-96 rounded-3xl bg-white"></Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button className="bg-lightgray text-orange h-20  w-20 rounded-full">
                Costs
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
                <Popover.Panel className="absolute left-24 top-0 h-full w-96 rounded-3xl bg-white"></Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button className="bg-lightgray text-orange h-20  w-20 rounded-full">
                Results
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
                <Popover.Panel className="absolute left-24 top-0 h-full w-96 rounded-3xl bg-white"></Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button className="bg-lightgray text-orange h-20  w-20 rounded-full">
                <UserCircleIcon className="p-4" />
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
                <Popover.Panel className="absolute left-24 top-0 h-full w-96 rounded-3xl bg-white"></Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default Sidebar
