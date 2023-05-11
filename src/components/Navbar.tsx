import ThemeToggler from "@/hooks/ThemeToggler"
import React, { Fragment } from "react"
import { AiOutlineArrowRight } from "react-icons/ai"
import { CgMenuGridR } from "react-icons/cg"
import { useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Link from "next/link"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)

  const closeModal = () => setIsOpen(false)

  return (
    <nav className="flex h-[50px] w-full justify-between font-lilita ">
      <div>
        <h1 className="text-5xl ">u-Mov</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggler />
        <button
          className="md:hidden"
          onClick={openModal}
          aria-label="Show menu"
        >
          <CgMenuGridR className="h-8 w-8 text-orange" />
        </button>

        <div className="hidden md:flex md:gap-14">
          <ul className="flex items-center gap-10 text-xl uppercase">
            {/* <li>
                            <button>Link 1</button>
                        </li> */}
            <Link href={"/wishlist"}>Wishlist</Link>

            <li>
              <button>Log in</button>
            </li>
          </ul>
          <button className="flex w-[150px] items-center justify-center gap-2 rounded-md text-2xl uppercase dark:bg-orange-500 dark:text-black">
            <p>Sign up</p>
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-[100dvh] w-full bg-darkgray px-6  py-4 text-left transition-all  md:hidden">
                  <header className="flex items-center justify-between">
                    <h1 className="font-lilita text-5xl">u-Mov</h1>
                    <div className="flex">
                      {" "}
                      <ThemeToggler />
                      <button
                        onClick={closeModal}
                        aria-label="Show menu"
                      >
                        <CgMenuGridR className="h-8 w-8 text-orange" />
                      </button>
                    </div>
                  </header>
                  <main>
                    <ul>
                      {/* <li>
                                                <a href="">Link 1</a>
                                            </li> */}
                      <li>
                        <a href="">Wishlist </a>
                      </li>
                      <li>
                        <a href="">Log in</a>
                      </li>
                      <li>
                        <a href=""> Sign up</a>
                      </li>
                    </ul>
                  </main>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </nav>
  )
}

export default Navbar
