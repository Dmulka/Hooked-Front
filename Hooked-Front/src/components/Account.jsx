import { useNavigate,} from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from'../context/AuthContext'
import axios from 'axios'





const Account = () => {

    const { isAuthenticated, users, logout } = useContext(AuthContext)
     
    let navigate = useNavigate()

    const id = users ? users._id : null

    useEffect(()=> {
        const getUserAccount = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/users/${id}`)
                const data = response.data 
                console.log(data)
            } catch (error) {
                console.error('Error fetching user', error)
            }
        }
        if (id) {
        getUserAccount()
        }
    }, [id])

    const [name, setName] = useState(users.name)
    const [userName, setUserName] = useState(user.userName)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState(user.password)
    const [success, setSuccess] = useState(false)

    const handleAccountUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/users/${id}`, {
               name: name,
               userName: userName,
               email: email,
               password: password
            })
            setSuccess(true)
        } catch (error) {
            console.error('Failed to update user', error)
        }}

        const handleDelete = async () => {
            try {
                await axios.delete(`http://localhost:3001/api/users/${id}`,)
                setSuccess(true)
                handleLogout()
            } catch (error) {
                console.error('Error deleting user', error)
            }}

            const handleLogout = () => {
                localStorage.removeItem('user'); // Clear user from local storage
                logout(user); // Clear user from context
                setSelectedUser(null);
              }
    

              const showUserReports = () => {
                navigate(`userReports/${id}/`)
            }

    return (
        <div calssName='usePage'>
        <div className='form-container'>
            <form className='update-account-form' onSubmit={handleSubmit}>
                <h4>Account Page</h4>
                <div className ='form-input'>
                    <p>Nmae: {user.name}</p>
                    <label htmlFor='name'>Name:</label>
                    <input onChange={(e) => setName(e.target.value)}
                           type='text'
                           placeholder="Update Name"/>
                           <button type='submit' onClick={handleAccountUpdate}>Update</button>
                </div>
                <div className ='form-input'>
                    <p>Username: {user.userName}</p>
                    <label htmlFor='userName'>Username:</label>
                    <input onChange={(e) => setUserName(e.target.value)}
                           type='text'
                           placeholder="Update username"/>
                           <button type='submit' onClick={handleAccountUpdate}>Update</button>
                </div>
                <div className ='form-input'>
                    <p>Email: {user.eamil}</p>
                    <label htmlFor='name'>Email:</label>
                    <input onChange={(e) => setEmail(e.target.value)}
                           type='eamil'
                           placeholder="Update Name"/>
                           <button type='submit' onClick={handleAccountUpdate}>Update</button>
                </div>
                <div className ='form-input'>
                    <p>Password: {user.password}</p>
                    <label htmlFor='name'>Password:</label>
                    <input onChange={(e) => setPassword(e.target.value)}
                           type='text'
                           placeholder="Update Name"/>
                           <button type='submit' onClick={handleAccountUpdate}>Update</button>
                </div>
                    <button type='submit'> Create Account</button>
                    {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    </div>

    )
}

export default Account 