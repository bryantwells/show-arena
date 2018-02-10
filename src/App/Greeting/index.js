import React, { Component } from 'react'
import './index.css'

class Greeting extends Component {

    constructor () {
        super()
        this.state = { value: '' }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (e) {
        this.setState({ value: e.target.value })
    }

    handleSubmit (e) {
        e.preventDefault()
        const value = this.state.value
        if (value && value.lastIndexOf('/') >= 0) {
            const slug = value.substr(value.lastIndexOf('/') + 1)
            this.props.history.push(`/${ slug }/0`)
        }
    }
    
    render () {

        return (
            <section className="Greeting">
                <p className="Greeting-statement">
                    <a href="https://www.are.na/" target="blank">Are.na</a> channel URL:
                </p>
                <form onSubmit={this.handleSubmit}
                    className="Greeting-form">
                    <input type="text" name="slug"
                        className="Greeting-textInput"
                        onChange={this.handleChange}
                        placeholder="https://www.are.na/zach-rose/cubist-google-earth" />
                    <input type="submit" value="View"
                        className="Greeting-submit"/>
                </form>     
            </section>
        )

    }

}

export default Greeting