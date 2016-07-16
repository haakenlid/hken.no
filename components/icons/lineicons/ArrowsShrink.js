import React from 'react'

const ArrowsShrink = () => (
  <svg className="Icon" id="ArrowsShrink" viewBox="0 0 64 64">
    <g>
      <line x1="1" x2="23" y1="63" y2="41" />
      <polyline points="12,41 23,41    23,52  " />
    </g>
    <g>
      <line x1="63" x2="41" y1="63" y2="41" />
      <polyline points="41,52 41,41    52,41  " />
    </g>
    <g>
      <line x1="63" x2="41" y1="1" y2="23" />
      <polyline points="52,23 41,23    41,12  " />
    </g>
    <g>
      <line x1="1" x2="23" y1="1" y2="23" />
      <polyline points="23,12 23,23    12,23  " />
    </g>
  </svg>
)
export default ArrowsShrink
