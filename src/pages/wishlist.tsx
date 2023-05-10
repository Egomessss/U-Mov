import BugFixes from "@/components/BugFixes"
import FeaturesWishlist from "@/components/FeaturesWishlist"
import Navbar from "@/components/Navbar"
import { Tab } from "@headlessui/react"
import React, { useState } from "react"

function wishlist() {
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [BugsReportOpen, setBugsReportOpen] = useState(false)

  let categories = {
    "Features Wishlist": {
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
    },
    "Bug Fixes/Report": {
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
    },
  }

  const handleFeaturesClick = () => {
    setFeaturesOpen((prevState) => !prevState)
    setBugsReportOpen(false)
  }

  const handleBugsReportClick = () => {
    setBugsReportOpen((prevState) => !prevState)
    setFeaturesOpen(false)
  }

  return (
    <div className="px-6 py-4">
      <Navbar />
      <div className="flex w-full flex-col items-center justify-center">
        <Tab.Group>
          <Tab.List className=" flex space-x-1 rounded-xl p-1">
            <Tab
              onClick={handleFeaturesClick}
              className={
                featuresOpen
                  ? "rounded-lg border-2 bg-blue px-4 py-2"
                  : "rounded-lg bg-white px-4 py-2"
              }
            >
              Wishlist
            </Tab>
            <Tab
              onClick={handleBugsReportClick}
              className={
                BugsReportOpen
                  ? "rounded-lg border-2 bg-blue px-4 py-2"
                  : "rounded-lg bg-white px-4 py-2"
              }
            >
              Bug fixes/Report
            </Tab>
          </Tab.List>
          {featuresOpen && <FeaturesWishlist />}
          {BugsReportOpen && <BugFixes />}
        </Tab.Group>
      </div>
    </div>
  )
}

export default wishlist
