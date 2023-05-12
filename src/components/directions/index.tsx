import { Popover, Tab, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import { BiDirections } from "react-icons/bi"
import {
  MdDirectionsCar,
  MdDirectionsBusFilled,
  MdOutlineDirectionsBike,
  MdDirectionsWalk,
} from "react-icons/md"
import Driving from "./Driving"
import PublicTransport from "./PublicTransport"

function Directions() {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button className="bg-lightgray text-orange flex  h-20 w-20 flex-col items-center justify-center rounded-full">
            <BiDirections className="text-xl" />
            <p>Directions</p>
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
                <h2>Routes</h2>
                <Tab.Group defaultIndex={1}>
                  <Tab.List className="flex justify-between">
                    <Tab>
                      <MdDirectionsCar className="text-xl" />
                    </Tab>
                    <Tab>
                      <MdDirectionsBusFilled className="text-xl" />
                    </Tab>
                    <Tab>
                      <MdOutlineDirectionsBike className="text-xl" />
                    </Tab>
                    <Tab>
                      <MdDirectionsWalk className="text-xl" />
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    {/* Driving */}
                    <Driving />
                    {/* Public transport */}
                    {/* <PublicTransport /> */}
                    <Tab.Panel>Cycling</Tab.Panel>
                    <Tab.Panel>Walking</Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
              {/* <div>
                <h3>Summary</h3>
                <ul className="flex flex-col gap-2">
                  {destinationAddresses.map(({ id, name, address }) => (
                    <li
                      className="border-b-2 pb-4"
                      key={id}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                          <span>Home</span>
                          <ArrowRightIcon className="h-6" />
                          <span>{name}</span>
                          <span>24 km</span>
                          <div className="flex gap-2">
                            <ClockIcon className="h-6" />
                            <span>24mins</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div> */}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default Directions
