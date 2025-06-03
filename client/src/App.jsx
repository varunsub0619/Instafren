import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Feed from './routes/Feed'
import Login from './routes/Login'
import Register from './routes/Register'

const App = () => {
  return (
    <div>
        <Router> 
            <Routes>
                <Route path="/" element={<Login />}/>
            </Routes>
        </Router>
    </div>
  )
}

export default App
