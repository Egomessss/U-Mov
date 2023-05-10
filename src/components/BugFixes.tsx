import Navbar from "@/components/Navbar"
import { Tab } from "@headlessui/react"
import React, { useState } from "react"

function BugFixes() {
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
      <Tab.List className=" flex space-x-1 rounded-xl p-1">
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
      </Tab.List>
      <Tab.Panels className="mt-2">
        {Object.values(BugFixesAndReport).map((posts, idx) => {
          return (
            <Tab.Panel
              key={idx}
              className="ring-offset-blue-400 rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2"
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="hover:bg-gray-100 relative rounded-md p-3"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="text-gray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                      <li>{post.shareCount} shares</li>
                    </ul>

                    <a
                      href="#"
                      className="ring-blue-400 absolute inset-0 rounded-md focus:z-10 focus:outline-none focus:ring-2"
                    />
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
