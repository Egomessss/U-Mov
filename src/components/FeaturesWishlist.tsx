import Navbar from "@/components/Navbar"
import { Tab } from "@headlessui/react"
import React, { useState } from "react"
import { GoArrowUp, GoArrowDown } from "react-icons/go"

function FeaturesWishlist() {
  let features = {
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
      <Tab.List className=" flex space-x-1 rounded-xl p-1 w-full">
        {Object.keys(features).map((category) => {
          return (
            <Tab
              key={category}
              className=" rounded-lg bg-white px-4 py-2"
            >
              {category}
            </Tab>
          )
        })}
      </Tab.List>
      <Tab.Panels className="mt-2 w-full">
        {Object.values(features).map((posts, idx) => {
          return (
            <Tab.Panel
              key={idx}
              className="ring-offset-blue-400 rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2 w-full"
            >
              <ul className="flex flex-col gap-2 w-full">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="hover:bg-gray-100 relative flex gap-2 rounded-md border-2 p-3 justify-between w-full"
                  >
                    <div>
                      {" "}
                      <h3 className="text-sm font-medium leading-5">
                        {post.title}
                      </h3>
                      <span>{post.date}</span>
                    </div>
                    <div className="flex w-8 flex-col gap-2 ">
                      <button>
                        <GoArrowUp  className="text-4xl text-blue"/>
                      </button>
                      <button>
                        <GoArrowDown className="text-4xl text-orange" />
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

export default FeaturesWishlist
