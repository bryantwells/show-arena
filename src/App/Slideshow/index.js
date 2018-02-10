import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Slide from '../Slide'
import './index.css'

class Slideshow extends Component {

    constructor (props) {
        super(props)

        this.state = { 
            channel: {},
            activeSlide: 0,
            error: null
        }

        this.incrementSlide = this.incrementSlide.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentDidMount () {
        const slug = this.props.match.params.slug
        const activeSlide = Number(this.props.match.params.activeSlide)
        ReactDOM.findDOMNode(this).focus()

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

    componentDidUpdate () {
        ReactDOM.findDOMNode(this).focus()
    }

    componentWillReceiveProps (newProps) {
        const activeSlide = newProps.match.params.activeSlide

        this.setState({ 
            activeSlide: Number(activeSlide) 
        })

    }

    handleKeyDown (e) {
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
            this.props.history.push(`/${ slug }/${ targetSlide }`)
        }
        
    }

    decrementSlide () {
        const slug = this.props.match.params.slug
        const targetSlide = this.state.activeSlide - 1

        if (targetSlide >= 0) {
            this.props.history.push(`/${ slug }/${ targetSlide }`)
        }
        
    }

    render () {
    
        if (this.state.channel.id) {

            const slides = this.state.channel.contents

            const slideItems = slides.map((slide, i) => {

                const isActive = this.state.activeSlide === i

                return (
                    <Slide key={slide.id} 
                        slideInfo={slide} 
                        isActive={isActive} />
                )

            }) 

            return (
                <ul className="Slideshow" 
                    onMouseDown={this.incrementSlide} 
                    onKeyDown={this.handleKeyDown} 
                    tabIndex="0">
                    <div className="Slideshow-back"
                        onMouseDown={(e) => { e.stopPropagation(); this.decrementSlide(e)}}>
                    </div>
                    <a href="/" className="Slideshow-close"
                        onMouseDown={e => e.stopPropagation()}>×</a>
                    {slideItems}
                </ul>
            )

        } else if (this.state.error) {

            return (
                <section className="Message">
                    <p>Could not complete request: {this.state.error}</p>
                </section>
            )

        } else {

            return (
                <section className="Message">
                    <p>get'ing the things...</p>
                </section>
            )

        }

    }

}

export default Slideshow