import classes from './MeetupDetails.module.css'
import React from 'react'

function MeetupDetails(props) {
  return (
        <section className={classes.detail}>
            <div>
                <h1>meetupdataId: {props.id}</h1>
            </div>
            <div>
                <img src={props.image} alt={props.title} />
            </div>
            <div>
                <h1>{props.title}</h1>
            </div>
            <div>
                <p>{props.address}</p>
            </div>
        </section>
  )
}

export default MeetupDetails