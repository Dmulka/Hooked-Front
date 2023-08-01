import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'


const initialState = {
    userName: '',
    password: '',
    valid: '',
}

const Login = () => {
    const { login, logout } = useContext(AuthContext)
    const [formState, setFormState] = useState(initialState)
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/users')
                setUsers(response.data)
            } catch (error) {
                console.error('Error could not fetch users:', error)
            }}   
            const loggedInUser = localStorage.getItem('users');
            const userId = new URLSearchParams(location.search).get('id');
    
            if (loggedInUser) {
                const user = JSON.parse(loggedInUser);
                login(user);
                setSelectedUser(user);
            }
    
            if (userId && selectedUser && userId === selectedUser._id) {
                setSelectedUser(null);
                localStorage.removeItem('users');
            }
    
            fetchUser();
       }, [login, location.search, selectedUser]);
        

    const handleChange = (event) => {
        const {name, value } = event.target
        setFormState({...formState, [name]: value })
    }

    const handleLogout = () => {
        localStorage.removeItem('users'); // Clear user from local storage
        logout(); // Clear user from context
        setSelectedUser(null);
        navigate(`/login?id=${selectedUser._id}`); // Navigate to login page with user ID as query parameter
      };

    const handleSubmit = (event) => {
        event.preventDefault()
    const user = users.find((user) => user.userName === formState.userName && user.password === formState.password)
    if (user) {
      console.log('Logged in:', user);
      setFormState({ ...formState, valid: 'Login Successful' });
      localStorage.setItem('user', JSON.stringify(user)); // Store user in local storage
      login(user);
      setSelectedUser(user)

      } else {
        setFormState({ ...formState, valid: 'Invalid credentials' });
        
      }}

    const showAccount = () => {
        if (selectedUser) {
          navigate(`${selectedUser._id}/`);
        }
      }

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
                        {formState.valid && <p>{formState.valid}</p>}
                        {selectedUser ? (
                            <div className='loginbuttons'>
                            <button className='profbutton' onClick={showAccount}>Go Account Page</button>
                            <button className='logout' onClick={handleLogout}>Logout</button>
                            </div>
                        ) : (
                            <Link to="/CreateAccount" id='linktocreate'>
                            <button id="create-account" className="createAccount">
                                Create an account.
                            </button>
                            </Link>
                        )}
                </form>
            </div>
        </div>
    )
}

export default Login 