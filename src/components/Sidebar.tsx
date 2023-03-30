import { Disclosure, Popover, Transition } from "@headlessui/react"
import {
  ArrowRightIcon,
  ClockIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline"
import React, { Fragment, useState } from "react"
import { Autocomplete } from "@react-google-maps/api"

function Sidebar({
  centerMap,
  clearRoute,
  onPlaceChanged,
  handleDestinationAddress,
  handleNewDestinationAddress,
  handleNewDestinationName,
  handleRemoveDestination,
  destinationAddresses,
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
                    <h2>Main routes</h2>
                    <div>
                      <div className="flex items-center justify-center gap-2">
                        <h3>Home</h3>
                        {/* this icons changes color according to user */}
                        <ArrowRightIcon className="h-6" />
                        <h3>Job</h3>
                      </div>
                      <div>
                        <label htmlFor="home-input">Home</label>
                        <Autocomplete
                          onPlaceChanged={onPlaceChanged}
                          // onLoad={onLoad}
                        >
                          <input
                            className="w-full  border-b-2 border-lightgray bg-white px-2"
                            type="text"
                            placeholder="Enter Your Home Adress"
                            id="home-input"
                          />
                        </Autocomplete>
                      </div>
                      <div>
                        <div>
                          <form onSubmit={handleDestinationAddress}>
                            <label htmlFor="job-input">Destination</label>
                            {/* <Autocomplete> */}
                            <input
                              className="w-full  border-b-2 border-lightgray bg-white px-2"
                              type="text"
                              placeholder="Add a name for the destination"
                              id="job-input"
                              onChange={handleNewDestinationName}
                            
                            />{" "}
                            {/* </Autocomplete> */}
                            <input
                              className="w-full  border-b-2 border-lightgray bg-white px-2"
                              type="text"
                              placeholder="Add a destination adress"
                              id="job-input"
                              onChange={handleNewDestinationAddress}
                            
                            /> 
                            <button type="submit">Add another destination</button>
                          </form>

                         
                        </div>
                        <div className="pt-4">
                          <ul className="flex flex-col gap-2">
                            {destinationAddresses.map(
                              ({ id, name, address }) => (
                                <li
                                  className="border-b-2 pb-4"
                                  key={id}
                                >
                                  <div className="flex gap-2">
                                    <span>{name}</span>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <div className=" flex gap-4">
                                      <span>{address}</span>
                                      <button className="rounded-md bg-orange px-2">
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* <div>
                      <div className="flex items-center justify-between">
                        <h3>Job</h3>
                        <ArrowRightIcon className="h-6" />
                        <h3>Home</h3>
                      </div>
                      <div>
                        <label htmlFor="job-input">Job</label>
                        <Autocomplete>
                          <input
                            className="w-full rounded-md border-2 bg-white px-2"
                            type="text"
                            placeholder="Enter Your Job Adress"
                            id="job-input"
                            ref={originRef}
                          />
                        </Autocomplete>
                      </div>
                      <div>
                        <label htmlFor="home-input">Home</label>
                        <Autocomplete>
                          <input
                            className="w-full rounded-md border-2 bg-white px-2"
                            type="text"
                            placeholder="Enter Your Home Adress"
                            id="home-input"
                            ref={originRef}
                          />
                        </Autocomplete>
                      </div>
                    </div> */}
                  </div>

                  {/* <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <h3>Add a deviation</h3>
                      <input
                        className="w-full rounded-md border-2 bg-white px-2"
                        type="text"
                        placeholder="Deviations"
                      />
                    </div>
                  </div> */}

                  <div className="flex justify-between py-6">
                    {" "}
                    <button>Get Routes</button>
                    <button>Clear selection</button>
                  </div>

                  <h3>Summary</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span>House</span>
                      <ArrowRightIcon className="h-6" />
                      <span>Job</span>
                      {/* {distance.map(()=>{
                        
                      })} */}
                      <span></span>
                      <div className="flex gap-2">
                        <ClockIcon className="h-6" />
                        <span> </span>
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
