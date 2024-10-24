const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      <p className="ml-4 text-lg text-gray-700">Loading...</p>
    </div>
  )
}

export default Loading
