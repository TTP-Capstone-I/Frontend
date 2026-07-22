import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router'
import Home from './pages/Home'
import Results from './pages/Results'
import ViewPoll from './pages/ViewPoll'
import NotFound from './pages/NotFound'
import CreatePollForm from './pages/CreatePoll'
import axios from 'axios'
import './App.css'

function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/results/:id' element={<Results/>}/>
          <Route path='/polls/:id' element={<ViewPoll/>}/>
          <Route path='/create-poll' element={<CreatePollForm/>}/>
          <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
