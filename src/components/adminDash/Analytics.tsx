import React from 'react'

const Analytics = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center overflow-y-auto">
      <iframe
        className='rounded-lg'
        src="https://lookerstudio.google.com/embed/reporting/f92a46a9-b55a-40a2-a1a5-5e3d94f83872/page/uQyDF"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        allowFullScreen
      >
      </iframe>
    </div>
  )
}

export default Analytics