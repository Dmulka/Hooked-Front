import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {  AuthContext } from './AuthCoontext'




const Login = () => {
    const { login, logout } = useContext(AuthContext)
    const [formState, setFormState] = useState({

    userName: '',
    password: '',
})
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUser()
    },[])



const fetchUser = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/users')
        setUser(response.data)
    } catch (error) {
        console.error('Error could not fetch users:', error)
    }}

    const handleChange = (event) => {
        const {name, value } = event.target
        setFormState({...formState, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    
    // Find the user with matching username
    const user = users.find((user) => user.userName === formState.userName)

    // Check if the user exists and the password matches
    if (user && user.password === formState.password) {
        // Perform successful login actions (e.g., set token, update context)
        login(); // Call the login function from your AuthContext
        // Optionally, you can redirect the user to a dashboard page or private area
      } else {
        // Handle login failure
        console.log('Login failed. Invalid credentials.');
        // You can display an error message to the user here
      }
  
      setFormState({
        userName: '',
        password: '',
      });
    };

    


    return (
        <div className='login'> 
            <div className='form -container'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <h4>Pleae log in.</h4>
                    <div className='Login-questions'>
                        <label htmlFor='userName'>userName</label>
                        <input 
                            type= 'text'
                            name='userName'
                            id='userName'
                            onChange= {handleChange}
                            placeholder='Username'
                            value={formState.userName}
                            />
                    </div>
                    <div className='Login-questions'>
                        <label htmlFor='password'>password</label>
                        <input 
                            type= 'password'
                            name='password'
                            id='password'
                            onChange= {handleChange}
                            placeholder='Password'
                            value={formState.password}
                            />
                    </div>
                        <button className='login-button' type='submit'>
                            Log in
                        </button>
                </form>
            </div>
        </div>
    )
}

export default Login 