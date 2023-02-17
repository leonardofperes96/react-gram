import React from 'react'
import {useParams} from 'react-router-dom'

const PhotoPage = () => {
  const params = useParams()
  console.log(params)
  return (
    <div>
      Photo {params.id}
    </div>
  )
}

export default PhotoPage
