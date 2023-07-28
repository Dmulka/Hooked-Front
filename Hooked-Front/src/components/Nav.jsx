import { Link } from 'react-router-dom'


const Nav = () => {
    return (
        <div className='nav-Links'>
            <Link className='nav' to='/'>Home</Link> 
            <Link className='nav' to='/login'>Login</Link>
            <Link className='nav' to='/map'>Map</Link>
            <Link className='nav' to='/report'>Report</Link>
        </div>
    )
    
}

export default Nav