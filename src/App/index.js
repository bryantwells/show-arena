import React, { Component } from 'react'
import { Router, Route }  from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Greeting from './Greeting'
import Slideshow from './Slideshow'
import './index.css'

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL })

class App extends Component {

    render () {

        return (
            <Router history={history}>
                <div className="App">
                    <Route exact path="/" component={Greeting} />
                    <Route exact path="/:slug/" component={Slideshow} />
                    <Route exact path="/:slug/:activeSlide" component={Slideshow} />
                </div>
            </Router>
        )

    }

}

export default App