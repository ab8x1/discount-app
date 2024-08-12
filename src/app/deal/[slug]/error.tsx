'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
}: {
  error: Error
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className='container' style={{maxWidth: '930px'}}>
      <h2 style={{marginTop: "50px"}}>Deal not found</h2>
    </main>
  )
}