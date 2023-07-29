import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useRef } from 'react'


const MapLogic = () => {
    const mapContainerRef = useRef(null)
    useEffect(() => {
    const fetchData = async () => {
    try {
    const response = await axios.get('http://localhost:3001/api/reports')
    const data = response.data 
    console.log(response)

    mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOXTOKEN
    const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-88, 42.2],
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
        .setPopup(new mapboxgl.Popup({className: 'popup'}).setHTML(`<h2>Report of ${species} at ${season} on ${depth} </h2>`))
        .addTo(map)
    })


    } catch (error) {
        console.error('error', error)
    }
}
    fetchData()
    }, [])

    return (
        <div className= 'mapBox' style={{width:'100%', height:'100%'}}>

            <div className='map' ref={mapContainerRef} style={{width:'100%', height:'100%'}}/>

         </div>   

    )
}

export default MapLogic 