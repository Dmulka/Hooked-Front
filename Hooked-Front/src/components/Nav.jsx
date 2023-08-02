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
               <ul className='navbar-nav'>
                <li classNmae= 'nav-item'> 
                 <Link className='nav' to='/'>Home</Link>
                </li>
                <li classNmae= 'nav-item'> 
                    {isAuthenticated ? null : <Link className='nav' to='/login'>Login</Link>}
                </li>
                <li classNmae= 'nav-item'> 
                    {isAuthenticated ? <Link className='nav' to='/mappage'>Map</Link> : null}
                </li>
                <li classNmae= 'nav-item'> 
                    {isAuthenticated ? <Link className='nav' to='/report'>Report</Link> : null}
                 </li>  
                 <li classNmae= 'nav-item'>  
                    {isAuthenticated ? null : <Link className='nav' to='/createaccount'>Create Account</Link>}
                 </li>
                 <li classNmae= 'nav-item'> 
                {isAuthenticated ? <Link className='nav' to='/account'>Account</Link> : null}
                </li>
                </ul> 
            </div>
            </div>
        </nav> 



    )}

export default Nav