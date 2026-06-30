import React from 'react'
import loadingSpinner from "@/assets/images/infinite-spinner.svg"

const Loading = () => {
  return (
   <div className='fixed inset-0 z-50 flex justify-center items-center bg-transparent'>
    <img src={loadingSpinner} alt="Loading..." className='w-40' />
</div>
  )
}

export default Loading