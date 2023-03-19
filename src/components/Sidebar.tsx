import { Popover, Transition } from "@headlessui/react"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import React, { Fragment, useState } from "react"

function Sidebar() {
  return (
    <div className="absolute top-1/2 left-10 h-[80%] w-24 -translate-x-1/2 -translate-y-1/2 transform  rounded-3xl border-2 border-white">
      <div className="relative flex h-full w-full flex-col items-center justify-around">
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
                <Popover.Panel className="absolute left-24 top-0 h-full w-96 rounded-3xl bg-white"></Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
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
                <Popover.Panel className="absolute left-24 top-0 h-full w-96 rounded-3xl bg-white"></Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
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
                <Popover.Panel className="absolute left-24 top-0 h-full w-96 rounded-3xl bg-white"></Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
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
                <Popover.Panel className="absolute left-24 top-0 h-full w-96 rounded-3xl bg-white"></Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
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
