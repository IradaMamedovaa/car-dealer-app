import React, { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import Loading from '@/components/loading'

const ResultPage = dynamic(() => import('@/components/ResultPage'), {
  suspense: true
})

export async function generateStaticParams() {
  const paths = [
    { makeId: '440', year: '2020' },
    { makeId: '441', year: '2021' }
  ]

  return paths.map(({ makeId, year }) => ({ makeId, year }))
}

export default function Result({ makeId, year }) {
  const [clientData, setClientData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `${process.env.NEXT_PUBLIC_VEHICLE_MODELS_API_URL}/${makeId}/modelyear/${year}?format=json`

      try {
        const res = await fetch(apiUrl)

        if (!res.ok) {
          throw new Error(
            `Failed to fetch vehicle models. Status: ${res.status}`
          )
        }

        const data = await res.json()

        if (!data.Results || data.Results.length === 0) {
          setError('No results found')
        } else {
          setClientData(data.Results)
        }
      } catch (err) {
        console.error('Error fetching vehicle models:', err)
        setError('Failed to fetch vehicle models.')
      }
    }

    fetchData()
  }, [makeId, year])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Suspense fallback={<Loading />}>
      {clientData ? (
        <ResultPage models={clientData} year={year} />
      ) : (
        <Loading />
      )}
    </Suspense>
  )
}

export async function getServerSideProps(context) {
  const { makeId, year } = context.params

  return {
    props: {
      makeId,
      year
    }
  }
}
