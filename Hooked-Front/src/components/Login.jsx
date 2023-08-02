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
        localStorage.removeItem('users')
        logout()
        setSelectedUser(null)
        navigate(`/login?id=${selectedUser._id}`)
      };

    const handleSubmit = (event) => {
        event.preventDefault()
    const user = users.find((user) => user.userName === formState.userName && user.password === formState.password)
    if (user) {
      console.log('Logged in:', user);
      setFormState({ ...formState, valid: 'Login Successful' });
      localStorage.setItem('user', JSON.stringify(user)); 
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
                    <h4>Please log in.</h4>
                    <div className='form-floating'>
                        <input 
                            type= 'text'
                            name='userName'
                            id='userName'
                            onChange= {handleChange}
                            placeholder='Username'
                            value={formState.userName}
                            className='form-control form-control-lg'
                            />
                        <label for='userName' className='form-label'>Username</label>
                    </div>
                    <div className='form-floating'>
                        <input 
                            type= 'password'
                            name='password'
                            id='password'
                            onChange= {handleChange} 
                            placeholder='Password'
                            value={formState.password}
                            className='form-control form-control-lg'
                            />
                        <label for='userName' className='form-label' >Password</label>
                    </div>
                        <button className='login-button' type='submit'>
                            Log in
                        </button>
                        {formState.valid && <p>{formState.valid}</p>}
                        {selectedUser ? (
                            <div className='loginbuttons'>
                            {/* <button className='profbutton' onClick={showAccount}>Go Account Page</button> */}
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