import React, { Component } from 'react'
import './index.css'
import downloadIcon from './assets/icon-download.svg'
import linkIcon from './assets/icon-link.svg'

class Slide extends Component {

    render () {

        const slideClass = this.props.slideInfo.class
        const className = (this.props.isActive)
            ? 'Slide is-active'
            : 'Slide'

        switch (slideClass) {

            case 'Image': {

                const src = this.props.slideInfo.image.original.url
                const title = this.props.slideInfo.title

                return (
                    <li className={className}>
                        <img src={src} alt={title} />
                    </li>
                )

            }

            case 'Media': {

                const html = this.props.slideInfo.embed.html

                return (
                    <li className={className}
                        dangerouslySetInnerHTML={{ __html: html }}>
                    </li>
                )

            }

            case 'Attachment': {

                const extension = this.props.slideInfo.attachment.extension
                const attachmentSrc = this.props.slideInfo.attachment.url

                switch (extension) {

                    case ('pdf'): {

                        const thumbmailSrc = this.props.slideInfo.image.display.url
                        const title = this.props.slideInfo.title

                        return (
                            <li className={className}>
                                <img src={thumbmailSrc} alt={title} />
                                <a href={attachmentSrc} target="blank" 
                                    className="Slide-link Slide-link--download"
                                    onMouseDown={e => e.stopPropagation()}>
                                    <img src={downloadIcon} alt="download" />
                                </a>
                            </li>
                        )

                    }

                    default: {
    
                        const extension = this.props.slideInfo.attachment.extension
                        const title = this.props.slideInfo.title

                        return (
                            <li className={className}>
                                <div className="Slide-mediaStamp">
                                    <div className="Slide-spacer"></div>
                                    <h2 className="Slide-mediaExtension">.{extension}</h2>
                                    <h3 className="Slide-mediaTitle">{title}</h3>
                                </div>
                                <a href={attachmentSrc} target="blank" 
                                    className="Slide-icon Slide-icon--download"
                                    onMouseDown={e => e.stopPropagation()}>
                                    <img src={downloadIcon} alt="download" />
                                </a>
                            </li>
                        )

                    }

                }

            }

            case 'Channel': {

                const title = this.props.slideInfo.title
                const author = this.props.slideInfo.user.full_name
                const size = this.props.slideInfo.length
                const url = `https://are.na/${ this.props.slideInfo.slug }`
                const channelClassName = (!this.props.slideInfo.open)
                    ? 'Slide-link Slide-link--channel is-closed'
                    : 'Slide-link Slide-link--channel'
                
                return (
                    <li className={className}>
                        <a href={url} target="blank" 
                            className={channelClassName}
                            onMouseDown={e => e.stopPropagation()}>
                            <div className="Slide-spacer"></div>
                            <h2 className="Slide-channelTitle">{title}</h2>
                            <ul className="Slide-channelStatList">
                                <li>by {author}</li>
                                <li>{size} blocks</li>
                            </ul>
                        </a>
                    </li>
                )

            }

            case 'Text': {

                const html = this.props.slideInfo.content_html

                return (
                    <li className={className}>
                        <div className="Slide-textBlock"
                            dangerouslySetInnerHTML={{ __html: html }}
                            onMouseDown={e => e.stopPropagation()}>
                        </div>
                    </li>
                )

            }

            case 'Link': {

                const title = this.props.slideInfo.title
                const url = this.props.slideInfo.source.url
                const src = this.props.slideInfo.image.display.url

                return (
                    <li className={className}>
                        <a href={url} target="blank" 
                            className="Slide-link Slide-link--web"
                            onMouseDown={e => e.stopPropagation()}>
                            <img src={src} alt={title} />
                            <img src={linkIcon} alt="link" 
                                className="Slide-icon Slide-icon--link" />
                            <h2 className="Slide-title">{title}</h2>
                        </a>
                    </li>
                )

            }

            default: {

                return (
                    <li className={className}>
                        <p>Content type not supported.</p>
                    </li>
                )

            }

        }

    }

}

export default Slide