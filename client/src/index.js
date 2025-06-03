import React from 'react'
import ReactDOM from "react-dom/client"
import App from './App'

const root = ReactDOM.createRoot(document.getElementById("root")); //This directs React to where the public/index.html needs to have the react component
root.render(<App />); //renders out our App.jsx component into our public/index.html