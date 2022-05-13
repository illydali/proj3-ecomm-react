import React from 'react'

import Spinner from 'react-bootstrap/Spinner'

export default function Loading() {
  return (
    //   <Spinner animation="grow" role="status">
    //   <span className="visually-hidden">Loading...</span>
    // </Spinner>

    <div id="trnt">
      <div className="trnt_turntable">
        <div className="trnt_floor"></div>
        <div className="trnt_arm"></div>
        <div className="trnt_vinyl">
          <div className="trnt_wheel trnt_wheel-1"></div>
          <div className="trnt_wheel trnt_wheel-2"></div>
          <div className="trnt_wheel trnt_wheel-3"></div>
          <div className="trnt_cover"></div>
          <div className="trnt_middle"></div>
          <div className="trnt_hole"></div>
        </div>
      </div>
      <span className="trnt_text">getting funky...</span>
    </div>

   
  )
}

