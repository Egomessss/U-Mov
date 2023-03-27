import { Popover, Transition } from "@headlessui/react"
import {
  ArrowRightIcon,
  ClockIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline"
import React, { Fragment, useState } from "react"
import { Autocomplete } from "@react-google-maps/api"

function Sidebar({
  centerMap,
  originRef,
  destinationRef,
  calculateRoute,
  clearRoute,
  duration,
  distance,
}) {
  return (
    <div className="absolute top-1/2 left-5 z-50 h-[80%] w-24 -translate-x-1/2 -translate-y-1/2 transform rounded-3xl  border-2 border-white bg-white ">
      <div className="relative flex h-full w-full flex-col items-center justify-around">
        {/* centers the map to main location */}
        <button
          onClick={centerMap}
          className="flex h-20 w-20 items-center justify-center rounded-full border-2 bg-lightgray"
        >
          <ViewfinderCircleIcon className="h-8 text-orange" />
        </button>
        {/* directions */}
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button className="h-20 w-20 rounded-full  bg-lightgray text-orange">
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
                <Popover.Panel className="absolute left-24 top-0 h-full w-96 rounded-3xl  bg-white p-4 text-black">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <h3>Add main location</h3>
                      <Autocomplete>
                        <input
                          className="w-full rounded-md border-2 bg-white px-2"
                          type="text"
                          placeholder="Origin"
                          ref={originRef}
                        />
                      </Autocomplete>
                    </div>
                    <button>Add more</button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <h3>Add a deviation</h3>
                      <input
                        className="w-full rounded-md border-2 bg-white px-2"
                        type="text"
                        placeholder="Deviations"
                      />
                    </div>
                    <button>Add more</button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3> Add destinations</h3>
                    <div className="flex flex-col">
                      <label htmlFor="">Give it a name</label>
                      <Autocomplete>
                        <input
                          className="w-full rounded-md border-2 bg-white px-2"
                          type="text"
                          placeholder="Origin"
                          ref={destinationRef}
                        />
                      </Autocomplete>
                    </div>
                    <button>Add more</button>
                  </div>
                  <div className="flex justify-between py-6">
                    {" "}
                    <button onClick={calculateRoute}>Get Route</button>
                    <button onClick={clearRoute}>Clear selection</button>
                  </div>

                  <h3>Summary</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span>House</span>
                      <ArrowRightIcon className="h-6" />
                      <span>Job</span>
                      <span>{distance}</span>
                      <div className="flex gap-2">
                        <ClockIcon className="h-6" />
                        <span>{duration} </span>
                      </div>
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
