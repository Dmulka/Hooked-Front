import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './login'
import CreateAccount from './CreateAccount'
import MapPage from './MapPage'


const Main = () => {
    return (
        <div className='reoute-container'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/createaccount" element={<CreateAccount/>} />
                <Route path="/mappage" element={<MapPage/>} />
            </Routes>
        </div>
    )
}

export default Main  