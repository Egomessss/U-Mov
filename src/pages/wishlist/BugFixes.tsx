import Navbar from "@/components/Navbar"
import { Tab } from "@headlessui/react"
import React, { useState } from "react"
import { GoArrowUp, GoArrowDown } from "react-icons/go"
import { IoMdAdd } from "react-icons/io"

function BugFixes() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleFormOpen = () => {
    setIsFormOpen((prev) => !prev)
  }

  let [value, setValue] = useState("")

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  let BugFixesAndReport = {
    "Map/Directions/Places": [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Data: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    "User Experience": [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
    "Bug fixes": [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  }
  return (
    <Tab.Group>
      <Tab.List className=" flex w-full space-x-1 rounded-xl p-1">
        {Object.keys(BugFixesAndReport).map((category) => {
          return (
            <Tab
              key={category}
              className=" rounded-lg bg-white px-4 py-2"
            >
              {category}
            </Tab>
          )
        })}
        <button
          onClick={handleFormOpen}
          className=" flex items-center gap-2 rounded-lg bg-white px-4 py-2"
        >
          <span>Add</span>
          <IoMdAdd />
        </button>
      </Tab.List>

      {isFormOpen && (
        <form
          className="w-full"
          action=""
        >
          <label htmlFor=" ">Title</label>
          <input
            type="text"
            className="w-full rounded-md border-2 border-gray-200 p-2"
            placeholder="Title..."
          />
          <label htmlFor=""></label>
          <textarea
            className="w-full resize-none rounded-md border-2 border-gray-200 p-2"
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Description of the feature..."
          ></textarea>
        </form>
      )}
      <Tab.Panels className="mt-2 w-full">
        {Object.values(BugFixesAndReport).map((posts, idx) => {
          return (
            <Tab.Panel
              key={idx}
              className="w-full rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            >
              <ul className="flex w-full flex-col gap-2">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative flex w-full justify-between gap-2 rounded-md border-2 p-3 hover:bg-gray-100"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h2 className=" leading-5">{post.title}</h2>
                        <span>{post.date}</span>
                        <span className="rounded-lg bg-green-500 px-2">
                          Priority - In progress
                        </span>
                        <span className="rounded-lg bg-green-300 px-2">
                          Added to Pipeline
                        </span>
                        <span className="rounded-lg bg-yellow-500 px-2">
                          Low priority
                        </span>
                        <span className="rounded-lg bg-red-500 px-2">
                          Rejected
                        </span>
                      </div>
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Expedita debitis dolor voluptatibus veritatis
                        inventore soluta eligendi harum qui dicta aut ab,
                        explicabo blanditiis, iste perspiciatis quidem ipsam
                        aperiam ad nemo.
                      </p>
                    </div>

                    <div className="flex w-8 flex-col gap-2 ">
                      <button>
                        <GoArrowUp className="text-blue-500 text-4xl" />
                      </button>
                      <button>
                        <GoArrowDown className="text-orange-500 text-4xl" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          )
        })}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default BugFixes
