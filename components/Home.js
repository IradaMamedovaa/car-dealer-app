import React, { useMemo, useState } from 'react'
import Link from 'next/link'

const Home = ({ makes }) => {
  const [selectedMake, setSelectedMake] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const currentYear = new Date().getFullYear()

  const years = useMemo(
    () => Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i),
    [currentYear]
  )

  const selectClass = 'mt-1 block w-full px-4 py-2 border rounded-md'
  const labelClass = 'block text-lg font-medium text-gray-700'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 pl-2 pr-2 text-center">
      <h1 className="text-3xl font-bold mb-8 ">
        Select Vehicle Make and Model Year
      </h1>

      <div className="mb-4">
        <label className={labelClass}>Vehicle Make</label>
        <select
          className={selectClass}
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
        >
          <option value="" className="">
            Choose a make
          </option>
          {makes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className={labelClass}>Model Year</label>
        <select
          className={selectClass}
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Choose a year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <Link
        href={
          selectedMake && selectedYear
            ? `/result/${selectedMake}/${selectedYear}`
            : '#'
        }
        passHref
      >
        <button
          className={`mt-6 px-6 py-3 rounded-lg font-semibold text-white ${
            selectedMake && selectedYear
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-blue-500 opacity-50 cursor-not-allowed'
          }`}
          disabled={!selectedMake || !selectedYear}
        >
          Next
        </button>
      </Link>
    </div>
  )
}

export default Home
