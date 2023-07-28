import React, { useState, useEffect } from 'react'
import MapLogic from './MapLogic'
import { Link } from 'react-router-dom'


const MapPage = () => {
    return (
        <div className='mapPage'>
            <h1>Map Page </h1>
            <MapLogic />
        </div>
    )
}

export default MapPage