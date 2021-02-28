import React from 'react'

const Vertical = (props) => (
  <div data-flex-splitter-vertical style={props.style}>
    {props.children}
  </div>
)

export default Vertical
