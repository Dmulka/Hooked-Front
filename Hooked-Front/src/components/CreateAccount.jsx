import React, { useState } from 'react'
import axios from "axios"


const CreateAccount = () => {
    const initialState = { 
        name: '',
        userName: '',
        email: '',
        password: '',
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
        const response = await asiox.post('http://localhost:3001/api/users',{
            name: formState.name,
            userName: formState.userName,
            email: formState.email,
            password: formState.password
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
                    <label htmlFor='name'>Name:</label>
                    <input onChange ={handleChange}
                           name='name'
                           type='text'
                           id= 'name'
                           placeholder="Enter full name here"
                           value={formState.name}
                            />
                </div>
                <div className ='form-input'>
                    <label htmlFor='userName'>create a username</label>
                    <input onChange ={handleChange}
                           name='userName'
                           type='text'
                           id= 'userNamee'
                           placeholder='Username'
                           value={formState.userName}
                            />
                </div>
                <div className ='form-input'>
                    <label htmlFor='email'>enter a valid email</label>
                    <input onChange ={handleChange}
                           name='email'
                           type='text'
                           id= 'email'
                           placeholder="please enter a valid email"
                           value={formState.email}
                            />
                </div>
                <div className ='form-input'>
                    <label htmlFor='password'>password:</label>
                    <input onChange={handleChange}
                           name='password'
                           type='text'
                           id= 'password'
                           placeholder="password"
                           value={formState.password}
                            />
                </div>
                <button type='submit'> Create Account</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    )
}

export default CreateAccount