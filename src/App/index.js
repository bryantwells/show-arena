import React, { Component } from 'react'
import { BrowserRouter as Router, Route }  from 'react-router-dom'
import Greeting from './Greeting'
import Slideshow from './Slideshow'
import './index.css'

class App extends Component {

    render () {

        return (
            <Router>
                <div className="App">
                    <Route exact path={`${ process.env.PUBLIC_URL }/`} component={ Greeting }/>
                    <Route exact path={`${ process.env.PUBLIC_URL }/:slug`} component={ Slideshow }/>
                    <Route exact path={`${ process.env.PUBLIC_URL }/:slug/:activeSlide`} component={ Slideshow }/>
                </div>
            </Router>
        )

    }

}

export default App