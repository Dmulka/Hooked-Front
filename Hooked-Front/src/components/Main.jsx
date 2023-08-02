import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './login'
import CreateAccount from './CreateAccount'
import MapPage from './MapPage'
import Report from './Report'
import Account from './Account'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'


const Main = () => {
    return (
        <div className='reoute-container'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/createaccount" element={<CreateAccount/>} />
                <Route path="/mappage" element={<MapPage/>} />
                <Route path='/report' element={<Report/>} />
                <Route path='/account' element={<Account/>} />
            </Routes>
        </div>
    )
}

export default Main  