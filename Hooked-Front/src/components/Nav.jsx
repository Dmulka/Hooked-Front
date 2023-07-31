import { Link } from 'react-router-dom'


const Nav = () => {
    return (
        <div className='nav-Links'>
            <Link className='nav' to='/'>Home</Link> 
            <Link className='nav' to='/login'>Login</Link>
            <Link className='nav' to='/mappage'>Map</Link>
            <Link className='nav' to='/report'>Report</Link>
            <Link className='nav' to='/createaccount'>Create Account</Link>
            <Link className='nav' to='/account'>Account</Link>
        </div>
    )
    
}

export default Nav