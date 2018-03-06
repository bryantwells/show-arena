import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import queryString from 'query-string'
import Slide from '../Slide'
import ControlBar from '../ControlBar'
import './index.css'

class Slideshow extends Component {

    constructor (props) {
        super(props)

        this.state = {
            channel: {},
            shareUrl: 'http://',
            activeSlide: 0,
            error: null,
            settings: {
                nightMode: false,
                ui: true
            }
        }

        this.incrementSlide = this.incrementSlide.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.toggleSetting = this.toggleSetting.bind(this)
        this.updateShareUrl = this.updateShareUrl.bind(this)
    }

    componentDidMount () {
        const slug = this.props.match.params.slug
        const activeSlide = Number(this.props.match.params.activeSlide)
        ReactDOM.findDOMNode(this).focus()

        // Apply settings from URL query string
        this.registerQueryString()

        // Fetch data from API via slug
        fetch(`https://api.are.na/v2/channels/${ slug }`)
            .then((response) => {

                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status)
                }

            })
            .then((data) => {

                this.setState({
                    channel: {
                        ...data,
                        contents: data.contents.reverse()
                    },
                    activeSlide: (activeSlide < data.contents.length)
                        ? activeSlide
                        : 0
                })

            })
            .catch(error => this.setState({ error: error }))

    }

    componentDidUpdate (prevProps, prevState) {
        // Focus the page (to register keyboard events)
        ReactDOM.findDOMNode(this).focus()

        // update share URL
        if (prevState.settings !== this.state.settings) {
            this.updateShareUrl()
        }
    }

    componentWillReceiveProps (newProps) {
        // Apply active slide props
        const activeSlide = newProps.match.params.activeSlide

        this.setState({
            activeSlide: Number(activeSlide)
        })

    }

    handleKeyDown (e) {
        // Change slide with left & right arrow keys
        if (e.keyCode == '37') { // eslint-disable-line eqeqeq
            this.decrementSlide()
        } else if (e.keyCode == '39') { // eslint-disable-line eqeqeq
            this.incrementSlide()
        }
    }

    incrementSlide () {
        const slug = this.props.match.params.slug
        const channelLength = this.state.channel.contents.length
        const targetSlide = this.state.activeSlide + 1

        if (targetSlide < channelLength) {
            this.props.history.push(`/${ slug }/${ targetSlide }${this.props.location.search}`)
        }

    }

    decrementSlide () {
        const slug = this.props.match.params.slug
        const targetSlide = this.state.activeSlide - 1

        if (targetSlide >= 0) {
            this.props.history.push(`/${ slug }/${ targetSlide }${this.props.location.search}`)
        }

    }

    toggleSetting (setting) {
        // helper function to easily toggle a (single) setting
        this.updateSetting(setting, !this.state.settings[setting])
    }

    updateSetting (key, value) {
        // Update the settings state from key & value strings or(!) arrays
        const settings = {...this.state.settings}

        if (typeof key === 'string') {
            key = [key]
            value = [value]
        }

        key.forEach((key, i) => { settings[key] = value[i] })
        this.setState({ settings })
    }

    registerQueryString () {
        // Build an array of keys and values, then apply the settings
        const queryObject = queryString.parse(this.props.location.search)
        let settingKeys = []
        let settingValues = []

        for (const queryKey in queryObject) {
            const settings = this.state.settings
            const matchedKey = Object.keys(settings).find((settingKey) => {
                return settingKey === queryKey
            })

            if (matchedKey) {
                const settingValue = this.state.settings[matchedKey]
                const queryValue = (queryObject[queryKey] === 'true')
                    ? true
                    : (queryObject[queryKey] === 'false')
                        ? false
                        : queryObject[queryKey]

                if (typeof settingValue === typeof queryValue) {
                    settingKeys.push(queryKey)
                    settingValues.push(queryValue)
                }

            }

        }

        this.updateSetting(settingKeys, settingValues)
    }

    updateShareUrl () {
        const origin = window.location.origin
        const pathname = this.props.history.location.pathname.split('/')[1]
        const query = queryString.stringify(this.state.settings)
        this.setState({ shareUrl: `${origin}/${pathname}/?${query}` })
        console.log(`${origin}/${pathname}/?${query}`)
    }

    render () {

        if (this.state.channel.id) {

            const slides = this.state.channel.contents
            const dataAttributes = {}

            // Convert settings to 'data-foo-bar' formatted attributes
            Object.entries(this.state.settings).forEach((entry) => {
                const key = entry[0].replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
                dataAttributes[`data-${key}`] = entry[1]
            })

            const slideItems = slides.map((slide, i) => {

                const isActive = this.state.activeSlide === i

                return (
                    <Slide key={slide.id}
                        slideInfo={slide}
                        isActive={isActive} />
                )

            })

            return (
                <div className="Slideshow" tabIndex="0"
                    {...dataAttributes}
                    onMouseDown={this.incrementSlide}
                    onKeyDown={this.handleKeyDown}>
                    <div className="Slideshow-back"
                        onMouseDown={(e) => { e.stopPropagation(); this.decrementSlide(e) }}>
                    </div>
                    <ControlBar settings={this.state.settings}
                        toggleSetting={this.toggleSetting}
                        shareUrl={this.state.shareUrl}
                        history={this.props.history} />
                    <ul className="Slideshow-slideList">
                        {slideItems}
                    </ul>
                </div>
            )

        } else if (this.state.error) {

            return (
                <div className="Message Message--error">
                    <p>Could not complete request: {this.state.error}</p>
                </div>
            )

        } else {

            return (
                <div className="Message Message--loading">
                    <p>get'ing the things...</p>
                </div>
            )

        }

    }

}

export default Slideshow
