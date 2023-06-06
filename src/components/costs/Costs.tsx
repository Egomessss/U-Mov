import { Tab } from "@headlessui/react"
import React from "react"
import Expenses from "./Expenses"
import Mortgage from "./Mortgage"

function Costs() {
  return (
    <div className="h-full overflow-y-scroll px-4 py-6">
      <Tab.Group>
        <Tab.List className="flex justify-between">
          <Tab className="btn-success btn-sm btn w-[48%]">
            <span>Expenses</span>
          </Tab>
          <Tab className="btn-success btn-sm btn w-[48%]">Mortgage</Tab>
        </Tab.List>
        <Tab.Panels>
          <Expenses />
          <Mortgage />
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Costs
