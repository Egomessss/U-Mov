import { Disclosure, Popover, Transition } from "@headlessui/react"
import {
  ArrowRightIcon,
  ChevronRightIcon,
  ClockIcon,
  TrashIcon,
  UserCircleIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline"
import { BiDirections } from "react-icons/bi"

import React, { Fragment, useState } from "react"
import { Autocomplete } from "@react-google-maps/api"
import Directions from "./Directions"

type centerMapProps = {
  lng: number
  lat: number
}

function Sidebar({
  centerMap,
  onPlaceChanged,
  handleDestinationAddress,
  handleNewDestinationName,
  handleNewDestinationAddress,
  handleRemoveDestination,
  destinationAddresses,
  selectedTravelMode,
  SetSelectedTravelMode,
  time,
  setTime,
  handlePublicOrigin,
  handlePublicDestination,
  calculateRoute,
  handleDeleteRoute,
  directions,
  toogleRoute
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
        <Directions
          handleDestinationAddress={handleDestinationAddress}
          handleNewDestinationName={handleNewDestinationName}
          handleNewDestinationAddress={handleNewDestinationAddress}
          handleRemoveDestination={handleRemoveDestination}
          onPlaceChanged={onPlaceChanged}
          destinationAddresses={destinationAddresses}
          selectedTravelMode={selectedTravelMode}
          SetSelectedTravelMode={SetSelectedTravelMode}
          time={time}
          setTime={setTime}
          handlePublicOrigin={handlePublicOrigin}
          handlePublicDestination={handlePublicDestination}
          calculateRoute={calculateRoute}
          handleDeleteRoute={handleDeleteRoute}
          directions={directions}
          toogleRoute={toogleRoute}
        />
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button className="h-20 w-20 rounded-full  bg-lightgray text-orange">
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
              <Popover.Button className="h-20 w-20 rounded-full  bg-lightgray text-orange">
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
              <Popover.Button className="h-20 w-20 rounded-full  bg-lightgray text-orange">
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
              <Popover.Button className="h-20 w-20 rounded-full  bg-lightgray text-orange">
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
