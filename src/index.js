import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './App/index.js'
import './index.css'

ReactDOM.render( <App /> , document.getElementById('Root'))

registerServiceWorker()
