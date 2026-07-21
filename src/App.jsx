import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router'
import Home from './pages/Home'
//import ViewPoll from './pages/ViewPoll'
//import Results from './pages/Results'
import NotFound from './pages/NotFound'
import axios from 'axios'
import './App.css'

function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
