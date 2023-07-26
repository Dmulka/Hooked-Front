import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className= 'App'>
      <header className='app-header'><Header /></header>
      <mmain className='app-main'><Main /></mmain>
      <footer className='app-footer'><Footer /></footer>
    </div>
  )
}

export default App
