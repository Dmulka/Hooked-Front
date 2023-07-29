import React, { useState } from 'react'
import axios from "axios"



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

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormState({ ...formState, [name]: value });
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        console.log(formState)
    
    try {
        const response = await asiox.post('http://localhost:3001/api/reports',{
            lon: formState.lon,
            lat: formState.lat,
            species: formState.species._id,
            depth: formState.depth,
            season: formState.season,
            lures: formState.lures,
            comment: formState.comment
        })
        console.log(response.data)
    } catch (error)  {
        if (!error?.response) {
            setErrorMessage ('No server response')
        } else {
            setErrorMessage('signup faild') 
    }}

    setFormState(initialState)
  }
    return (
        <div className='form-container'>
        <form className='create-account-form' onSubmit={handleSubmit}>
            <h4>Create an Accouunt</h4>
            <div className ='form-input'>
                <label htmlFor='depth'>Depth:</label>
                <input onChange ={handleChange}
                       name='depth'
                       type= {Number}
                       id= 'depth'
                       placeholder="Depth"
                       value={formState.depth}
                        />
            </div>
            <div className ='form-input'>
                <label htmlFor='season'>Season:</label>
                <select id='season' onChange ={handleChange}>
                    <option value='Winter'>Winter</option>
                    <option value='Spring'>Spring</option>
                    <option value='Summer'>Summer</option>
                    <option value='Fall'>Fall</option>
                </select>     
            </div>
            <div className ='form-input'>
                <label htmlFor='lures'>Lure used:</label>
                <input onChange ={handleChange}
                       name='lures'
                       type= 'text'
                       id= 'lures'
                       placeholder="Lure used"
                       value={formState.depth}
                        />
            </div>
            <div className ='form-input'>
                <label htmlFor='comment'>Comment</label>
                <input onChange ={handleChange}
                       name='comment'
                       type= 'text'
                       id= 'comment'
                       placeholder="Leave a comment"
                       value={formState.depth}
                        />
            </div>
         </form>
        </div>       


    )
}

export default Report