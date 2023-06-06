import { Tab } from "@headlessui/react"
import React from "react"

function Expenses() {
  return (
    <>
      <Tab.Panel>
      <div>
        <h2 className=" w-full border-b-2">Expenses</h2>
        <form action="">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Home value:</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input-bordered input input-sm w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Down payment:</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input-bordered input input-sm w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Loan Amount</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input-bordered input input-sm w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Interest rate</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input-bordered input input-sm w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Loan term</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input-bordered input input-sm w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Start date</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input-bordered input input-sm w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Property tax</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input-bordered input input-sm w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">PMI</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input-bordered input input-sm w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Home insurance</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input-bordered input input-sm w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Monthly HOA</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input-bordered input input-sm w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Monthly HOA</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input-bordered input input-sm w-full "
            />
          </div>
        </form>
      </div>
      </Tab.Panel>
    </>
  )
}

export default Expenses
