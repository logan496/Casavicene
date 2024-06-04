import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CreateClient from "./pages/Creation_client/Create-client.jsx";
import './index.css'
import  {BrowserRouter as Router, Routes, Route} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
          <Routes>
              <Route path='/' element={<CreateClient/>} />
          </Routes>
      </Router>
  </React.StrictMode>,
)
