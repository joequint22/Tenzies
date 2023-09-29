import React, { useState, useEffect } from "react"
import ReactDOM from "react"
import '../styles.css'

export default function Die(props){

    const styles = {
        backgroundColor: props.isHeld ? "limegreen" : "white"  
    }
    
    return(
        <div onClick={props.handleClick} className="die-face flex" style={styles}>
            <h2  className="die-dot">{props.value}</h2>
        </div>
    )
}