import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'


// Import our custom CSS
// import '../scss/styles.scss'

// Import all of Bootstrap's JS
// import * as bootstrap from 'bootstrap'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className= 'App'>
      <header className='app-header'><Header /></header>
      <main className='app-main'><Main /></main>
      <footer className='app-footer'><Footer /></footer>
    </div>
  )
}

export default App
