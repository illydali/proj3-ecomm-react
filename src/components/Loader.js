import React from 'react'

import {Container} from 'react-bootstrap'

export default function Loading() {

  // https://github.com/digisz/trnt 
  
  return (
    <Container className='min-vh-75' >
      <div id="trnt" className='py-5' >
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
    </Container>

  )
}

