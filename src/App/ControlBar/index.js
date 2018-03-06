import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import './index.css'

class ControlBar extends Component {

    constructor (props) {
        super(props)

        this.state = {
            shareUrlIsCopied: false
        }

        this.handleOnCopy = this.handleOnCopy.bind(this)
    }

    handleOnCopy () {
        this.setState({ shareUrlIsCopied: true })
        setTimeout(() => {
            this.setState({ shareUrlIsCopied: false })
        }, 750)
    }

    render () {

        return (
            <div className="ControlBar">
                <div className="ControlBar-group">

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

                </div>

                <div className="ControlBar-group">

                    <div className="Control Control--share" onMouseDown={(e) => { e.stopPropagation() }}>
                        <div className={`Control-label Control-label--copied ${this.state.shareUrlIsCopied ? 'is-active' : ''}`}>
                            <p>COPIED</p>
                        </div>
                        <CopyToClipboard text={this.props.shareUrl} onCopy={this.handleOnCopy}>
                            <div className="Control-icon Control-icon--share"></div>
                        </CopyToClipboard>
                    </div>

                    <div className="Control Control--close"
                        onMouseDown={(e) => { e.stopPropagation(); this.props.history.push('/') }}>
                        <div className="Control-icon Control-icon--close"></div>
                    </div>

                </div>
            </div>
        )

    }

}

export default ControlBar
