import React from 'react'

const ResultPage = ({ models, year, error }) => {
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-100">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-lg">
          Unable to fetch vehicle models for the selected make and year.
        </p>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 pt-8 pb-8 text-center">
      <h1 className="text-3xl font-bold mb-8">
        Vehicle Models for {models[0].Make_Name} in {year}
      </h1>

      {models.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {models.map((model) => (
            <div
              key={model.Model_ID}
              className="p-4 bg-white shadow rounded-lg w-60"
            >
              <p className="text-lg font-medium">Model: {model.Model_Name}</p>
              <p className="text-sm text-gray-500">
                Model ID: {model.Model_ID}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg">No models available for this make and year.</p>
      )}
    </div>
  )
}

export default ResultPage
