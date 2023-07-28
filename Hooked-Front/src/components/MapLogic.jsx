import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useRef } from 'react'


const MapLogic = () => {
    const mapCcontainerRef = useRef(null)
    useEffect(() => {
    const fetchData = async () => {
    try {
    const response = await axios.get('http://localhost:3001/api/reports')
    const data = response.data 

    mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOXTOKEN
    const map = mapboxgl.Map({
        csontainer: mapCcontainerRef.corrent,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-88.09, 42.2],
        zoom: 10,
    })
    data.forEach((entry) => {
        const lon = entry.lon 
        const lat = entry.lat 
        const species = entry.species
        const depth = entry.depth
        const season = entry.season
        const lures = entry.lures
        const comment = entry.comment 
        const marker = new mapboxgl.Marker({color: '#FFC000'})
        .setLngLat([lon, lat])
        .setPopup(new mapboxgl.Popup({className: 'popup'}).setHTML(`<h2>Report of ${type} at ${time} on ${date}</h2>`))
        .addTo(map)
    })


    } catch (error) {
        console.error('error', error)
    }
}
    fetchData()
    }, [])

    return (
        <div className= 'mapBox'>
            <div className='map' ref={mapCcontainerRef} />
         </div>   

    )
}

export default MapLogic 