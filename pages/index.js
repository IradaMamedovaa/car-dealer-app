import Home from '@/components/Home'

export default function HomePage({ makes }) {
  return <Home makes={makes} />
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VEHICLE_API_URL}`)
  const data = await res.json()

  return {
    props: {
      makes: data.Results || []
    }
  }
}
