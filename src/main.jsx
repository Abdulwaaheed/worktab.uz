
import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "react-toastify/dist/ReactToastify.css"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import {ToastContainer} from 'react-toastify'
import store from './rt'
import { Provider } from 'react-redux';


axios.defaults.baseURL = "http://localhost:4040" 
axios.defaults.headers.common["Content-Type"]= "application/json"

let token = localStorage.getItem("token")
if(token) axios.defaults.headers.common["xxx_auth"] = token

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
    <App />
    </Provider>
    <ToastContainer theme='colored' />
  </Router>,
)
 