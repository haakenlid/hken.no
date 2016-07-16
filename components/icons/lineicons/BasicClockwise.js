import React from 'react'

const BasicClockwise = () => (
  <svg className="Icon" id="BasicClockwise" viewBox="0 0 64 64">
    <polyline points="32,12 32,32 41,41 " />
    <line x1="4" x2="8" y1="32" y2="32" />
    <line x1="56" x2="60" y1="32" y2="32" />
    <line x1="32" x2="32" y1="60" y2="56" />
    <line x1="32" x2="32" y1="8" y2="4" />
    <path d="M32,63c17.121,0,31-13.879,31-31S49.121,1,32,1" />
    <path d="M32,63C14.879,63,1,49.121,1,32  c0-6.713,2.134-12.926,5.759-18l5.62-5.621" />
    <polyline points="13,19 13,8 2,8   " />
  </svg>
)
export default BasicClockwise
