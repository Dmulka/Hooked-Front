import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Nav = () => {
    const { isAuthenticated } = useContext(AuthContext)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className='Container'>
                <Link className="navbar-brand" to="/">Hooked</Link>
            <div className="navbar-nav ms-auto">
                <Link className='nav' to='/'>Home</Link>
                {isAuthenticated ? null : <Link className='nav' to='/login'>Login</Link>}
                {isAuthenticated ? <Link className='nav' to='/mappage'>Map</Link> : null}
                {isAuthenticated ? <Link className='nav' to='/report'>Report</Link> : null}
                {isAuthenticated ? null : <Link className='nav' to='/createaccount'>Create Account</Link>}
                {isAuthenticated ? <Link className='nav' to='/account'>Account</Link> : null}
                
            </div>
            </div>
        </nav> 



    )}

export default Nav