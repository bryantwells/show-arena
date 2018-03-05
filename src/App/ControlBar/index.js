import React, { Component } from 'react'
import './index.css'

class ControlBar extends Component {

    render () {

        return (
            <div className="ControlBar">

                <div className="Control Control--play"
                    onMouseDown={(e) => { e.stopPropagation(); this.props.toggleSetting('play') }}>
                    <div className="Control-icon Control-icon--play"></div>
                    <div className="Control-icon Control-icon--pause"></div>
                </div>

                <div className="Control Control--ui"
                    onMouseDown={(e) => { e.stopPropagation(); this.props.toggleSetting('ui') }}>
                    <div className={`Control-toggle ${ this.props.settings.ui ? 'is-on' : 'is-off' }`}>
                        <span className="Control-label Control-label--on">UI ON</span>
                        <span className="Control-label Control-label--off">UI OFF</span>
                        <div className="Control-toggleSlider"></div>
                    </div>
                </div>

                <div className="Control Control--nightMode"
                    onMouseDown={(e) => { e.stopPropagation(); this.props.toggleSetting('nightMode') }}>
                    <div className="Control-icon Control-icon--night"></div>
                    <div className="Control-icon Control-icon--day"></div>
                </div>

                <div className="Control Control--close"
                    onMouseDown={(e) => { e.stopPropagation(); this.props.history.push('/') }}>
                    <div className="Control-icon Control-icon--close"></div>
                </div>

            </div>
        )

    }

}

export default ControlBar
