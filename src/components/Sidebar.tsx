import { Popover, Transition } from "@headlessui/react"
import {
  ArrowRightIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline"
import React, { Fragment, useState } from "react"
import { Autocomplete } from "@react-google-maps/api"

function Sidebar({ centerMap, originRef, destinationRef, calculateRoute, clearRoute, duration, distance  }) {
  return (
    <div className="absolute top-1/2 left-5 z-50 h-[80%] w-24 -translate-x-1/2 -translate-y-1/2 transform rounded-3xl  border-2 border-white bg-black/60">
      <div className="relative flex h-full w-full flex-col items-center justify-around">
        {/* centers the map to main location */}
        <button
          onClick={centerMap}
          className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white"
        >
          <ViewfinderCircleIcon className="h-8" />
        </button>
        {/* directions */}
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button className="h-20 w-20 rounded-full border-2 border-white">
                Directions
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
                <Popover.Panel className="absolute left-24 top-0 h-full w-96 rounded-3xl border-2 border-white bg-black/60 p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      {" "}
                      <h3>Add main location</h3>
                      <Autocomplete>
                        <input type="text" placeholder="Origin" ref={originRef} />
                      </Autocomplete>
                    </div>
                    <button>Add more</button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      {" "}
                      <h3>Add middle routes</h3>
                      <input type="text" placeholder="middle" />
                    </div>
                    <button>Add more</button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3> Add destinations</h3>
                    <div className="flex flex-col">
                      <label htmlFor="">Give it a name</label>
                      <Autocomplete>
                      <input type="text" placeholder="Origin" ref={destinationRef} />
                      </Autocomplete>
                    </div>
                    <button>Add more</button>
                  </div>
                  <button onClick={calculateRoute}>Get Route</button>
                  <button onClick={clearRoute}>Clear selection</button>
                  <h1>Summary</h1>
                  <div className="flex flex-col gap-2">
                    <h3>Distance</h3>
                    <div className="flex justify-between">
                      <span>Point A</span>
                      <span>distance: {distance}</span>
                      <span>duration: {duration}</span>
                      <span>Point b</span>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button className="h-20 w-20 rounded-full border-2 border-white"></Popover.Button>
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
              <Popover.Button className="h-20 w-20 rounded-full border-2 border-white"></Popover.Button>
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
              <Popover.Button className="h-20 w-20 rounded-full border-2 border-white"></Popover.Button>
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
              <Popover.Button className="h-20 w-20 rounded-full border-2 border-white"></Popover.Button>
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
