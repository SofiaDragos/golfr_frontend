import useSWR from 'swr'
import { getToken } from './userAuth'

const useName = id => {
  const NameURL = `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`

  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then( data => data.name)
  }

  const { data, error } = useSWR(NameURL, fetcher)

  return {
    name: data,
    error: error && error.message,
  }
}

export default useName
