import React from 'react'

const SchoolCard = props => {
  return (
    <div className="ui row centered card">
      <div className="content">
        <div className="header">{props.team.name}</div>
        <h4 className="meta">
          {props.team.city},{props.team.state}
        </h4>
      </div>
      <div className="content">
        {props.team.mascot}
        <br />
        {props.team.colors}
      </div>
    </div>
  )
}

export default SchoolCard
