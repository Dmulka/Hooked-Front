import React, { useState, useEffect } from 'react'
import axios from "axios"
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { Link } from 'react-router-dom'



const Report = () => {
    const initialState = { 
        lon: '',
        lat: '',
        species: '',
        depth: '',
        season: '',
        lures: '',
        comments: ''
    }

    const [formState, setFormState] = useState(initialState)
    const [errorMessage, setErrorMessage] = useState('')
    const [LocationLoading, setLocationLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [lat, setLatitude] = useState('')
    const [lon, setLongitude] = useState('')
    const [speciesOptions, setSpeciesOptions] = useState([])


    useEffect(() => { 
        const fetchSpecies = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/species')
                setSpeciesOptions(response.data)
            } catch (error) {
                console.error('Error fetching species', error)
            }
        }
        fetchSpecies()
    }, []) 

    const handleChange = (evt) => {
        const { id, value } = evt.target;
        setFormState({ ...formState, [id]: value });
    }

    const handleGeolocation = (e) => {
        e.preventDefault()
        if (navigator.geolocation) {
            setLocationLoading(true)
            navigator.geolocation.getCurrentPosition(
                (position) => {
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude
                setLongitude(longitude)
                setLatitude(latitude)
                setLocationLoading(false)
            },
            (error) => {
                console.log('error', error)
                setLocationLoading(false)
            })

        } else {
            console.log('geolocation not supported')
        }
    }

        const geocode = async () => {
        try{
                const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent()}.json?access_token=${import.meta.env.VITE_APP_MAPBOXTOKEN}`)
                    const location = response.data.features[0].geometry.coordinates
                    console.log('latitude', location[1])
                    console.log('longitude', location[0])
                    setLongitude(location[0])
                    setLatitude(location[1])
                    postReport(location[1], location[0])
                 } catch (error) {
                    console.log(error)
                }
         }      

        const postReport = async (lat, lon) => {
        try {
            const response = await axios.post('http://localhost:3001/api/reports',{
                lon: lon,
                lat: lat,
                species: formState.species.name,
                depth: formState.depth,
                season: formState.season,
                lures: formState.lures,
                comment: formState.comments
            })
            console.log(response.data)
            setFormState(initialState)
        } catch (error)  {
            if (!error?.response) {
                setErrorMessage ('No server response')
            } else {
                setErrorMessage('signup faild') 
        }}}

        const handleSubmit = async (evt) => {
            evt.preventDefault()
            console.log(formState)
            setSuccess(true)
            if (formState.lat !== '' && formState.lon !== '') {
                postReport()
            } else if (formState.lat === '' && formState.lon === ''){
                postReport(lat, lon)
            }} 

    return (
        <div className="report-form-page">
        {success ? (
          <section>
              <h1>Report successfully created.</h1>
              <p>
              <Link className="mappage" to="/"><button id="MapPage" className="submit-button">Go home.</button></Link> 
              </p>
          </section>
      ) : (
        <div className='form-container'>
        <form className='create-account-form' onSubmit={handleSubmit}>
            <h4>File a Report</h4>
            <div className ='form-input'>
                <label htmlFor='lures'>Species:</label>
                <select id='species' onChange={handleChange} value={formState.species}>    
                <option value="">Select Species</option>
                {speciesOptions.map((species) => (
                  <option key={species._id} value={species.name}>
                    {species.name}
                  </option>
                ))}
                </select>          
            </div>
            <div className ='form-input'>
                <label htmlFor='depth'>Depth:</label>
                <input onChange ={handleChange}
                       name='depth'
                       type= 'number'
                       id= 'depth'
                       placeholder="Depth"
                       value={formState.depth}
                        />
            </div>
            <div className ='form-input'>
                <label htmlFor='season'>Season:</label>
                <select id='season' onChange ={handleChange}>
                    <option id='season' value='Winter'>Winter</option>
                    <option id='season' value='Spring'>Spring</option>
                    <option id='season' value='Summer'>Summer</option>
                    <option id='season' value='Fall'>Fall</option>
                </select>     
            </div>
            <div className ='form-input'>
                <label htmlFor='lures'>Lure used:</label>
                <input onChange ={handleChange}
                       name='lures'
                       type= 'text'
                       id= 'lures'
                       placeholder="Lure used"
                       value={formState.lures}
                        />
            </div>
            <div className ='form-input'>
                <label htmlFor='comments'>Comment</label>
                <textarea onChange ={handleChange}
                       name='comments'
                       type= 'text'
                       id= 'comments'
                       placeholder="Leave a comment"
                       value={formState.comments}
                        />
            </div>
            <div className ='form-input'>
                <label htmlFor='userlocation'>Location: </label>
                <div className='locationdiv'>
                {LocationLoading ? ( <button id="loadinglocation">Getting Location</button>
                    ) : (
                        lat !== '' ? (
                            <button id="havelocation">Received</button>
                        ) : (
                     <button id="currentLocation" type='button' onClick={handleGeolocation}>Use Location</button>))} 
                     {/* <p id='or'>OR</p>
                    <textarea id='address' onChange={handleChange} placeholder='Enter address'></textarea> */}
                </div>
            </div>
            <button className='submitBtn' type='submit'>Submit Report </button>
         </form>
        </div>       
    )}
    </div>
 )
}  


export default Report